/**
 * Tableau Connector
 * Integração com Tableau para sincronizar dashboards, workbooks, datasources
 */

import axios, { AxiosInstance } from "axios";

export interface TableauConfig {
  serverUrl: string; // ex: https://mycompany.tableau.com
  username: string;
  password: string;
  siteId?: string;
}

export class TableauConnector {
  private serverUrl: string;
  private username: string;
  private password: string;
  private siteId: string;
  private client: AxiosInstance;
  private authToken: string = "";
  private userId: string = "";

  constructor(config: TableauConfig) {
    this.serverUrl = config.serverUrl;
    this.username = config.username;
    this.password = config.password;
    this.siteId = config.siteId || "";

    this.client = axios.create({
      baseURL: `${this.serverUrl}/api/3.20`,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  /**
   * Autentica com Tableau
   */
  async authenticate(): Promise<{ success: boolean; error?: string }> {
    try {
      const response = await this.client.post("/auth/signin", {
        credentials: {
          name: this.username,
          password: this.password,
          site: {
            contentUrl: this.siteId,
          },
        },
      });

      this.authToken = response.data.credentials.token;
      this.userId = response.data.credentials.user.id;

      this.client.defaults.headers.common["X-Tableau-Auth"] = this.authToken;

      return { success: true };
    } catch (error) {
      return { success: false, error: String(error) };
    }
  }

  /**
   * Testa a conexão com Tableau
   */
  async testConnection(): Promise<{ success: boolean; error?: string }> {
    try {
      const auth = await this.authenticate();
      if (!auth.success) {
        return auth;
      }

      await this.client.get("/sites");
      return { success: true };
    } catch (error) {
      return { success: false, error: String(error) };
    }
  }

  /**
   * Obtém workbooks do Tableau
   */
  async getWorkbooks(limit: number = 100): Promise<any[]> {
    try {
      if (!this.authToken) {
        await this.authenticate();
      }

      const response = await this.client.get("/sites/me/workbooks", {
        params: { pageSize: limit },
      });

      return response.data.pagination.pageNumber === 1
        ? response.data.workbook.map((wb: any) => ({
            id: wb.id,
            name: wb.name,
            description: wb.description,
            webpageUrl: wb.webpageUrl,
            contentUrl: wb.contentUrl,
            owner: wb.owner?.name,
            createdAt: wb.createdAt,
            updatedAt: wb.updatedAt,
          }))
        : [];
    } catch (error) {
      console.error("Erro ao obter workbooks:", error);
      return [];
    }
  }

  /**
   * Obtém dashboards do Tableau
   */
  async getDashboards(limit: number = 100): Promise<any[]> {
    try {
      if (!this.authToken) {
        await this.authenticate();
      }

      const response = await this.client.get("/sites/me/workbooks", {
        params: { pageSize: limit },
      });

      const dashboards: any[] = [];

      for (const workbook of response.data.workbook || []) {
        const views = await this.client.get(`/sites/me/workbooks/${workbook.id}/views`);
        for (const view of views.data.view || []) {
          dashboards.push({
            id: view.id,
            name: view.name,
            workbookId: workbook.id,
            workbookName: workbook.name,
            webpageUrl: view.webpageUrl,
            contentUrl: view.contentUrl,
          });
        }
      }

      return dashboards;
    } catch (error) {
      console.error("Erro ao obter dashboards:", error);
      return [];
    }
  }

  /**
   * Obtém datasources do Tableau
   */
  async getDatasources(limit: number = 100): Promise<any[]> {
    try {
      if (!this.authToken) {
        await this.authenticate();
      }

      const response = await this.client.get("/sites/me/datasources", {
        params: { pageSize: limit },
      });

      return response.data.datasource.map((ds: any) => ({
        id: ds.id,
        name: ds.name,
        description: ds.description,
        contentUrl: ds.contentUrl,
        webpageUrl: ds.webpageUrl,
        owner: ds.owner?.name,
        createdAt: ds.createdAt,
        updatedAt: ds.updatedAt,
      }));
    } catch (error) {
      console.error("Erro ao obter datasources:", error);
      return [];
    }
  }

  /**
   * Obtém usuários do Tableau
   */
  async getUsers(limit: number = 100): Promise<any[]> {
    try {
      if (!this.authToken) {
        await this.authenticate();
      }

      const response = await this.client.get("/sites/me/users", {
        params: { pageSize: limit },
      });

      return response.data.user.map((user: any) => ({
        id: user.id,
        name: user.name,
        email: user.email,
        siteRole: user.siteRole,
        fullName: user.fullName,
      }));
    } catch (error) {
      console.error("Erro ao obter usuários:", error);
      return [];
    }
  }

  /**
   * Sincroniza todos os dados do Tableau
   */
  async syncAll(): Promise<{
    status: "success" | "error";
    recordsSynced: number;
    recordsFailed: number;
    error?: string;
  }> {
    try {
      const auth = await this.authenticate();
      if (!auth.success) {
        throw new Error(auth.error);
      }

      const workbooks = await this.getWorkbooks();
      const dashboards = await this.getDashboards();
      const datasources = await this.getDatasources();
      const users = await this.getUsers();

      const totalRecords = workbooks.length + dashboards.length + datasources.length + users.length;

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

export default TableauConnector;

