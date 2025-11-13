/**
 * Serviço de Sincronização com Persistência em Banco de Dados
 * Gerencia sincronização automática com logs persistentes
 */

import cron from "node-cron";
import { db } from "@/server/db";
import { syncLogs, connectorStatus, syncJobs, syncAlerts } from "@/server/db/schema-sync-logs";
import { eq, desc, and } from "drizzle-orm";
import { ConnectorGateway } from "./gateway";
import { v4 as uuidv4 } from "uuid";

export interface SyncJobConfig {
  jobId: string;
  schedule: string;
  connectorId?: string;
  description?: string;
}

export class SyncServiceDB {
  private gateway: ConnectorGateway;
  private jobs: Map<string, cron.ScheduledTask> = new Map();

  constructor(gateway: ConnectorGateway) {
    this.gateway = gateway;
    this.initializeDefaultJobs();
  }

  /**
   * Inicializa jobs padrão de sincronização
   */
  private async initializeDefaultJobs() {
    // Sincronização a cada hora para todos os conectores
    this.createJob({
      jobId: "hourly-sync",
      schedule: "0 * * * * *",
      description: "Sincronização horária de todos os conectores",
    });

    // Sincronização diária às 2 da manhã
    this.createJob({
      jobId: "daily-sync",
      schedule: "0 0 2 * * *",
      description: "Sincronização diária completa",
    });

    // Sincronização a cada 30 minutos para conectores críticos
    this.createJob({
      jobId: "critical-sync",
      schedule: "0 */30 * * * *",
      connectorId: "critical",
      description: "Sincronização de conectores críticos",
    });

    // Limpeza de logs antigos a cada dia
    this.createJob({
      jobId: "cleanup-logs",
      schedule: "0 0 3 * * *",
      description: "Limpeza de logs antigos",
    });
  }

  /**
   * Cria um novo job de sincronização
   */
  async createJob(config: SyncJobConfig): Promise<{ success: boolean; error?: string }> {
    try {
      // Validar cron expression
      if (!cron.validate(config.schedule)) {
        return { success: false, error: "Cron expression inválida" };
      }

      // Cancelar job anterior se existir
      if (this.jobs.has(config.jobId)) {
        this.jobs.get(config.jobId)?.stop();
      }

      // Criar novo job
      const task = cron.schedule(
        config.schedule,
        async () => {
          if (config.connectorId === "critical") {
            await this.syncCriticalConnectors();
          } else if (config.jobId === "cleanup-logs") {
            await this.cleanupOldLogs();
          } else {
            await this.syncAllConnectors();
          }
        },
        { runOnInit: false }
      );

      this.jobs.set(config.jobId, task);

      // Salvar no banco de dados
      const jobId = `job-${uuidv4()}`;
      await db.insert(syncJobs).values({
        id: jobId,
        jobId: config.jobId,
        schedule: config.schedule,
        connectorId: config.connectorId,
        isActive: true,
        description: config.description,
      });

      console.log(`✅ Job '${config.jobId}' criado com schedule: ${config.schedule}`);
      return { success: true };
    } catch (error) {
      console.error(`Erro ao criar job '${config.jobId}':`, error);
      return { success: false, error: String(error) };
    }
  }

  /**
   * Para um job de sincronização
   */
  async stopJob(jobId: string): Promise<{ success: boolean; error?: string }> {
    try {
      const task = this.jobs.get(jobId);
      if (!task) {
        return { success: false, error: `Job '${jobId}' não encontrado` };
      }

      task.stop();
      this.jobs.delete(jobId);

      // Atualizar no banco de dados
      await db.update(syncJobs).set({ isActive: false }).where(eq(syncJobs.jobId, jobId));

      console.log(`✅ Job '${jobId}' parado`);
      return { success: true };
    } catch (error) {
      console.error(`Erro ao parar job '${jobId}':`, error);
      return { success: false, error: String(error) };
    }
  }

  /**
   * Sincroniza todos os conectores
   */
  async syncAllConnectors(): Promise<void> {
    const connectors = this.gateway.getAllConfigs();

    console.log(`\n🔄 Iniciando sincronização de ${connectors.length} conectores...`);

    for (const config of connectors) {
      await this.syncConnector(config.id);
    }

    console.log("✅ Sincronização concluída\n");
  }

  /**
   * Sincroniza apenas conectores críticos
   */
  async syncCriticalConnectors(): Promise<void> {
    const criticalConnectors = ["totvs", "sap", "salesforce"];

    console.log(`\n🔄 Sincronizando conectores críticos...`);

    for (const connectorId of criticalConnectors) {
      await this.syncConnector(connectorId);
    }

    console.log("✅ Sincronização de conectores críticos concluída\n");
  }

  /**
   * Sincroniza um conector específico
   */
  async syncConnector(connectorId: string): Promise<void> {
    const startTime = Date.now();

    try {
      const result = await this.gateway.sync(connectorId);
      const duration = Date.now() - startTime;

      // Salvar log no banco de dados
      const logId = `log-${uuidv4()}`;
      await db.insert(syncLogs).values({
        id: logId,
        connectorId,
        connectorName: this.gateway.getConfig(connectorId)?.name || connectorId,
        status: result.status,
        recordsSynced: result.recordsSynced,
        recordsFailed: result.recordsFailed,
        duration,
        error: result.error,
        details: JSON.stringify(result),
      });

      // Atualizar status do conector
      const existingStatus = await db
        .select()
        .from(connectorStatus)
        .where(eq(connectorStatus.connectorId, connectorId))
        .limit(1);

      if (existingStatus.length > 0) {
        await db
          .update(connectorStatus)
          .set({
            lastSyncAt: new Date(),
            lastSyncStatus: result.status,
            lastError: result.error,
            totalSyncs: existingStatus[0].totalSyncs + 1,
            successfulSyncs:
              result.status === "success"
                ? existingStatus[0].successfulSyncs + 1
                : existingStatus[0].successfulSyncs,
            failedSyncs:
              result.status === "error"
                ? existingStatus[0].failedSyncs + 1
                : existingStatus[0].failedSyncs,
            totalRecordsSynced: existingStatus[0].totalRecordsSynced + result.recordsSynced,
            averageDuration: Math.round(
              (existingStatus[0].averageDuration * existingStatus[0].totalSyncs + duration) /
                (existingStatus[0].totalSyncs + 1)
            ),
          })
          .where(eq(connectorStatus.connectorId, connectorId));
      } else {
        const statusId = `status-${uuidv4()}`;
        await db.insert(connectorStatus).values({
          id: statusId,
          connectorId,
          connectorName: this.gateway.getConfig(connectorId)?.name || connectorId,
          isConnected: result.status === "success",
          lastSyncAt: new Date(),
          lastSyncStatus: result.status,
          lastError: result.error,
          totalSyncs: 1,
          successfulSyncs: result.status === "success" ? 1 : 0,
          failedSyncs: result.status === "error" ? 1 : 0,
          totalRecordsSynced: result.recordsSynced,
          averageDuration: duration,
        });
      }

      // Criar alerta se houver erro
      if (result.status === "error") {
        const alertId = `alert-${uuidv4()}`;
        await db.insert(syncAlerts).values({
          id: alertId,
          connectorId,
          connectorName: this.gateway.getConfig(connectorId)?.name || connectorId,
          alertType: "error",
          title: `Erro na sincronização de ${this.gateway.getConfig(connectorId)?.name || connectorId}`,
          message: result.error || "Erro desconhecido",
          isResolved: false,
        });
      }

      if (result.status === "success") {
        console.log(
          `✅ ${connectorId}: ${result.recordsSynced} registros sincronizados em ${duration}ms`
        );
      } else {
        console.error(`❌ ${connectorId}: ${result.error}`);
      }
    } catch (error) {
      const duration = Date.now() - startTime;
      console.error(`Erro ao sincronizar ${connectorId}:`, error);

      // Salvar log de erro
      const logId = `log-${uuidv4()}`;
      await db.insert(syncLogs).values({
        id: logId,
        connectorId,
        connectorName: this.gateway.getConfig(connectorId)?.name || connectorId,
        status: "error",
        recordsSynced: 0,
        recordsFailed: 0,
        duration,
        error: String(error),
      });

      // Criar alerta
      const alertId = `alert-${uuidv4()}`;
      await db.insert(syncAlerts).values({
        id: alertId,
        connectorId,
        connectorName: this.gateway.getConfig(connectorId)?.name || connectorId,
        alertType: "error",
        title: `Erro na sincronização de ${this.gateway.getConfig(connectorId)?.name || connectorId}`,
        message: String(error),
        isResolved: false,
      });
    }
  }

  /**
   * Obtém logs de sincronização
   */
  async getLogs(filters?: {
    connectorId?: string;
    status?: string;
    limit?: number;
  }): Promise<any[]> {
    let query = db.select().from(syncLogs);

    if (filters?.connectorId) {
      query = query.where(eq(syncLogs.connectorId, filters.connectorId));
    }

    if (filters?.status) {
      query = query.where(eq(syncLogs.status, filters.status));
    }

    const logs = await query.orderBy(desc(syncLogs.timestamp)).limit(filters?.limit || 100);
    return logs;
  }

  /**
   * Obtém status de todos os conectores
   */
  async getConnectorStatuses(): Promise<any[]> {
    return await db.select().from(connectorStatus).orderBy(desc(connectorStatus.updatedAt));
  }

  /**
   * Obtém status de um conector específico
   */
  async getConnectorStatus(connectorId: string): Promise<any | null> {
    const result = await db
      .select()
      .from(connectorStatus)
      .where(eq(connectorStatus.connectorId, connectorId))
      .limit(1);

    return result.length > 0 ? result[0] : null;
  }

  /**
   * Obtém alertas não resolvidos
   */
  async getUnresolvedAlerts(): Promise<any[]> {
    return await db
      .select()
      .from(syncAlerts)
      .where(eq(syncAlerts.isResolved, false))
      .orderBy(desc(syncAlerts.createdAt));
  }

  /**
   * Marca alerta como resolvido
   */
  async resolveAlert(alertId: string): Promise<void> {
    await db
      .update(syncAlerts)
      .set({ isResolved: true, resolvedAt: new Date() })
      .where(eq(syncAlerts.id, alertId));
  }

  /**
   * Obtém estatísticas de sincronização
   */
  async getStats(connectorId?: string): Promise<any> {
    if (connectorId) {
      const status = await this.getConnectorStatus(connectorId);
      return status
        ? {
            totalSyncs: status.totalSyncs,
            successfulSyncs: status.successfulSyncs,
            failedSyncs: status.failedSyncs,
            totalRecordsSynced: status.totalRecordsSynced,
            averageDuration: status.averageDuration,
            lastSync: status.lastSyncAt,
            successRate: status.totalSyncs > 0 ? (status.successfulSyncs / status.totalSyncs) * 100 : 0,
          }
        : null;
    }

    const statuses = await this.getConnectorStatuses();
    return {
      totalConnectors: statuses.length,
      connectedConnectors: statuses.filter((s) => s.isConnected).length,
      totalSyncs: statuses.reduce((sum, s) => sum + s.totalSyncs, 0),
      totalRecordsSynced: statuses.reduce((sum, s) => sum + s.totalRecordsSynced, 0),
      averageSuccessRate:
        statuses.length > 0
          ? statuses.reduce((sum, s) => sum + (s.successfulSyncs / s.totalSyncs || 0), 0) /
            statuses.length
          : 0,
    };
  }

  /**
   * Limpa logs com mais de 30 dias
   */
  private async cleanupOldLogs(): Promise<void> {
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

    const result = await db
      .delete(syncLogs)
      .where(syncLogs.timestamp < thirtyDaysAgo);

    console.log(`🧹 Limpeza de logs: logs antigos removidos`);
  }

  /**
   * Obtém status de todos os jobs
   */
  async getJobsStatus(): Promise<any[]> {
    return await db.select().from(syncJobs).where(eq(syncJobs.isActive, true));
  }

  /**
   * Para todos os jobs
   */
  stopAllJobs(): void {
    for (const [jobId, task] of this.jobs.entries()) {
      task.stop();
      console.log(`✅ Job '${jobId}' parado`);
    }
    this.jobs.clear();
  }

  /**
   * Reinicia todos os jobs
   */
  async restartAllJobs(): Promise<void> {
    this.stopAllJobs();
    await this.initializeDefaultJobs();
    console.log("✅ Todos os jobs reiniciados");
  }
}

export default SyncServiceDB;

