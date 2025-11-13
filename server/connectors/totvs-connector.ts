/**
 * Conector TOTVS Protheus
 * Integração com API TOTVS para sincronização de dados ERP
 */

import axios, { AxiosInstance } from "axios";

export interface TOTVSConfig {
  clientId: string;
  clientSecret: string;
  baseUrl: string;
  environment: "production" | "homologacao";
}

export interface TOTVSEntity {
  id: string;
  type: string;
  data: any;
  lastModified: Date;
}

export class TOTVSConnector {
  private config: TOTVSConfig;
  private client: AxiosInstance;
  private accessToken: string | null = null;
  private tokenExpiry: Date | null = null;

  constructor(config: TOTVSConfig) {
    this.config = config;
    this.client = axios.create({
      baseURL: config.baseUrl,
      timeout: 30000,
    });
  }

  /**
   * Autentica com TOTVS usando OAuth 2.0
   */
  async authenticate(): Promise<boolean> {
    try {
      const response = await axios.post(
        `${this.config.baseUrl}/oauth/token`,
        {
          grant_type: "client_credentials",
          client_id: this.config.clientId,
          client_secret: this.config.clientSecret,
          scope: "read:manifest read:materials write:accounting",
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
      console.error("Erro ao autenticar com TOTVS:", error);
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
   * Obtém manifesto (romaneio) do SIGAGFE
   */
  async getManifests(filters?: { startDate?: Date; endDate?: Date }): Promise<TOTVSEntity[]> {
    await this.ensureValidToken();

    try {
      const params: any = {};
      if (filters?.startDate) {
        params.startDate = filters.startDate.toISOString().split("T")[0];
      }
      if (filters?.endDate) {
        params.endDate = filters.endDate.toISOString().split("T")[0];
      }

      const response = await this.client.get("/api/v1/manifest", { params });

      return response.data.items.map((item: any) => ({
        id: item.id,
        type: "manifest",
        data: item,
        lastModified: new Date(item.updatedAt),
      }));
    } catch (error) {
      console.error("Erro ao obter manifestos:", error);
      return [];
    }
  }

  /**
   * Obtém materiais do ERP
   */
  async getMaterials(filters?: { category?: string; active?: boolean }): Promise<TOTVSEntity[]> {
    await this.ensureValidToken();

    try {
      const params: any = {};
      if (filters?.category) {
        params.category = filters.category;
      }
      if (filters?.active !== undefined) {
        params.active = filters.active;
      }

      const response = await this.client.get("/api/v1/materials", { params });

      return response.data.items.map((item: any) => ({
        id: item.id,
        type: "material",
        data: item,
        lastModified: new Date(item.updatedAt),
      }));
    } catch (error) {
      console.error("Erro ao obter materiais:", error);
      return [];
    }
  }

  /**
   * Obtém lançamentos contábeis
   */
  async getAccountingEntries(filters?: {
    startDate?: Date;
    endDate?: Date;
    account?: string;
  }): Promise<TOTVSEntity[]> {
    await this.ensureValidToken();

    try {
      const params: any = {};
      if (filters?.startDate) {
        params.startDate = filters.startDate.toISOString().split("T")[0];
      }
      if (filters?.endDate) {
        params.endDate = filters.endDate.toISOString().split("T")[0];
      }
      if (filters?.account) {
        params.account = filters.account;
      }

      const response = await this.client.get("/api/v1/accounting", { params });

      return response.data.items.map((item: any) => ({
        id: item.id,
        type: "accounting",
        data: item,
        lastModified: new Date(item.createdAt),
      }));
    } catch (error) {
      console.error("Erro ao obter lançamentos contábeis:", error);
      return [];
    }
  }

  /**
   * Cria lançamento contábil
   */
  async createAccountingEntry(entry: {
    account: string;
    debit: number;
    credit: number;
    description: string;
    date: Date;
  }): Promise<{ success: boolean; id?: string; error?: string }> {
    await this.ensureValidToken();

    try {
      const response = await this.client.post("/api/v1/accounting", {
        account: entry.account,
        debit: entry.debit,
        credit: entry.credit,
        description: entry.description,
        date: entry.date.toISOString().split("T")[0],
      });

      return { success: true, id: response.data.id };
    } catch (error) {
      console.error("Erro ao criar lançamento contábil:", error);
      return { success: false, error: String(error) };
    }
  }

  /**
   * Obtém dados de GeoService (Agricultura)
   */
  async getGeoServiceData(filters?: { farm?: string; crop?: string }): Promise<TOTVSEntity[]> {
    await this.ensureValidToken();

    try {
      const params: any = {};
      if (filters?.farm) {
        params.farm = filters.farm;
      }
      if (filters?.crop) {
        params.crop = filters.crop;
      }

      const response = await this.client.get("/api/v1/geoservice", { params });

      return response.data.items.map((item: any) => ({
        id: item.id,
        type: "geoservice",
        data: item,
        lastModified: new Date(item.updatedAt),
      }));
    } catch (error) {
      console.error("Erro ao obter dados de GeoService:", error);
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
      const manifests = await this.getManifests();
      const materials = await this.getMaterials();
      const accounting = await this.getAccountingEntries();
      const geoservice = await this.getGeoServiceData();

      const totalRecords = manifests.length + materials.length + accounting.length + geoservice.length;

      return {
        success: true,
        recordsSynced: totalRecords,
        recordsFailed: 0,
        details: {
          manifests: manifests.length,
          materials: materials.length,
          accounting: accounting.length,
          geoservice: geoservice.length,
        },
      };
    } catch (error) {
      console.error("Erro ao sincronizar dados TOTVS:", error);
      return {
        success: false,
        recordsSynced: 0,
        recordsFailed: 0,
        details: { error: String(error) },
      };
    }
  }

  /**
   * Testa conexão com TOTVS
   */
  async testConnection(): Promise<boolean> {
    try {
      const authenticated = await this.authenticate();
      if (!authenticated) return false;

      // Tentar fazer uma chamada simples
      const response = await this.client.get("/api/v1/manifest?limit=1");
      return response.status === 200;
    } catch (error) {
      console.error("Erro ao testar conexão TOTVS:", error);
      return false;
    }
  }
}

export default TOTVSConnector;

