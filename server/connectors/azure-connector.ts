/**
 * Azure Connector
 * Integração com Azure para sincronizar VMs, Databases, Storage, Monitoring
 */

import { DefaultAzureCredential } from "@azure/identity";
import { ComputeManagementClient } from "@azure/arm-compute";
import { StorageManagementClient } from "@azure/arm-storage";
import { MySQLManagementClient } from "@azure/arm-mysql";
import { MonitorClient } from "@azure/arm-monitor";

export interface AzureConfig {
  subscriptionId: string;
  tenantId: string;
  clientId: string;
  clientSecret: string;
}

export class AzureConnector {
  private subscriptionId: string;
  private tenantId: string;
  private clientId: string;
  private clientSecret: string;
  private credential: DefaultAzureCredential;
  private computeClient: ComputeManagementClient;
  private storageClient: StorageManagementClient;
  private mysqlClient: MySQLManagementClient;
  private monitorClient: MonitorClient;

  constructor(config: AzureConfig) {
    this.subscriptionId = config.subscriptionId;
    this.tenantId = config.tenantId;
    this.clientId = config.clientId;
    this.clientSecret = config.clientSecret;

    this.credential = new DefaultAzureCredential();

    this.computeClient = new ComputeManagementClient(this.credential, this.subscriptionId);
    this.storageClient = new StorageManagementClient(this.credential, this.subscriptionId);
    this.mysqlClient = new MySQLManagementClient(this.credential, this.subscriptionId);
    this.monitorClient = new MonitorClient(this.credential, this.subscriptionId);
  }

  /**
   * Testa a conexão com Azure
   */
  async testConnection(): Promise<{ success: boolean; error?: string }> {
    try {
      const resourceGroups = this.computeClient.virtualMachines.listAll();
      await resourceGroups.next();
      return { success: true };
    } catch (error) {
      return { success: false, error: String(error) };
    }
  }

  /**
   * Obtém máquinas virtuais (VMs) do Azure
   */
  async getVirtualMachines(): Promise<any[]> {
    try {
      const vms: any[] = [];

      for await (const vm of this.computeClient.virtualMachines.listAll()) {
        vms.push({
          id: vm.id,
          name: vm.name,
          type: vm.type,
          location: vm.location,
          vmSize: vm.hardwareProfile?.vmSize,
          osType: vm.storageProfile?.osDisk?.osType,
          provisioningState: vm.provisioningState,
          tags: vm.tags,
        });
      }

      return vms;
    } catch (error) {
      console.error("Erro ao obter VMs:", error);
      return [];
    }
  }

  /**
   * Obtém contas de armazenamento (Storage Accounts) do Azure
   */
  async getStorageAccounts(): Promise<any[]> {
    try {
      const accounts: any[] = [];

      for await (const account of this.storageClient.storageAccounts.list()) {
        accounts.push({
          id: account.id,
          name: account.name,
          type: account.type,
          location: account.location,
          kind: account.kind,
          sku: account.sku?.name,
          accessTier: account.accessTier,
          creationTime: account.creationTime,
          tags: account.tags,
        });
      }

      return accounts;
    } catch (error) {
      console.error("Erro ao obter Storage Accounts:", error);
      return [];
    }
  }

  /**
   * Obtém servidores MySQL do Azure
   */
  async getMySQLServers(): Promise<any[]> {
    try {
      const servers: any[] = [];

      for await (const server of this.mysqlClient.servers.list()) {
        servers.push({
          id: server.id,
          name: server.name,
          type: server.type,
          location: server.location,
          administratorLogin: server.administratorLogin,
          version: server.version,
          sslEnforcement: server.sslEnforcement,
          storageProfile: {
            storageMB: server.storageProfile?.storageMB,
            backupRetentionDays: server.storageProfile?.backupRetentionDays,
          },
          tags: server.tags,
        });
      }

      return servers;
    } catch (error) {
      console.error("Erro ao obter servidores MySQL:", error);
      return [];
    }
  }

  /**
   * Obtém alertas do Azure Monitor
   */
  async getAlerts(): Promise<any[]> {
    try {
      const alerts: any[] = [];

      for await (const alert of this.monitorClient.alertRules.listByResourceGroup(
        "default-resource-group"
      )) {
        alerts.push({
          id: alert.id,
          name: alert.name,
          description: alert.description,
          isEnabled: alert.isEnabled,
          condition: alert.condition,
          actions: alert.actions,
          lastUpdatedTime: alert.lastUpdatedTime,
        });
      }

      return alerts;
    } catch (error) {
      console.error("Erro ao obter alertas:", error);
      return [];
    }
  }

  /**
   * Obtém métricas do Azure Monitor
   */
  async getMetrics(resourceId: string): Promise<any[]> {
    try {
      const metrics: any[] = [];

      const timespan = `${new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()}/${new Date().toISOString()}`;

      for await (const metric of this.monitorClient.metrics.list(resourceId, {
        timespan,
        interval: "PT1H",
      })) {
        metrics.push({
          name: metric.name?.value,
          unit: metric.unit,
          timeseries: metric.timeseries?.map((ts) => ({
            metadata: ts.metadatavalues,
            data: ts.data?.map((d) => ({
              timeStamp: d.timeStamp,
              average: d.average,
              minimum: d.minimum,
              maximum: d.maximum,
              total: d.total,
              count: d.count,
            })),
          })),
        });
      }

      return metrics;
    } catch (error) {
      console.error("Erro ao obter métricas:", error);
      return [];
    }
  }

  /**
   * Sincroniza todos os dados do Azure
   */
  async syncAll(): Promise<{
    status: "success" | "error";
    recordsSynced: number;
    recordsFailed: number;
    error?: string;
  }> {
    try {
      const vms = await this.getVirtualMachines();
      const storageAccounts = await this.getStorageAccounts();
      const mysqlServers = await this.getMySQLServers();
      const alerts = await this.getAlerts();

      const totalRecords = vms.length + storageAccounts.length + mysqlServers.length + alerts.length;

      return {
        status: "success",
        recordsSynced: totalRecords,
        recordsFailed: 0,
      };
    } catch (error) {
      return {
        status: "error",
        recordsSynced: 0,
        recordsFailed: 0,
        error: String(error),
      };
    }
  }
}

export default AzureConnector;

