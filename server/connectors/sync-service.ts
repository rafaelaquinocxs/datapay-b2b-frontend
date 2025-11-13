/**
 * Serviço de Sincronização com Cron Jobs
 * Gerencia sincronização automática periódica de todos os conectores
 */

import cron from "node-cron";
import { ConnectorGateway } from "./gateway";
import TOTVSConnector from "./totvs-connector";
import SAPConnector from "./sap-connector";
import SalesforceConnector from "./salesforce-connector";
import GoogleAnalyticsConnector from "./google-analytics-connector";
import PowerBIConnector from "./powerbi-connector";

export interface SyncJob {
  id: string;
  connectorId: string;
  schedule: string; // Cron expression
  lastRun?: Date;
  nextRun?: Date;
  status: "active" | "inactive" | "error";
  error?: string;
}

export interface SyncLog {
  id: string;
  connectorId: string;
  timestamp: Date;
  status: "success" | "error";
  recordsSynced: number;
  recordsFailed: number;
  duration: number;
  error?: string;
}

export class SyncService {
  private gateway: ConnectorGateway;
  private jobs: Map<string, cron.ScheduledTask> = new Map();
  private syncLogs: SyncLog[] = [];
  private maxLogs: number = 1000;

  constructor(gateway: ConnectorGateway) {
    this.gateway = gateway;
    this.initializeDefaultJobs();
  }

  /**
   * Inicializa jobs padrão de sincronização
   */
  private initializeDefaultJobs() {
    // Sincronização a cada hora para todos os conectores
    this.createJob("hourly-sync", "0 * * * * *", async () => {
      await this.syncAllConnectors();
    });

    // Sincronização diária às 2 da manhã
    this.createJob("daily-sync", "0 0 2 * * *", async () => {
      await this.syncAllConnectors(true);
    });

    // Sincronização a cada 30 minutos para conectores críticos
    this.createJob("critical-sync", "0 */30 * * * *", async () => {
      await this.syncCriticalConnectors();
    });

    // Limpeza de logs antigos a cada dia
    this.createJob("cleanup-logs", "0 0 3 * * *", async () => {
      this.cleanupLogs();
    });
  }

  /**
   * Cria um novo job de sincronização
   */
  createJob(
    jobId: string,
    schedule: string,
    callback: () => Promise<void>
  ): { success: boolean; error?: string } {
    try {
      // Validar cron expression
      if (!cron.validate(schedule)) {
        return { success: false, error: "Cron expression inválida" };
      }

      // Cancelar job anterior se existir
      if (this.jobs.has(jobId)) {
        this.jobs.get(jobId)?.stop();
      }

      // Criar novo job
      const task = cron.schedule(schedule, callback, {
        runOnInit: false,
      });

      this.jobs.set(jobId, task);

      console.log(`✅ Job '${jobId}' criado com schedule: ${schedule}`);
      return { success: true };
    } catch (error) {
      console.error(`Erro ao criar job '${jobId}':`, error);
      return { success: false, error: String(error) };
    }
  }

  /**
   * Para um job de sincronização
   */
  stopJob(jobId: string): { success: boolean; error?: string } {
    try {
      const task = this.jobs.get(jobId);
      if (!task) {
        return { success: false, error: `Job '${jobId}' não encontrado` };
      }

      task.stop();
      this.jobs.delete(jobId);

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
  async syncAllConnectors(fullSync: boolean = false): Promise<void> {
    const connectors = this.gateway.getAllConfigs();

    console.log(`\n🔄 Iniciando sincronização de ${connectors.length} conectores...`);

    for (const config of connectors) {
      try {
        const result = await this.gateway.sync(config.id);

        const log: SyncLog = {
          id: `${config.id}-${Date.now()}`,
          connectorId: config.id,
          timestamp: new Date(),
          status: result.status,
          recordsSynced: result.recordsSynced,
          recordsFailed: result.recordsFailed,
          duration: result.duration,
          error: result.error,
        };

        this.addLog(log);

        if (result.status === "success") {
          console.log(
            `✅ ${config.name}: ${result.recordsSynced} registros sincronizados em ${result.duration}ms`
          );
        } else {
          console.error(`❌ ${config.name}: ${result.error}`);
        }
      } catch (error) {
        console.error(`Erro ao sincronizar ${config.id}:`, error);

        const log: SyncLog = {
          id: `${config.id}-${Date.now()}`,
          connectorId: config.id,
          timestamp: new Date(),
          status: "error",
          recordsSynced: 0,
          recordsFailed: 0,
          duration: 0,
          error: String(error),
        };

        this.addLog(log);
      }
    }

    console.log("✅ Sincronização concluída\n");
  }

  /**
   * Sincroniza apenas conectores críticos (ERP, CRM)
   */
  async syncCriticalConnectors(): Promise<void> {
    const criticalConnectors = ["totvs", "sap", "salesforce"];

    console.log(`\n🔄 Sincronizando conectores críticos...`);

    for (const connectorId of criticalConnectors) {
      try {
        const result = await this.gateway.sync(connectorId);

        const log: SyncLog = {
          id: `${connectorId}-${Date.now()}`,
          connectorId,
          timestamp: new Date(),
          status: result.status,
          recordsSynced: result.recordsSynced,
          recordsFailed: result.recordsFailed,
          duration: result.duration,
          error: result.error,
        };

        this.addLog(log);

        if (result.status === "success") {
          console.log(`✅ ${connectorId}: ${result.recordsSynced} registros sincronizados`);
        } else {
          console.error(`❌ ${connectorId}: ${result.error}`);
        }
      } catch (error) {
        console.error(`Erro ao sincronizar ${connectorId}:`, error);
      }
    }

    console.log("✅ Sincronização de conectores críticos concluída\n");
  }

  /**
   * Sincroniza um conector específico
   */
  async syncConnector(connectorId: string): Promise<SyncLog> {
    try {
      const result = await this.gateway.sync(connectorId);

      const log: SyncLog = {
        id: `${connectorId}-${Date.now()}`,
        connectorId,
        timestamp: new Date(),
        status: result.status,
        recordsSynced: result.recordsSynced,
        recordsFailed: result.recordsFailed,
        duration: result.duration,
        error: result.error,
      };

      this.addLog(log);
      return log;
    } catch (error) {
      const log: SyncLog = {
        id: `${connectorId}-${Date.now()}`,
        connectorId,
        timestamp: new Date(),
        status: "error",
        recordsSynced: 0,
        recordsFailed: 0,
        duration: 0,
        error: String(error),
      };

      this.addLog(log);
      return log;
    }
  }

  /**
   * Adiciona log de sincronização
   */
  private addLog(log: SyncLog): void {
    this.syncLogs.push(log);

    // Manter apenas os últimos N logs
    if (this.syncLogs.length > this.maxLogs) {
      this.syncLogs = this.syncLogs.slice(-this.maxLogs);
    }
  }

  /**
   * Obtém logs de sincronização
   */
  getLogs(filters?: {
    connectorId?: string;
    status?: "success" | "error";
    limit?: number;
  }): SyncLog[] {
    let logs = [...this.syncLogs];

    if (filters?.connectorId) {
      logs = logs.filter((log) => log.connectorId === filters.connectorId);
    }

    if (filters?.status) {
      logs = logs.filter((log) => log.status === filters.status);
    }

    const limit = filters?.limit || 100;
    return logs.slice(-limit);
  }

  /**
   * Obtém estatísticas de sincronização
   */
  getStats(connectorId?: string): {
    totalSyncs: number;
    successfulSyncs: number;
    failedSyncs: number;
    totalRecordsSynced: number;
    averageDuration: number;
    lastSync?: Date;
  } {
    let logs = [...this.syncLogs];

    if (connectorId) {
      logs = logs.filter((log) => log.connectorId === connectorId);
    }

    const totalSyncs = logs.length;
    const successfulSyncs = logs.filter((log) => log.status === "success").length;
    const failedSyncs = logs.filter((log) => log.status === "error").length;
    const totalRecordsSynced = logs.reduce((sum, log) => sum + log.recordsSynced, 0);
    const averageDuration =
      logs.length > 0 ? logs.reduce((sum, log) => sum + log.duration, 0) / logs.length : 0;
    const lastSync = logs.length > 0 ? logs[logs.length - 1].timestamp : undefined;

    return {
      totalSyncs,
      successfulSyncs,
      failedSyncs,
      totalRecordsSynced,
      averageDuration,
      lastSync,
    };
  }

  /**
   * Limpa logs antigos
   */
  private cleanupLogs(): void {
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const initialLength = this.syncLogs.length;

    this.syncLogs = this.syncLogs.filter((log) => log.timestamp > thirtyDaysAgo);

    const deletedCount = initialLength - this.syncLogs.length;
    console.log(`🧹 Limpeza de logs: ${deletedCount} logs antigos removidos`);
  }

  /**
   * Obtém status de todos os jobs
   */
  getJobsStatus(): Array<{
    jobId: string;
    status: "active" | "inactive";
  }> {
    return Array.from(this.jobs.entries()).map(([jobId, task]) => ({
      jobId,
      status: task.status === 1 ? "active" : "inactive",
    }));
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
  restartAllJobs(): void {
    this.stopAllJobs();
    this.initializeDefaultJobs();
    console.log("✅ Todos os jobs reiniciados");
  }
}

export default SyncService;

