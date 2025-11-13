/**
 * Conector Power BI
 * Integração com Power BI para sincronização de dados de BI
 */

import axios, { AxiosInstance } from "axios";

export interface PowerBIConfig {
  clientId: string;
  clientSecret: string;
  tenantId: string;
}

export interface PowerBIEntity {
  id: string;
  type: string;
  data: any;
  lastModified: Date;
}

export class PowerBIConnector {
  private config: PowerBIConfig;
  private client: AxiosInstance;
  private accessToken: string | null = null;
  private tokenExpiry: Date | null = null;

  constructor(config: PowerBIConfig) {
    this.config = config;
    this.client = axios.create({
      baseURL: "https://api.powerbi.com",
      timeout: 30000,
    });
  }

  /**
   * Autentica com Power BI usando OAuth 2.0
   */
  async authenticate(): Promise<boolean> {
    try {
      const response = await axios.post(
        `https://login.microsoftonline.com/${this.config.tenantId}/oauth2/v2.0/token`,
        {
          client_id: this.config.clientId,
          client_secret: this.config.clientSecret,
          scope: "https://analysis.windows.net/powerbi/api/.default",
          grant_type: "client_credentials",
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      this.accessToken = response.data.access_token;
      this.tokenExpiry = new Date(Date.now() + response.data.expires_in * 1000);

      // Configurar header de autorização
      this.client.defaults.headers.common["Authorization"] = `Bearer ${this.accessToken}`;

      return true;
    } catch (error) {
      console.error("Erro ao autenticar com Power BI:", error);
      return false;
    }
  }

  /**
   * Verifica se token está expirado
   */
  private isTokenExpired(): boolean {
    if (!this.tokenExpiry) return true;
    return new Date() >= this.tokenExpiry;
  }

  /**
   * Renova token se necessário
   */
  private async ensureValidToken(): Promise<void> {
    if (this.isTokenExpired()) {
      await this.authenticate();
    }
  }

  /**
   * Obtém grupos (Workspaces)
   */
  async getGroups(filters?: { name?: string }): Promise<PowerBIEntity[]> {
    await this.ensureValidToken();

    try {
      const response = await this.client.get("/v1.0/myorg/groups");

      let groups = response.data.value;

      if (filters?.name) {
        groups = groups.filter((g: any) => g.name.includes(filters.name));
      }

      return groups.map((group: any) => ({
        id: group.id,
        type: "group",
        data: group,
        lastModified: new Date(),
      }));
    } catch (error) {
      console.error("Erro ao obter grupos:", error);
      return [];
    }
  }

  /**
   * Obtém datasets
   */
  async getDatasets(filters?: { groupId?: string }): Promise<PowerBIEntity[]> {
    await this.ensureValidToken();

    try {
      const url = filters?.groupId
        ? `/v1.0/myorg/groups/${filters.groupId}/datasets`
        : "/v1.0/myorg/datasets";

      const response = await this.client.get(url);

      return response.data.value.map((dataset: any) => ({
        id: dataset.id,
        type: "dataset",
        data: dataset,
        lastModified: new Date(dataset.createdDate),
      }));
    } catch (error) {
      console.error("Erro ao obter datasets:", error);
      return [];
    }
  }

  /**
   * Obtém relatórios (Reports)
   */
  async getReports(filters?: { groupId?: string }): Promise<PowerBIEntity[]> {
    await this.ensureValidToken();

    try {
      const url = filters?.groupId
        ? `/v1.0/myorg/groups/${filters.groupId}/reports`
        : "/v1.0/myorg/reports";

      const response = await this.client.get(url);

      return response.data.value.map((report: any) => ({
        id: report.id,
        type: "report",
        data: report,
        lastModified: new Date(),
      }));
    } catch (error) {
      console.error("Erro ao obter relatórios:", error);
      return [];
    }
  }

  /**
   * Obtém dashboards
   */
  async getDashboards(filters?: { groupId?: string }): Promise<PowerBIEntity[]> {
    await this.ensureValidToken();

    try {
      const url = filters?.groupId
        ? `/v1.0/myorg/groups/${filters.groupId}/dashboards`
        : "/v1.0/myorg/dashboards";

      const response = await this.client.get(url);

      return response.data.value.map((dashboard: any) => ({
        id: dashboard.id,
        type: "dashboard",
        data: dashboard,
        lastModified: new Date(),
      }));
    } catch (error) {
      console.error("Erro ao obter dashboards:", error);
      return [];
    }
  }

  /**
   * Obtém tiles de um dashboard
   */
  async getDashboardTiles(
    dashboardId: string,
    filters?: { groupId?: string }
  ): Promise<PowerBIEntity[]> {
    await this.ensureValidToken();

    try {
      const url = filters?.groupId
        ? `/v1.0/myorg/groups/${filters.groupId}/dashboards/${dashboardId}/tiles`
        : `/v1.0/myorg/dashboards/${dashboardId}/tiles`;

      const response = await this.client.get(url);

      return response.data.value.map((tile: any, index: number) => ({
        id: `${dashboardId}-tile-${index}`,
        type: "tile",
        data: tile,
        lastModified: new Date(),
      }));
    } catch (error) {
      console.error("Erro ao obter tiles do dashboard:", error);
      return [];
    }
  }

  /**
   * Obtém tabelas de um dataset
   */
  async getDatasetTables(datasetId: string): Promise<PowerBIEntity[]> {
    await this.ensureValidToken();

    try {
      const response = await this.client.get(`/v1.0/myorg/datasets/${datasetId}/tables`);

      return response.data.value.map((table: any) => ({
        id: table.name,
        type: "table",
        data: table,
        lastModified: new Date(),
      }));
    } catch (error) {
      console.error("Erro ao obter tabelas do dataset:", error);
      return [];
    }
  }

  /**
   * Obtém colunas de uma tabela
   */
  async getTableColumns(datasetId: string, tableName: string): Promise<PowerBIEntity[]> {
    await this.ensureValidToken();

    try {
      const response = await this.client.get(
        `/v1.0/myorg/datasets/${datasetId}/tables/${tableName}`
      );

      return response.data.columns.map((column: any, index: number) => ({
        id: `${tableName}-col-${index}`,
        type: "column",
        data: column,
        lastModified: new Date(),
      }));
    } catch (error) {
      console.error("Erro ao obter colunas da tabela:", error);
      return [];
    }
  }

  /**
   * Obtém medidas de um dataset
   */
  async getDatasetMeasures(datasetId: string): Promise<PowerBIEntity[]> {
    await this.ensureValidToken();

    try {
      const response = await this.client.get(`/v1.0/myorg/datasets/${datasetId}/tables`);

      const measures: any[] = [];

      response.data.value.forEach((table: any) => {
        if (table.measures) {
          table.measures.forEach((measure: any) => {
            measures.push({
              id: `${table.name}-${measure.name}`,
              type: "measure",
              data: {
                tableName: table.name,
                ...measure,
              },
              lastModified: new Date(),
            });
          });
        }
      });

      return measures;
    } catch (error) {
      console.error("Erro ao obter medidas do dataset:", error);
      return [];
    }
  }

  /**
   * Obtém dados de capacidades
   */
  async getCapacities(): Promise<PowerBIEntity[]> {
    await this.ensureValidToken();

    try {
      const response = await this.client.get("/v1.0/myorg/capacities");

      return response.data.value.map((capacity: any) => ({
        id: capacity.id,
        type: "capacity",
        data: capacity,
        lastModified: new Date(),
      }));
    } catch (error) {
      console.error("Erro ao obter capacidades:", error);
      return [];
    }
  }

  /**
   * Obtém dados de aplicativos (Apps)
   */
  async getApps(): Promise<PowerBIEntity[]> {
    await this.ensureValidToken();

    try {
      const response = await this.client.get("/v1.0/myorg/apps");

      return response.data.value.map((app: any) => ({
        id: app.id,
        type: "app",
        data: app,
        lastModified: new Date(),
      }));
    } catch (error) {
      console.error("Erro ao obter aplicativos:", error);
      return [];
    }
  }

  /**
   * Sincroniza todos os dados
   */
  async syncAll(): Promise<{
    success: boolean;
    recordsSynced: number;
    recordsFailed: number;
    details: any;
  }> {
    try {
      const groups = await this.getGroups();
      const datasets = await this.getDatasets();
      const reports = await this.getReports();
      const dashboards = await this.getDashboards();
      const capacities = await this.getCapacities();
      const apps = await this.getApps();

      const totalRecords =
        groups.length +
        datasets.length +
        reports.length +
        dashboards.length +
        capacities.length +
        apps.length;

      return {
        success: true,
        recordsSynced: totalRecords,
        recordsFailed: 0,
        details: {
          groups: groups.length,
          datasets: datasets.length,
          reports: reports.length,
          dashboards: dashboards.length,
          capacities: capacities.length,
          apps: apps.length,
        },
      };
    } catch (error) {
      console.error("Erro ao sincronizar dados Power BI:", error);
      return {
        success: false,
        recordsSynced: 0,
        recordsFailed: 0,
        details: { error: String(error) },
      };
    }
  }

  /**
   * Testa conexão com Power BI
   */
  async testConnection(): Promise<boolean> {
    try {
      const authenticated = await this.authenticate();
      if (!authenticated) return false;

      // Tentar fazer uma chamada simples
      const response = await this.client.get("/v1.0/myorg/groups?$top=1");
      return response.status === 200;
    } catch (error) {
      console.error("Erro ao testar conexão Power BI:", error);
      return false;
    }
  }
}

export default PowerBIConnector;

