/**
 * HubSpot Connector
 * Integração com HubSpot CRM para sincronizar contatos, deals, campanhas
 */

import axios, { AxiosInstance } from "axios";

export interface HubSpotConfig {
  apiKey: string;
  accessToken?: string;
}

export class HubSpotConnector {
  private apiKey: string;
  private accessToken: string;
  private client: AxiosInstance;
  private baseURL = "https://api.hubapi.com";

  constructor(config: HubSpotConfig) {
    this.apiKey = config.apiKey;
    this.accessToken = config.accessToken || "";

    this.client = axios.create({
      baseURL: this.baseURL,
      headers: {
        "Authorization": `Bearer ${this.accessToken || this.apiKey}`,
        "Content-Type": "application/json",
      },
    });
  }

  /**
   * Testa a conexão com HubSpot
   */
  async testConnection(): Promise<{ success: boolean; error?: string }> {
    try {
      const response = await this.client.get("/crm/v3/objects/contacts?limit=1");
      return { success: true };
    } catch (error) {
      return { success: false, error: String(error) };
    }
  }

  /**
   * Obtém contatos do HubSpot
   */
  async getContacts(limit: number = 100): Promise<any[]> {
    try {
      const response = await this.client.get("/crm/v3/objects/contacts", {
        params: {
          limit,
          properties: [
            "firstname",
            "lastname",
            "email",
            "phone",
            "company",
            "lifecyclestage",
            "hs_lead_status",
          ],
        },
      });

      return response.data.results.map((contact: any) => ({
        id: contact.id,
        firstName: contact.properties.firstname,
        lastName: contact.properties.lastname,
        email: contact.properties.email,
        phone: contact.properties.phone,
        company: contact.properties.company,
        lifecycleStage: contact.properties.lifecyclestage,
        leadStatus: contact.properties.hs_lead_status,
      }));
    } catch (error) {
      console.error("Erro ao obter contatos:", error);
      return [];
    }
  }

  /**
   * Obtém deals (oportunidades) do HubSpot
   */
  async getDeals(limit: number = 100): Promise<any[]> {
    try {
      const response = await this.client.get("/crm/v3/objects/deals", {
        params: {
          limit,
          properties: [
            "dealname",
            "dealstage",
            "amount",
            "closedate",
            "dealowner",
            "hubspot_owner_id",
          ],
        },
      });

      return response.data.results.map((deal: any) => ({
        id: deal.id,
        name: deal.properties.dealname,
        stage: deal.properties.dealstage,
        amount: deal.properties.amount,
        closeDate: deal.properties.closedate,
        owner: deal.properties.dealowner,
      }));
    } catch (error) {
      console.error("Erro ao obter deals:", error);
      return [];
    }
  }

  /**
   * Obtém campanhas do HubSpot
   */
  async getCampaigns(limit: number = 100): Promise<any[]> {
    try {
      const response = await this.client.get("/marketing/v3/campaigns", {
        params: { limit },
      });

      return response.data.campaigns.map((campaign: any) => ({
        id: campaign.id,
        name: campaign.name,
        type: campaign.type,
        status: campaign.status,
        createdAt: campaign.createdAt,
        updatedAt: campaign.updatedAt,
      }));
    } catch (error) {
      console.error("Erro ao obter campanhas:", error);
      return [];
    }
  }

  /**
   * Obtém empresas do HubSpot
   */
  async getCompanies(limit: number = 100): Promise<any[]> {
    try {
      const response = await this.client.get("/crm/v3/objects/companies", {
        params: {
          limit,
          properties: ["name", "industry", "website", "phone", "country"],
        },
      });

      return response.data.results.map((company: any) => ({
        id: company.id,
        name: company.properties.name,
        industry: company.properties.industry,
        website: company.properties.website,
        phone: company.properties.phone,
        country: company.properties.country,
      }));
    } catch (error) {
      console.error("Erro ao obter empresas:", error);
      return [];
    }
  }

  /**
   * Sincroniza todos os dados do HubSpot
   */
  async syncAll(): Promise<{
    status: "success" | "error";
    recordsSynced: number;
    recordsFailed: number;
    error?: string;
  }> {
    try {
      const contacts = await this.getContacts();
      const deals = await this.getDeals();
      const campaigns = await this.getCampaigns();
      const companies = await this.getCompanies();

      const totalRecords = contacts.length + deals.length + campaigns.length + companies.length;

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

export default HubSpotConnector;

