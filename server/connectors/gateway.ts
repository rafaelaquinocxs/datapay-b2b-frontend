/**
 * API Gateway para Gerenciar Integrações de Conectores
 * Responsável por autenticação, sincronização e transformação de dados
 */

import { Router, Request, Response } from "express";
import crypto from "crypto";

// ============================================================================
// TIPOS E INTERFACES
// ============================================================================

export interface ConnectorCredentials {
  id: string;
  connectorType: string;
  apiKey?: string;
  clientId?: string;
  clientSecret?: string;
  accessToken?: string;
  refreshToken?: string;
  baseUrl?: string;
  username?: string;
  password?: string;
  encryptedAt: Date;
}

export interface ConnectorStatus {
  id: string;
  name: string;
  status: "connected" | "disconnected" | "error" | "syncing";
  lastSync?: Date;
  nextSync?: Date;
  recordsSync?: number;
  error?: string;
}

export interface SyncResult {
  connectorId: string;
  status: "success" | "error";
  recordsSynced: number;
  recordsFailed: number;
  duration: number;
  timestamp: Date;
  error?: string;
}

export interface ConnectorConfig {
  id: string;
  name: string;
  icon: string;
  category: string;
  authType: "oauth" | "apikey" | "basic" | "certificate";
  baseUrl: string;
  endpoints: {
    [key: string]: string;
  };
  requiredScopes?: string[];
}

// ============================================================================
// CONFIGURAÇÕES DE CONECTORES
// ============================================================================

const CONNECTOR_CONFIGS: { [key: string]: ConnectorConfig } = {
  totvs: {
    id: "totvs",
    name: "TOTVS Protheus",
    icon: "🔧",
    category: "ERP",
    authType: "oauth",
    baseUrl: "https://api.totvs.com.br",
    endpoints: {
      manifest: "/api/v1/manifest",
      geoservice: "/api/v1/geoservice",
      accounting: "/api/v1/accounting",
      materials: "/api/v1/materials",
    },
    requiredScopes: ["read:manifest", "read:materials", "write:accounting"],
  },

  sap: {
    id: "sap",
    name: "SAP S/4HANA",
    icon: "📊",
    category: "ERP",
    authType: "oauth",
    baseUrl: "https://api.sap.com",
    endpoints: {
      businessPartner: "/api/v1/business-partners",
      materials: "/api/v1/materials",
      documents: "/api/v1/material-documents",
      orders: "/api/v1/purchase-orders",
    },
    requiredScopes: ["read:business-partner", "read:materials", "write:documents"],
  },

  salesforce: {
    id: "salesforce",
    name: "Salesforce",
    icon: "☁️",
    category: "CRM",
    authType: "oauth",
    baseUrl: "https://login.salesforce.com",
    endpoints: {
      accounts: "/services/data/v57.0/sobjects/Account",
      contacts: "/services/data/v57.0/sobjects/Contact",
      opportunities: "/services/data/v57.0/sobjects/Opportunity",
      leads: "/services/data/v57.0/sobjects/Lead",
      tasks: "/services/data/v57.0/sobjects/Task",
    },
    requiredScopes: ["api", "refresh_token"],
  },

  googleanalytics: {
    id: "googleanalytics",
    name: "Google Analytics",
    icon: "📈",
    category: "Analytics",
    authType: "oauth",
    baseUrl: "https://www.googleapis.com",
    endpoints: {
      traffic: "/analytics/data/v1beta/properties",
      conversions: "/analytics/data/v1beta/properties",
      users: "/analytics/data/v1beta/properties",
      pages: "/analytics/data/v1beta/properties",
    },
    requiredScopes: ["https://www.googleapis.com/auth/analytics.readonly"],
  },

  powerbi: {
    id: "powerbi",
    name: "Power BI",
    icon: "📊",
    category: "BI",
    authType: "oauth",
    baseUrl: "https://api.powerbi.com",
    endpoints: {
      groups: "/v1.0/myorg/groups",
      datasets: "/v1.0/myorg/datasets",
      reports: "/v1.0/myorg/reports",
      dashboards: "/v1.0/myorg/dashboards",
    },
    requiredScopes: ["Dataset.Read.All", "Report.Read.All"],
  },



  hubspot: {
    id: "hubspot",
    name: "HubSpot",
    icon: "🎯",
    category: "CRM",
    authType: "apikey",
    baseUrl: "https://api.hubapi.com",
    endpoints: {
      contacts: "/crm/v3/objects/contacts",
      companies: "/crm/v3/objects/companies",
      deals: "/crm/v3/objects/deals",
      pipelines: "/crm/v3/pipelines",
    },
  },

  stripe: {
    id: "stripe",
    name: "Stripe",
    icon: "💳",
    category: "Payments",
    authType: "apikey",
    baseUrl: "https://api.stripe.com",
    endpoints: {
      customers: "/v1/customers",
      charges: "/v1/charges",
      invoices: "/v1/invoices",
      subscriptions: "/v1/subscriptions",
    },
  },

  slack: {
    id: "slack",
    name: "Slack",
    icon: "💬",
    category: "Communication",
    authType: "oauth",
    baseUrl: "https://slack.com/api",
    endpoints: {
      messages: "/conversations.list",
      users: "/users.list",
      channels: "/conversations.info",
      files: "/files.list",
    },
    requiredScopes: ["channels:read", "users:read", "files:read"],
  },

  jira: {
    id: "jira",
    name: "Jira",
    icon: "🐛",
    category: "ProjectManagement",
    authType: "basic",
    baseUrl: "https://api.atlassian.com",
    endpoints: {
      issues: "/rest/api/3/search",
      projects: "/rest/api/3/project",
      boards: "/rest/api/3/board",
      sprints: "/rest/api/3/sprint",
    },
  },

  tableau: {
    id: "tableau",
    name: "Tableau",
    icon: "📊",
    category: "BI",
    authType: "basic",
    baseUrl: "https://api.tableau.com",
    endpoints: {
      workbooks: "/api/2.8/sites/~site-id~/workbooks",
      datasources: "/api/2.8/sites/~site-id~/datasources",
      views: "/api/2.8/sites/~site-id~/views",
      users: "/api/2.8/sites/~site-id~/users",
    },
  },

  aws: {
    id: "aws",
    name: "AWS",
    icon: "☁️",
    category: "Cloud",
    authType: "certificate",
    baseUrl: "https://api.aws.amazon.com",
    endpoints: {
      s3: "/s3",
      dynamodb: "/dynamodb",
      lambda: "/lambda",
      rds: "/rds",
    },
  },

  azure: {
    id: "azure",
    name: "Azure",
    icon: "☁️",
    category: "Cloud",
    authType: "oauth",
    baseUrl: "https://management.azure.com",
    endpoints: {
      subscriptions: "/subscriptions",
      resourceGroups: "/resourcegroups",
      storageAccounts: "/storageAccounts",
      databases: "/databases",
    },
    requiredScopes: ["https://management.azure.com/.default"],
  },
};

// ============================================================================
// CLASSE CONNECTOR GATEWAY
// ============================================================================

export class ConnectorGateway {
  private encryptionKey: string;
  private connectors: Map<string, ConnectorStatus> = new Map();
  private credentials: Map<string, ConnectorCredentials> = new Map();

  constructor(encryptionKey: string = process.env.ENCRYPTION_KEY || "default-key") {
    this.encryptionKey = encryptionKey;
    this.initializeConnectors();
  }

  /**
   * Inicializa status de todos os conectores
   */
  private initializeConnectors() {
    Object.keys(CONNECTOR_CONFIGS).forEach((connectorId) => {
      this.connectors.set(connectorId, {
        id: connectorId,
        name: CONNECTOR_CONFIGS[connectorId].name,
        status: "disconnected",
      });
    });
  }

  /**
   * Criptografa credenciais
   */
  private encryptCredentials(data: string): string {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(
      "aes-256-cbc",
      Buffer.from(this.encryptionKey.padEnd(32, "0")),
      iv
    );
    let encrypted = cipher.update(data);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return iv.toString("hex") + ":" + encrypted.toString("hex");
  }

  /**
   * Descriptografa credenciais
   */
  private decryptCredentials(encryptedData: string): string {
    const parts = encryptedData.split(":");
    const iv = Buffer.from(parts[0], "hex");
    const encrypted = Buffer.from(parts[1], "hex");
    const decipher = crypto.createDecipheriv(
      "aes-256-cbc",
      Buffer.from(this.encryptionKey.padEnd(32, "0")),
      iv
    );
    let decrypted = decipher.update(encrypted);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
  }

  /**
   * Conecta um conector
   */
  async connect(
    connectorId: string,
    credentials: Partial<ConnectorCredentials>
  ): Promise<{ success: boolean; message: string }> {
    const config = CONNECTOR_CONFIGS[connectorId];
    if (!config) {
      return { success: false, message: `Conector ${connectorId} não encontrado` };
    }

    try {
      // Validar credenciais
      this.validateCredentials(connectorId, credentials);

      // Criptografar e armazenar
      const encryptedCreds: ConnectorCredentials = {
        id: connectorId,
        connectorType: connectorId,
        ...credentials,
        encryptedAt: new Date(),
      };

      // Criptografar campos sensíveis
      if (credentials.apiKey) {
        encryptedCreds.apiKey = this.encryptCredentials(credentials.apiKey);
      }
      if (credentials.clientSecret) {
        encryptedCreds.clientSecret = this.encryptCredentials(credentials.clientSecret);
      }
      if (credentials.password) {
        encryptedCreds.password = this.encryptCredentials(credentials.password);
      }

      this.credentials.set(connectorId, encryptedCreds);

      // Testar conexão
      const testResult = await this.testConnection(connectorId);
      if (!testResult.success) {
        return { success: false, message: `Falha ao conectar: ${testResult.error}` };
      }

      // Atualizar status
      this.connectors.set(connectorId, {
        id: connectorId,
        name: config.name,
        status: "connected",
        lastSync: new Date(),
      });

      return { success: true, message: `${config.name} conectado com sucesso` };
    } catch (error) {
      return { success: false, message: `Erro ao conectar: ${error}` };
    }
  }

  /**
   * Desconecta um conector
   */
  async disconnect(connectorId: string): Promise<{ success: boolean; message: string }> {
    const config = CONNECTOR_CONFIGS[connectorId];
    if (!config) {
      return { success: false, message: `Conector ${connectorId} não encontrado` };
    }

    try {
      this.credentials.delete(connectorId);
      this.connectors.set(connectorId, {
        id: connectorId,
        name: config.name,
        status: "disconnected",
      });

      return { success: true, message: `${config.name} desconectado` };
    } catch (error) {
      return { success: false, message: `Erro ao desconectar: ${error}` };
    }
  }

  /**
   * Obtém status de um conector
   */
  getStatus(connectorId: string): ConnectorStatus | null {
    return this.connectors.get(connectorId) || null;
  }

  /**
   * Obtém status de todos os conectores
   */
  getAllStatus(): ConnectorStatus[] {
    return Array.from(this.connectors.values());
  }

  /**
   * Sincroniza dados de um conector
   */
  async sync(connectorId: string): Promise<SyncResult> {
    const status = this.getStatus(connectorId);
    if (!status) {
      return {
        connectorId,
        status: "error",
        recordsSynced: 0,
        recordsFailed: 0,
        duration: 0,
        timestamp: new Date(),
        error: "Conector não encontrado",
      };
    }

    if (status.status !== "connected") {
      return {
        connectorId,
        status: "error",
        recordsSynced: 0,
        recordsFailed: 0,
        duration: 0,
        timestamp: new Date(),
        error: "Conector não está conectado",
      };
    }

    const startTime = Date.now();
    try {
      // Atualizar status para "syncing"
      this.connectors.set(connectorId, {
        ...status,
        status: "syncing",
      });

      // Simular sincronização (será implementado com conectores reais)
      const recordsSynced = Math.floor(Math.random() * 1000) + 100;
      const recordsFailed = Math.floor(Math.random() * 10);

      const duration = Date.now() - startTime;

      // Atualizar status para "connected"
      this.connectors.set(connectorId, {
        ...status,
        status: "connected",
        lastSync: new Date(),
        nextSync: new Date(Date.now() + 3600000), // Próxima sincronização em 1 hora
        recordsSync: recordsSynced,
      });

      return {
        connectorId,
        status: "success",
        recordsSynced,
        recordsFailed,
        duration,
        timestamp: new Date(),
      };
    } catch (error) {
      this.connectors.set(connectorId, {
        ...status,
        status: "error",
        error: String(error),
      });

      return {
        connectorId,
        status: "error",
        recordsSynced: 0,
        recordsFailed: 0,
        duration: Date.now() - startTime,
        timestamp: new Date(),
        error: String(error),
      };
    }
  }

  /**
   * Testa conexão com um conector
   */
  private async testConnection(
    connectorId: string
  ): Promise<{ success: boolean; error?: string }> {
    const config = CONNECTOR_CONFIGS[connectorId];
    const creds = this.credentials.get(connectorId);

    if (!config || !creds) {
      return { success: false, error: "Configuração ou credenciais não encontradas" };
    }

    try {
      // Simular teste de conexão (será implementado com conectores reais)
      // Em produção, faria uma chamada real à API
      return { success: true };
    } catch (error) {
      return { success: false, error: String(error) };
    }
  }

  /**
   * Valida credenciais de um conector
   */
  private validateCredentials(
    connectorId: string,
    credentials: Partial<ConnectorCredentials>
  ) {
    const config = CONNECTOR_CONFIGS[connectorId];
    if (!config) {
      throw new Error(`Conector ${connectorId} não encontrado`);
    }

    switch (config.authType) {
      case "oauth":
        if (!credentials.clientId || !credentials.clientSecret) {
          throw new Error("OAuth requer clientId e clientSecret");
        }
        break;
      case "apikey":
        if (!credentials.apiKey) {
          throw new Error("API Key é obrigatória");
        }
        break;
      case "basic":
        if (!credentials.username || !credentials.password) {
          throw new Error("Basic Auth requer username e password");
        }
        break;
      case "certificate":
        if (!credentials.clientId) {
          throw new Error("Certificate Auth requer certificado");
        }
        break;
    }
  }

  /**
   * Obtém configuração de um conector
   */
  getConfig(connectorId: string): ConnectorConfig | null {
    return CONNECTOR_CONFIGS[connectorId] || null;
  }

  /**
   * Obtém todas as configurações de conectores
   */
  getAllConfigs(): ConnectorConfig[] {
    return Object.values(CONNECTOR_CONFIGS);
  }
}

// ============================================================================
// ROUTER EXPRESS
// ============================================================================

export function createConnectorRouter(gateway: ConnectorGateway): Router {
  const router = Router();

  /**
   * POST /api/connectors/connect
   * Conecta um conector
   */
  router.post("/connect", async (req: Request, res: Response) => {
    const { connectorId, credentials } = req.body;

    if (!connectorId || !credentials) {
      return res.status(400).json({ error: "connectorId e credentials são obrigatórios" });
    }

    const result = await gateway.connect(connectorId, credentials);
    res.json(result);
  });

  /**
   * POST /api/connectors/disconnect
   * Desconecta um conector
   */
  router.post("/disconnect", async (req: Request, res: Response) => {
    const { connectorId } = req.body;

    if (!connectorId) {
      return res.status(400).json({ error: "connectorId é obrigatório" });
    }

    const result = await gateway.disconnect(connectorId);
    res.json(result);
  });

  /**
   * GET /api/connectors/status
   * Obtém status de todos os conectores
   */
  router.get("/status", (req: Request, res: Response) => {
    const status = gateway.getAllStatus();
    res.json(status);
  });

  /**
   * GET /api/connectors/status/:id
   * Obtém status de um conector específico
   */
  router.get("/status/:id", (req: Request, res: Response) => {
    const { id } = req.params;
    const status = gateway.getStatus(id);

    if (!status) {
      return res.status(404).json({ error: "Conector não encontrado" });
    }

    res.json(status);
  });

  /**
   * POST /api/connectors/sync
   * Sincroniza dados de um conector
   */
  router.post("/sync", async (req: Request, res: Response) => {
    const { connectorId } = req.body;

    if (!connectorId) {
      return res.status(400).json({ error: "connectorId é obrigatório" });
    }

    const result = await gateway.sync(connectorId);
    res.json(result);
  });

  /**
   * GET /api/connectors/config
   * Obtém configurações de todos os conectores
   */
  router.get("/config", (req: Request, res: Response) => {
    const configs = gateway.getAllConfigs();
    res.json(configs);
  });

  /**
   * GET /api/connectors/config/:id
   * Obtém configuração de um conector específico
   */
  router.get("/config/:id", (req: Request, res: Response) => {
    const { id } = req.params;
    const config = gateway.getConfig(id);

    if (!config) {
      return res.status(404).json({ error: "Conector não encontrado" });
    }

    res.json(config);
  });

  return router;
}

export default ConnectorGateway;

