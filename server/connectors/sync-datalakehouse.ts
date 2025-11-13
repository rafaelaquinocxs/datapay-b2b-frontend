import { db } from "../db";
import { syncMetadata, aggregatedData, connectorMetrics, connectorAlerts } from "../db/schema-datalakehouse";
import { eq, and } from "drizzle-orm";

/**
 * SERVIÇO DE SINCRONIZAÇÃO COM DATA LAKEHOUSE
 * Sincroniza dados de conectores e armazena apenas metadados + agregados
 */

export interface SyncResult {
  success: boolean;
  recordsProcessed: number;
  recordsAggregated: number;
  durationMs: number;
  error?: string;
}

export interface AggregateConfig {
  dataType: string; // "sales", "conversions", "users", "revenue"
  dimension: string; // "daily", "weekly", "monthly", "by_region"
  metrics: {
    totalCount?: boolean;
    sumValue?: boolean;
    avgValue?: boolean;
    minValue?: boolean;
    maxValue?: boolean;
  };
}

export class DataLakehouseSync {
  /**
   * Sincronizar dados de um conector e armazenar agregados
   */
  static async syncConnector(
    userId: string,
    connectorId: string,
    connectorName: string,
    fetchDataFn: () => Promise<any[]>,
    aggregateConfig: AggregateConfig
  ): Promise<SyncResult> {
    const startTime = Date.now();
    let recordsProcessed = 0;
    let recordsAggregated = 0;

    try {
      // 1. Registrar início da sincronização
      const syncId = await this.recordSyncStart(userId, connectorId, connectorName);

      // 2. Buscar dados da fonte
      console.log(`[${connectorId}] Buscando dados...`);
      const rawData = await fetchDataFn();
      recordsProcessed = rawData.length;

      // 3. Processar e agregar dados
      console.log(`[${connectorId}] Agregando ${recordsProcessed} registros...`);
      recordsAggregated = await this.aggregateAndStore(
        userId,
        connectorId,
        aggregateConfig,
        rawData
      );

      // 4. Atualizar métricas
      const durationMs = Date.now() - startTime;
      await this.updateMetrics(userId, connectorId, connectorName, recordsProcessed, recordsAggregated, durationMs, true);

      // 5. Registrar sucesso
      await this.recordSyncSuccess(syncId, recordsProcessed, recordsAggregated, durationMs);

      console.log(`[${connectorId}] Sincronização concluída: ${recordsProcessed} processados, ${recordsAggregated} agregados em ${durationMs}ms`);

      return {
        success: true,
        recordsProcessed,
        recordsAggregated,
        durationMs,
      };
    } catch (error) {
      const durationMs = Date.now() - startTime;
      const errorMessage = error instanceof Error ? error.message : String(error);

      console.error(`[${connectorId}] Erro na sincronização:`, errorMessage);

      // Registrar erro
      await this.updateMetrics(userId, connectorId, connectorName, recordsProcessed, recordsAggregated, durationMs, false, errorMessage);
      await this.createAlert(userId, connectorId, connectorName, "error", `Erro na sincronização: ${errorMessage}`);

      return {
        success: false,
        recordsProcessed,
        recordsAggregated,
        durationMs,
        error: errorMessage,
      };
    }
  }

  /**
   * Registrar início de sincronização
   */
  private static async recordSyncStart(
    userId: string,
    connectorId: string,
    connectorName: string
  ): Promise<string> {
    const result = await db
      .insert(syncMetadata)
      .values({
        userId,
        connectorId,
        connectorName,
        syncStatus: "running",
      })
      .returning({ id: syncMetadata.id });

    return result[0].id;
  }

  /**
   * Registrar sucesso de sincronização
   */
  private static async recordSyncSuccess(
    syncId: string,
    recordsProcessed: number,
    recordsAggregated: number,
    durationMs: number
  ) {
    await db
      .update(syncMetadata)
      .set({
        syncStatus: "success",
        recordsProcessed,
        recordsAggregated,
        syncDurationMs: durationMs,
        lastSyncAt: new Date(),
      })
      .where(eq(syncMetadata.id, syncId));
  }

  /**
   * Agregar dados e armazenar no Data Lakehouse
   */
  private static async aggregateAndStore(
    userId: string,
    connectorId: string,
    config: AggregateConfig,
    rawData: any[]
  ): Promise<number> {
    const now = new Date();
    const periodStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const periodEnd = new Date(periodStart.getTime() + 24 * 60 * 60 * 1000);

    // Calcular agregados
    const aggregates = this.calculateAggregates(rawData, config.metrics);

    // Armazenar agregados
    await db.insert(aggregatedData).values({
      userId,
      connectorId,
      dataType: config.dataType,
      dimension: config.dimension,
      totalCount: aggregates.totalCount,
      sumValue: aggregates.sumValue.toString(),
      avgValue: aggregates.avgValue.toString(),
      minValue: aggregates.minValue.toString(),
      maxValue: aggregates.maxValue.toString(),
      periodStart,
      periodEnd,
      metadata: {
        source: connectorId,
        aggregationTime: new Date().toISOString(),
      },
    });

    return 1; // Retornar número de agregados criados
  }

  /**
   * Calcular agregados a partir de dados brutos
   */
  private static calculateAggregates(
    data: any[],
    metrics: { totalCount?: boolean; sumValue?: boolean; avgValue?: boolean; minValue?: boolean; maxValue?: boolean }
  ) {
    const values = data
      .map((item) => item.value || item.amount || item.count || 0)
      .filter((v) => typeof v === "number");

    return {
      totalCount: metrics.totalCount ? data.length : 0,
      sumValue: metrics.sumValue ? values.reduce((a, b) => a + b, 0) : 0,
      avgValue: metrics.avgValue ? values.length > 0 ? values.reduce((a, b) => a + b, 0) / values.length : 0 : 0,
      minValue: metrics.minValue ? values.length > 0 ? Math.min(...values) : 0 : 0,
      maxValue: metrics.maxValue ? values.length > 0 ? Math.max(...values) : 0 : 0,
    };
  }

  /**
   * Atualizar métricas do conector
   */
  private static async updateMetrics(
    userId: string,
    connectorId: string,
    connectorName: string,
    recordsProcessed: number,
    recordsAggregated: number,
    durationMs: number,
    success: boolean,
    errorMessage?: string
  ) {
    const now = new Date();
    const periodStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const periodEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    // Buscar ou criar métrica
    const existing = await db
      .select()
      .from(connectorMetrics)
      .where(
        and(
          eq(connectorMetrics.userId, userId),
          eq(connectorMetrics.connectorId, connectorId)
        )
      );

    if (existing.length > 0) {
      const metric = existing[0];
      const totalSyncs = metric.totalSyncs + 1;
      const successfulSyncs = success ? metric.successfulSyncs + 1 : metric.successfulSyncs;
      const failedSyncs = !success ? metric.failedSyncs + 1 : metric.failedSyncs;
      const successRate = (successfulSyncs / totalSyncs) * 100;

      await db
        .update(connectorMetrics)
        .set({
          totalSyncs,
          successfulSyncs,
          failedSyncs,
          successRate: successRate.toString(),
          totalRecordsProcessed: metric.totalRecordsProcessed + recordsProcessed,
          totalRecordsAggregated: metric.totalRecordsAggregated + recordsAggregated,
          avgSyncDurationMs: Math.round((metric.avgSyncDurationMs + durationMs) / 2),
          lastSyncDurationMs: durationMs,
          updatedAt: now,
        })
        .where(
          and(
            eq(connectorMetrics.userId, userId),
            eq(connectorMetrics.connectorId, connectorId)
          )
        );
    } else {
      await db.insert(connectorMetrics).values({
        userId,
        connectorId,
        connectorName,
        totalSyncs: 1,
        successfulSyncs: success ? 1 : 0,
        failedSyncs: !success ? 1 : 0,
        successRate: success ? "100" : "0",
        totalRecordsProcessed: recordsProcessed,
        totalRecordsAggregated: recordsAggregated,
        avgSyncDurationMs: durationMs,
        lastSyncDurationMs: durationMs,
        periodStart,
        periodEnd,
      });
    }
  }

  /**
   * Criar alerta
   */
  private static async createAlert(
    userId: string,
    connectorId: string,
    connectorName: string,
    alertType: "error" | "warning" | "info",
    message: string
  ) {
    await db.insert(connectorAlerts).values({
      userId,
      connectorId,
      connectorName,
      alertType,
      title: `${connectorName} - ${alertType.toUpperCase()}`,
      message,
      isResolved: false,
    });
  }

  /**
   * Obter dados agregados de um período
   */
  static async getAggregatedData(
    userId: string,
    connectorId: string,
    dataType: string,
    startDate: Date,
    endDate: Date
  ) {
    return await db
      .select()
      .from(aggregatedData)
      .where(
        and(
          eq(aggregatedData.userId, userId),
          eq(aggregatedData.connectorId, connectorId),
          eq(aggregatedData.dataType, dataType)
        )
      );
  }

  /**
   * Obter métricas de um conector
   */
  static async getConnectorMetrics(userId: string, connectorId: string) {
    return await db
      .select()
      .from(connectorMetrics)
      .where(
        and(
          eq(connectorMetrics.userId, userId),
          eq(connectorMetrics.connectorId, connectorId)
        )
      );
  }
}

