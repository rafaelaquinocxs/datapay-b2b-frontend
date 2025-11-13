/**
 * Conector Google Analytics
 * Integração com Google Analytics para sincronização de dados de análise
 */

import axios, { AxiosInstance } from "axios";

export interface GoogleAnalyticsConfig {
  clientId: string;
  clientSecret: string;
  refreshToken: string;
  propertyId: string;
}

export interface GoogleAnalyticsEntity {
  id: string;
  type: string;
  data: any;
  lastModified: Date;
}

export class GoogleAnalyticsConnector {
  private config: GoogleAnalyticsConfig;
  private client: AxiosInstance;
  private accessToken: string | null = null;
  private tokenExpiry: Date | null = null;

  constructor(config: GoogleAnalyticsConfig) {
    this.config = config;
    this.client = axios.create({
      baseURL: "https://www.googleapis.com",
      timeout: 30000,
    });
  }

  /**
   * Autentica com Google Analytics usando OAuth 2.0
   */
  async authenticate(): Promise<boolean> {
    try {
      const response = await axios.post(
        "https://oauth2.googleapis.com/token",
        {
          client_id: this.config.clientId,
          client_secret: this.config.clientSecret,
          refresh_token: this.config.refreshToken,
          grant_type: "refresh_token",
        }
      );

      this.accessToken = response.data.access_token;
      this.tokenExpiry = new Date(Date.now() + response.data.expires_in * 1000);

      // Configurar header de autorização
      this.client.defaults.headers.common["Authorization"] = `Bearer ${this.accessToken}`;

      return true;
    } catch (error) {
      console.error("Erro ao autenticar com Google Analytics:", error);
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
   * Obtém dados de tráfego (Traffic Data)
   */
  async getTrafficData(filters?: {
    startDate?: Date;
    endDate?: Date;
    metrics?: string[];
  }): Promise<GoogleAnalyticsEntity[]> {
    await this.ensureValidToken();

    try {
      const startDate = filters?.startDate
        ? filters.startDate.toISOString().split("T")[0]
        : new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];

      const endDate = filters?.endDate
        ? filters.endDate.toISOString().split("T")[0]
        : new Date().toISOString().split("T")[0];

      const metrics = filters?.metrics || ["activeUsers", "screenPageViews", "bounceRate"];

      const response = await this.client.post("/analytics/data/v1beta/properties/${this.config.propertyId}:runReport", {
        dateRanges: [
          {
            startDate,
            endDate,
          },
        ],
        metrics: metrics.map((m) => ({ name: m })),
        dimensions: [
          {
            name: "date",
          },
        ],
      });

      return response.data.rows.map((row: any, index: number) => ({
        id: `traffic-${index}`,
        type: "traffic",
        data: {
          date: row.dimensions[0],
          metrics: row.metricValues.map((v: any, i: number) => ({
            name: metrics[i],
            value: v.value,
          })),
        },
        lastModified: new Date(),
      }));
    } catch (error) {
      console.error("Erro ao obter dados de tráfego:", error);
      return [];
    }
  }

  /**
   * Obtém dados de conversão (Conversion Data)
   */
  async getConversionData(filters?: {
    startDate?: Date;
    endDate?: Date;
    eventName?: string;
  }): Promise<GoogleAnalyticsEntity[]> {
    await this.ensureValidToken();

    try {
      const startDate = filters?.startDate
        ? filters.startDate.toISOString().split("T")[0]
        : new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];

      const endDate = filters?.endDate
        ? filters.endDate.toISOString().split("T")[0]
        : new Date().toISOString().split("T")[0];

      const response = await this.client.post("/analytics/data/v1beta/properties/${this.config.propertyId}:runReport", {
        dateRanges: [
          {
            startDate,
            endDate,
          },
        ],
        metrics: [{ name: "conversions" }, { name: "conversionValue" }],
        dimensions: [{ name: "eventName" }],
        dimensionFilter: filters?.eventName
          ? {
              filter: {
                fieldName: "eventName",
                stringFilter: {
                  matchType: "EXACT",
                  value: filters.eventName,
                },
              },
            }
          : undefined,
      });

      return response.data.rows.map((row: any, index: number) => ({
        id: `conversion-${index}`,
        type: "conversion",
        data: {
          eventName: row.dimensions[0],
          conversions: row.metricValues[0].value,
          conversionValue: row.metricValues[1].value,
        },
        lastModified: new Date(),
      }));
    } catch (error) {
      console.error("Erro ao obter dados de conversão:", error);
      return [];
    }
  }

  /**
   * Obtém dados de usuários (User Data)
   */
  async getUserData(filters?: {
    startDate?: Date;
    endDate?: Date;
  }): Promise<GoogleAnalyticsEntity[]> {
    await this.ensureValidToken();

    try {
      const startDate = filters?.startDate
        ? filters.startDate.toISOString().split("T")[0]
        : new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];

      const endDate = filters?.endDate
        ? filters.endDate.toISOString().split("T")[0]
        : new Date().toISOString().split("T")[0];

      const response = await this.client.post("/analytics/data/v1beta/properties/${this.config.propertyId}:runReport", {
        dateRanges: [
          {
            startDate,
            endDate,
          },
        ],
        metrics: [
          { name: "activeUsers" },
          { name: "newUsers" },
          { name: "returningUsers" },
          { name: "userEngagementDuration" },
        ],
        dimensions: [{ name: "date" }, { name: "country" }],
      });

      return response.data.rows.map((row: any, index: number) => ({
        id: `user-${index}`,
        type: "user",
        data: {
          date: row.dimensions[0],
          country: row.dimensions[1],
          activeUsers: row.metricValues[0].value,
          newUsers: row.metricValues[1].value,
          returningUsers: row.metricValues[2].value,
          engagementDuration: row.metricValues[3].value,
        },
        lastModified: new Date(),
      }));
    } catch (error) {
      console.error("Erro ao obter dados de usuários:", error);
      return [];
    }
  }

  /**
   * Obtém dados de páginas (Page Data)
   */
  async getPageData(filters?: {
    startDate?: Date;
    endDate?: Date;
    limit?: number;
  }): Promise<GoogleAnalyticsEntity[]> {
    await this.ensureValidToken();

    try {
      const startDate = filters?.startDate
        ? filters.startDate.toISOString().split("T")[0]
        : new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];

      const endDate = filters?.endDate
        ? filters.endDate.toISOString().split("T")[0]
        : new Date().toISOString().split("T")[0];

      const response = await this.client.post("/analytics/data/v1beta/properties/${this.config.propertyId}:runReport", {
        dateRanges: [
          {
            startDate,
            endDate,
          },
        ],
        metrics: [
          { name: "screenPageViews" },
          { name: "bounceRate" },
          { name: "averageSessionDuration" },
        ],
        dimensions: [{ name: "pagePath" }],
        orderBys: [
          {
            metric: {
              metricName: "screenPageViews",
            },
            desc: true,
          },
        ],
        limit: filters?.limit || 100,
      });

      return response.data.rows.map((row: any, index: number) => ({
        id: `page-${index}`,
        type: "page",
        data: {
          pagePath: row.dimensions[0],
          pageViews: row.metricValues[0].value,
          bounceRate: row.metricValues[1].value,
          avgSessionDuration: row.metricValues[2].value,
        },
        lastModified: new Date(),
      }));
    } catch (error) {
      console.error("Erro ao obter dados de páginas:", error);
      return [];
    }
  }

  /**
   * Obtém dados de fontes de tráfego (Traffic Sources)
   */
  async getTrafficSources(filters?: {
    startDate?: Date;
    endDate?: Date;
  }): Promise<GoogleAnalyticsEntity[]> {
    await this.ensureValidToken();

    try {
      const startDate = filters?.startDate
        ? filters.startDate.toISOString().split("T")[0]
        : new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];

      const endDate = filters?.endDate
        ? filters.endDate.toISOString().split("T")[0]
        : new Date().toISOString().split("T")[0];

      const response = await this.client.post("/analytics/data/v1beta/properties/${this.config.propertyId}:runReport", {
        dateRanges: [
          {
            startDate,
            endDate,
          },
        ],
        metrics: [{ name: "screenPageViews" }, { name: "activeUsers" }],
        dimensions: [{ name: "sessionSource" }, { name: "sessionMedium" }],
      });

      return response.data.rows.map((row: any, index: number) => ({
        id: `source-${index}`,
        type: "traffic-source",
        data: {
          source: row.dimensions[0],
          medium: row.dimensions[1],
          pageViews: row.metricValues[0].value,
          activeUsers: row.metricValues[1].value,
        },
        lastModified: new Date(),
      }));
    } catch (error) {
      console.error("Erro ao obter fontes de tráfego:", error);
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
      const traffic = await this.getTrafficData();
      const conversions = await this.getConversionData();
      const users = await this.getUserData();
      const pages = await this.getPageData();
      const sources = await this.getTrafficSources();

      const totalRecords = traffic.length + conversions.length + users.length + pages.length + sources.length;

      return {
        success: true,
        recordsSynced: totalRecords,
        recordsFailed: 0,
        details: {
          traffic: traffic.length,
          conversions: conversions.length,
          users: users.length,
          pages: pages.length,
          trafficSources: sources.length,
        },
      };
    } catch (error) {
      console.error("Erro ao sincronizar dados Google Analytics:", error);
      return {
        success: false,
        recordsSynced: 0,
        recordsFailed: 0,
        details: { error: String(error) },
      };
    }
  }

  /**
   * Testa conexão com Google Analytics
   */
  async testConnection(): Promise<boolean> {
    try {
      const authenticated = await this.authenticate();
      if (!authenticated) return false;

      // Tentar fazer uma chamada simples
      const response = await this.client.post("/analytics/data/v1beta/properties/${this.config.propertyId}:runReport", {
        dateRanges: [
          {
            startDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
            endDate: new Date().toISOString().split("T")[0],
          },
        ],
        metrics: [{ name: "activeUsers" }],
      });

      return response.status === 200;
    } catch (error) {
      console.error("Erro ao testar conexão Google Analytics:", error);
      return false;
    }
  }
}

export default GoogleAnalyticsConnector;

