/**
 * Conector SAP S/4HANA
 * Integração com API SAP para sincronização de dados ERP
 */

import axios, { AxiosInstance } from "axios";

export interface SAPConfig {
  clientId: string;
  clientSecret: string;
  baseUrl: string;
  environment: "production" | "sandbox";
  tenant?: string;
}

export interface SAPEntity {
  id: string;
  type: string;
  data: any;
  lastModified: Date;
}

export class SAPConnector {
  private config: SAPConfig;
  private client: AxiosInstance;
  private accessToken: string | null = null;
  private tokenExpiry: Date | null = null;

  constructor(config: SAPConfig) {
    this.config = config;
    this.client = axios.create({
      baseURL: config.baseUrl,
      timeout: 30000,
    });
  }

  /**
   * Autentica com SAP usando OAuth 2.0
   */
  async authenticate(): Promise<boolean> {
    try {
      const response = await axios.post(
        `${this.config.baseUrl}/oauth/token`,
        {
          grant_type: "client_credentials",
          client_id: this.config.clientId,
          client_secret: this.config.clientSecret,
          scope: "read:business-partner read:materials write:documents",
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
      console.error("Erro ao autenticar com SAP:", error);
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
   * Obtém parceiros comerciais (Business Partners)
   */
  async getBusinessPartners(filters?: {
    type?: "customer" | "supplier" | "employee";
    active?: boolean;
  }): Promise<SAPEntity[]> {
    await this.ensureValidToken();

    try {
      const params: any = {};
      if (filters?.type) {
        params.partnerType = filters.type;
      }
      if (filters?.active !== undefined) {
        params.active = filters.active;
      }

      const response = await this.client.get("/api/v1/business-partners", { params });

      return response.data.items.map((item: any) => ({
        id: item.id,
        type: "business-partner",
        data: item,
        lastModified: new Date(item.lastModifiedDateTime),
      }));
    } catch (error) {
      console.error("Erro ao obter parceiros comerciais:", error);
      return [];
    }
  }

  /**
   * Obtém materiais
   */
  async getMaterials(filters?: {
    category?: string;
    active?: boolean;
    plant?: string;
  }): Promise<SAPEntity[]> {
    await this.ensureValidToken();

    try {
      const params: any = {};
      if (filters?.category) {
        params.materialType = filters.category;
      }
      if (filters?.active !== undefined) {
        params.active = filters.active;
      }
      if (filters?.plant) {
        params.plant = filters.plant;
      }

      const response = await this.client.get("/api/v1/materials", { params });

      return response.data.items.map((item: any) => ({
        id: item.id,
        type: "material",
        data: item,
        lastModified: new Date(item.lastModifiedDateTime),
      }));
    } catch (error) {
      console.error("Erro ao obter materiais:", error);
      return [];
    }
  }

  /**
   * Obtém documentos de material (Goods Receipt, Goods Issue, etc)
   */
  async getMaterialDocuments(filters?: {
    startDate?: Date;
    endDate?: Date;
    type?: string;
  }): Promise<SAPEntity[]> {
    await this.ensureValidToken();

    try {
      const params: any = {};
      if (filters?.startDate) {
        params.startDate = filters.startDate.toISOString().split("T")[0];
      }
      if (filters?.endDate) {
        params.endDate = filters.endDate.toISOString().split("T")[0];
      }
      if (filters?.type) {
        params.documentType = filters.type;
      }

      const response = await this.client.get("/api/v1/material-documents", { params });

      return response.data.items.map((item: any) => ({
        id: item.id,
        type: "material-document",
        data: item,
        lastModified: new Date(item.createdDateTime),
      }));
    } catch (error) {
      console.error("Erro ao obter documentos de material:", error);
      return [];
    }
  }

  /**
   * Cria documento de material
   */
  async createMaterialDocument(doc: {
    type: string; // GR, GI, etc
    material: string;
    quantity: number;
    plant: string;
    storageLocation: string;
    date: Date;
    reference?: string;
  }): Promise<{ success: boolean; id?: string; error?: string }> {
    await this.ensureValidToken();

    try {
      const response = await this.client.post("/api/v1/material-documents", {
        documentType: doc.type,
        material: doc.material,
        quantity: doc.quantity,
        plant: doc.plant,
        storageLocation: doc.storageLocation,
        documentDate: doc.date.toISOString().split("T")[0],
        reference: doc.reference,
      });

      return { success: true, id: response.data.id };
    } catch (error) {
      console.error("Erro ao criar documento de material:", error);
      return { success: false, error: String(error) };
    }
  }

  /**
   * Obtém ordens de compra
   */
  async getPurchaseOrders(filters?: {
    vendor?: string;
    startDate?: Date;
    endDate?: Date;
    status?: string;
  }): Promise<SAPEntity[]> {
    await this.ensureValidToken();

    try {
      const params: any = {};
      if (filters?.vendor) {
        params.vendor = filters.vendor;
      }
      if (filters?.startDate) {
        params.startDate = filters.startDate.toISOString().split("T")[0];
      }
      if (filters?.endDate) {
        params.endDate = filters.endDate.toISOString().split("T")[0];
      }
      if (filters?.status) {
        params.status = filters.status;
      }

      const response = await this.client.get("/api/v1/purchase-orders", { params });

      return response.data.items.map((item: any) => ({
        id: item.id,
        type: "purchase-order",
        data: item,
        lastModified: new Date(item.lastModifiedDateTime),
      }));
    } catch (error) {
      console.error("Erro ao obter ordens de compra:", error);
      return [];
    }
  }

  /**
   * Obtém dados de SuccessFactors (RH)
   */
  async getEmployees(filters?: {
    department?: string;
    active?: boolean;
  }): Promise<SAPEntity[]> {
    await this.ensureValidToken();

    try {
      const params: any = {};
      if (filters?.department) {
        params.department = filters.department;
      }
      if (filters?.active !== undefined) {
        params.active = filters.active;
      }

      const response = await this.client.get("/api/v1/employees", { params });

      return response.data.items.map((item: any) => ({
        id: item.id,
        type: "employee",
        data: item,
        lastModified: new Date(item.lastModifiedDateTime),
      }));
    } catch (error) {
      console.error("Erro ao obter funcionários:", error);
      return [];
    }
  }

  /**
   * Obtém dados financeiros
   */
  async getFinancialData(filters?: {
    startDate?: Date;
    endDate?: Date;
    company?: string;
  }): Promise<SAPEntity[]> {
    await this.ensureValidToken();

    try {
      const params: any = {};
      if (filters?.startDate) {
        params.startDate = filters.startDate.toISOString().split("T")[0];
      }
      if (filters?.endDate) {
        params.endDate = filters.endDate.toISOString().split("T")[0];
      }
      if (filters?.company) {
        params.company = filters.company;
      }

      const response = await this.client.get("/api/v1/financial-data", { params });

      return response.data.items.map((item: any) => ({
        id: item.id,
        type: "financial",
        data: item,
        lastModified: new Date(item.createdDateTime),
      }));
    } catch (error) {
      console.error("Erro ao obter dados financeiros:", error);
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
      const partners = await this.getBusinessPartners();
      const materials = await this.getMaterials();
      const documents = await this.getMaterialDocuments();
      const orders = await this.getPurchaseOrders();
      const employees = await this.getEmployees();
      const financial = await this.getFinancialData();

      const totalRecords =
        partners.length +
        materials.length +
        documents.length +
        orders.length +
        employees.length +
        financial.length;

      return {
        success: true,
        recordsSynced: totalRecords,
        recordsFailed: 0,
        details: {
          businessPartners: partners.length,
          materials: materials.length,
          materialDocuments: documents.length,
          purchaseOrders: orders.length,
          employees: employees.length,
          financialData: financial.length,
        },
      };
    } catch (error) {
      console.error("Erro ao sincronizar dados SAP:", error);
      return {
        success: false,
        recordsSynced: 0,
        recordsFailed: 0,
        details: { error: String(error) },
      };
    }
  }

  /**
   * Testa conexão com SAP
   */
  async testConnection(): Promise<boolean> {
    try {
      const authenticated = await this.authenticate();
      if (!authenticated) return false;

      // Tentar fazer uma chamada simples
      const response = await this.client.get("/api/v1/business-partners?$top=1");
      return response.status === 200;
    } catch (error) {
      console.error("Erro ao testar conexão SAP:", error);
      return false;
    }
  }
}

export default SAPConnector;

