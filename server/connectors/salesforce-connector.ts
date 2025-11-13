/**
 * Conector Salesforce
 * Integração com Salesforce para sincronização de dados CRM
 */

import axios, { AxiosInstance } from "axios";

export interface SalesforceConfig {
  clientId: string;
  clientSecret: string;
  baseUrl: string;
  environment: "production" | "sandbox";
}

export interface SalesforceEntity {
  id: string;
  type: string;
  data: any;
  lastModified: Date;
}

export class SalesforceConnector {
  private config: SalesforceConfig;
  private client: AxiosInstance;
  private accessToken: string | null = null;
  private tokenExpiry: Date | null = null;
  private instanceUrl: string | null = null;

  constructor(config: SalesforceConfig) {
    this.config = config;
    this.client = axios.create({
      timeout: 30000,
    });
  }

  /**
   * Autentica com Salesforce usando OAuth 2.0
   */
  async authenticate(): Promise<boolean> {
    try {
      const response = await axios.post(
        `${this.config.baseUrl}/services/oauth2/token`,
        {
          grant_type: "client_credentials",
          client_id: this.config.clientId,
          client_secret: this.config.clientSecret,
          scope: "api refresh_token",
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      this.accessToken = response.data.access_token;
      this.instanceUrl = response.data.instance_url;
      this.tokenExpiry = new Date(Date.now() + response.data.expires_in * 1000);

      // Configurar client com instance URL
      this.client.defaults.baseURL = this.instanceUrl;
      this.client.defaults.headers.common["Authorization"] = `Bearer ${this.accessToken}`;
      this.client.defaults.headers.common["Content-Type"] = "application/json";

      return true;
    } catch (error) {
      console.error("Erro ao autenticar com Salesforce:", error);
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
   * Obtém contas (Accounts)
   */
  async getAccounts(filters?: {
    industry?: string;
    type?: string;
    active?: boolean;
  }): Promise<SalesforceEntity[]> {
    await this.ensureValidToken();

    try {
      let query = "SELECT Id, Name, Industry, Type, BillingCity, Phone FROM Account";
      const conditions: string[] = [];

      if (filters?.industry) {
        conditions.push(`Industry = '${filters.industry}'`);
      }
      if (filters?.type) {
        conditions.push(`Type = '${filters.type}'`);
      }

      if (conditions.length > 0) {
        query += " WHERE " + conditions.join(" AND ");
      }

      const response = await this.client.get("/services/data/v57.0/query", {
        params: { q: query },
      });

      return response.data.records.map((record: any) => ({
        id: record.Id,
        type: "account",
        data: record,
        lastModified: new Date(record.SystemModstamp),
      }));
    } catch (error) {
      console.error("Erro ao obter contas:", error);
      return [];
    }
  }

  /**
   * Obtém contatos (Contacts)
   */
  async getContacts(filters?: {
    accountId?: string;
    email?: string;
  }): Promise<SalesforceEntity[]> {
    await this.ensureValidToken();

    try {
      let query =
        "SELECT Id, FirstName, LastName, Email, Phone, AccountId, Title FROM Contact";
      const conditions: string[] = [];

      if (filters?.accountId) {
        conditions.push(`AccountId = '${filters.accountId}'`);
      }
      if (filters?.email) {
        conditions.push(`Email = '${filters.email}'`);
      }

      if (conditions.length > 0) {
        query += " WHERE " + conditions.join(" AND ");
      }

      const response = await this.client.get("/services/data/v57.0/query", {
        params: { q: query },
      });

      return response.data.records.map((record: any) => ({
        id: record.Id,
        type: "contact",
        data: record,
        lastModified: new Date(record.SystemModstamp),
      }));
    } catch (error) {
      console.error("Erro ao obter contatos:", error);
      return [];
    }
  }

  /**
   * Obtém oportunidades (Opportunities)
   */
  async getOpportunities(filters?: {
    accountId?: string;
    stage?: string;
    minAmount?: number;
  }): Promise<SalesforceEntity[]> {
    await this.ensureValidToken();

    try {
      let query =
        "SELECT Id, Name, AccountId, Amount, StageName, CloseDate, Probability FROM Opportunity";
      const conditions: string[] = [];

      if (filters?.accountId) {
        conditions.push(`AccountId = '${filters.accountId}'`);
      }
      if (filters?.stage) {
        conditions.push(`StageName = '${filters.stage}'`);
      }
      if (filters?.minAmount) {
        conditions.push(`Amount >= ${filters.minAmount}`);
      }

      if (conditions.length > 0) {
        query += " WHERE " + conditions.join(" AND ");
      }

      const response = await this.client.get("/services/data/v57.0/query", {
        params: { q: query },
      });

      return response.data.records.map((record: any) => ({
        id: record.Id,
        type: "opportunity",
        data: record,
        lastModified: new Date(record.SystemModstamp),
      }));
    } catch (error) {
      console.error("Erro ao obter oportunidades:", error);
      return [];
    }
  }

  /**
   * Obtém leads (Leads)
   */
  async getLeads(filters?: {
    status?: string;
    source?: string;
    company?: string;
  }): Promise<SalesforceEntity[]> {
    await this.ensureValidToken();

    try {
      let query =
        "SELECT Id, FirstName, LastName, Email, Phone, Company, Status, LeadSource FROM Lead";
      const conditions: string[] = [];

      if (filters?.status) {
        conditions.push(`Status = '${filters.status}'`);
      }
      if (filters?.source) {
        conditions.push(`LeadSource = '${filters.source}'`);
      }
      if (filters?.company) {
        conditions.push(`Company = '${filters.company}'`);
      }

      if (conditions.length > 0) {
        query += " WHERE " + conditions.join(" AND ");
      }

      const response = await this.client.get("/services/data/v57.0/query", {
        params: { q: query },
      });

      return response.data.records.map((record: any) => ({
        id: record.Id,
        type: "lead",
        data: record,
        lastModified: new Date(record.SystemModstamp),
      }));
    } catch (error) {
      console.error("Erro ao obter leads:", error);
      return [];
    }
  }

  /**
   * Obtém tarefas (Tasks)
   */
  async getTasks(filters?: {
    status?: string;
    priority?: string;
    dueDate?: Date;
  }): Promise<SalesforceEntity[]> {
    await this.ensureValidToken();

    try {
      let query = "SELECT Id, Subject, Status, Priority, DueDate, WhoId FROM Task";
      const conditions: string[] = [];

      if (filters?.status) {
        conditions.push(`Status = '${filters.status}'`);
      }
      if (filters?.priority) {
        conditions.push(`Priority = '${filters.priority}'`);
      }
      if (filters?.dueDate) {
        const dueDate = filters.dueDate.toISOString().split("T")[0];
        conditions.push(`DueDate >= ${dueDate}`);
      }

      if (conditions.length > 0) {
        query += " WHERE " + conditions.join(" AND ");
      }

      const response = await this.client.get("/services/data/v57.0/query", {
        params: { q: query },
      });

      return response.data.records.map((record: any) => ({
        id: record.Id,
        type: "task",
        data: record,
        lastModified: new Date(record.SystemModstamp),
      }));
    } catch (error) {
      console.error("Erro ao obter tarefas:", error);
      return [];
    }
  }

  /**
   * Cria conta (Account)
   */
  async createAccount(account: {
    name: string;
    industry?: string;
    type?: string;
    phone?: string;
    website?: string;
  }): Promise<{ success: boolean; id?: string; error?: string }> {
    await this.ensureValidToken();

    try {
      const response = await this.client.post("/services/data/v57.0/sobjects/Account", {
        Name: account.name,
        Industry: account.industry,
        Type: account.type,
        Phone: account.phone,
        Website: account.website,
      });

      return { success: true, id: response.data.id };
    } catch (error) {
      console.error("Erro ao criar conta:", error);
      return { success: false, error: String(error) };
    }
  }

  /**
   * Atualiza conta (Account)
   */
  async updateAccount(
    accountId: string,
    updates: Partial<{
      name: string;
      industry: string;
      type: string;
      phone: string;
      website: string;
    }>
  ): Promise<{ success: boolean; error?: string }> {
    await this.ensureValidToken();

    try {
      await this.client.patch(`/services/data/v57.0/sobjects/Account/${accountId}`, updates);
      return { success: true };
    } catch (error) {
      console.error("Erro ao atualizar conta:", error);
      return { success: false, error: String(error) };
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
      const accounts = await this.getAccounts();
      const contacts = await this.getContacts();
      const opportunities = await this.getOpportunities();
      const leads = await this.getLeads();
      const tasks = await this.getTasks();

      const totalRecords =
        accounts.length + contacts.length + opportunities.length + leads.length + tasks.length;

      return {
        success: true,
        recordsSynced: totalRecords,
        recordsFailed: 0,
        details: {
          accounts: accounts.length,
          contacts: contacts.length,
          opportunities: opportunities.length,
          leads: leads.length,
          tasks: tasks.length,
        },
      };
    } catch (error) {
      console.error("Erro ao sincronizar dados Salesforce:", error);
      return {
        success: false,
        recordsSynced: 0,
        recordsFailed: 0,
        details: { error: String(error) },
      };
    }
  }

  /**
   * Testa conexão com Salesforce
   */
  async testConnection(): Promise<boolean> {
    try {
      const authenticated = await this.authenticate();
      if (!authenticated) return false;

      // Tentar fazer uma chamada simples
      const response = await this.client.get("/services/data/v57.0/query", {
        params: { q: "SELECT Id FROM Account LIMIT 1" },
      });
      return response.status === 200;
    } catch (error) {
      console.error("Erro ao testar conexão Salesforce:", error);
      return false;
    }
  }
}

export default SalesforceConnector;

