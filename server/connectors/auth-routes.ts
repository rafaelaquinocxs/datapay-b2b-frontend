import { Router, Request, Response } from "express";
import crypto from "crypto";
import { db } from "../db";
import { connectorCredentials, connectorStatus } from "../db/schema";
import { eq, and } from "drizzle-orm";

const router = Router();

// Chave de criptografia (usar variável de ambiente em produção)
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || "your-secret-key-32-chars-long!!";

/**
 * Criptografa credenciais usando AES-256
 */
function encryptCredentials(credentials: any): string {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(
    "aes-256-cbc",
    Buffer.from(ENCRYPTION_KEY.padEnd(32, "0").substring(0, 32)),
    iv
  );
  let encrypted = cipher.update(JSON.stringify(credentials), "utf8", "hex");
  encrypted += cipher.final("hex");
  return iv.toString("hex") + ":" + encrypted;
}

/**
 * Descriptografa credenciais
 */
function decryptCredentials(encryptedData: string): any {
  const [iv, encrypted] = encryptedData.split(":");
  const decipher = crypto.createDecipheriv(
    "aes-256-cbc",
    Buffer.from(ENCRYPTION_KEY.padEnd(32, "0").substring(0, 32)),
    Buffer.from(iv, "hex")
  );
  let decrypted = decipher.update(encrypted, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return JSON.parse(decrypted);
}

/**
 * POST /api/connectors/connect
 * Conectar um conector com credenciais
 */
router.post("/connect", async (req: Request, res: Response) => {
  try {
    const { connectorId, connectorName, credentials, userId } = req.body;

    if (!connectorId || !credentials || !userId) {
      return res.status(400).json({ error: "Parâmetros obrigatórios faltando" });
    }

    // Criptografar credenciais
    const encryptedCredentials = encryptCredentials(credentials);

    // Salvar credenciais no banco
    const existingCred = await db
      .select()
      .from(connectorCredentials)
      .where(
        and(
          eq(connectorCredentials.connectorId, connectorId),
          eq(connectorCredentials.userId, userId)
        )
      );

    if (existingCred.length > 0) {
      // Atualizar credenciais existentes
      await db
        .update(connectorCredentials)
        .set({
          credentials: encryptedCredentials,
          updatedAt: new Date(),
        })
        .where(
          and(
            eq(connectorCredentials.connectorId, connectorId),
            eq(connectorCredentials.userId, userId)
          )
        );
    } else {
      // Inserir novas credenciais
      await db.insert(connectorCredentials).values({
        connectorId,
        connectorName,
        userId,
        credentials: encryptedCredentials,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    // Atualizar status do conector
    await db
      .update(connectorStatus)
      .set({
        isConnected: true,
        lastConnectionAt: new Date(),
        connectionStatus: "connected",
      })
      .where(
        and(
          eq(connectorStatus.connectorId, connectorId),
          eq(connectorStatus.userId, userId)
        )
      )
      .catch(() => {
        // Se não existe, criar novo registro
        return db.insert(connectorStatus).values({
          connectorId,
          connectorName,
          userId,
          isConnected: true,
          lastConnectionAt: new Date(),
          connectionStatus: "connected",
          totalSyncs: 0,
          successfulSyncs: 0,
          failedSyncs: 0,
        });
      });

    res.json({
      success: true,
      message: `${connectorName} conectado com sucesso!`,
      connectorId,
    });
  } catch (error) {
    console.error("Erro ao conectar:", error);
    res.status(500).json({ error: "Erro ao conectar conector" });
  }
});

/**
 * POST /api/connectors/disconnect
 * Desconectar um conector
 */
router.post("/disconnect", async (req: Request, res: Response) => {
  try {
    const { connectorId, userId } = req.body;

    if (!connectorId || !userId) {
      return res.status(400).json({ error: "Parâmetros obrigatórios faltando" });
    }

    // Deletar credenciais
    await db
      .delete(connectorCredentials)
      .where(
        and(
          eq(connectorCredentials.connectorId, connectorId),
          eq(connectorCredentials.userId, userId)
        )
      );

    // Atualizar status
    await db
      .update(connectorStatus)
      .set({
        isConnected: false,
        connectionStatus: "disconnected",
      })
      .where(
        and(
          eq(connectorStatus.connectorId, connectorId),
          eq(connectorStatus.userId, userId)
        )
      );

    res.json({
      success: true,
      message: "Conector desconectado com sucesso!",
      connectorId,
    });
  } catch (error) {
    console.error("Erro ao desconectar:", error);
    res.status(500).json({ error: "Erro ao desconectar conector" });
  }
});

/**
 * POST /api/connectors/test-connection
 * Testar conexão com um conector
 */
router.post("/test-connection", async (req: Request, res: Response) => {
  try {
    const { connectorId, credentials } = req.body;

    if (!connectorId || !credentials) {
      return res.status(400).json({ error: "Parâmetros obrigatórios faltando" });
    }

    // Simular teste de conexão (em produção, fazer chamada real à API)
    let isValid = false;
    let message = "";

    switch (connectorId) {
      case "salesforce":
        isValid = credentials.instanceUrl && credentials.clientId && credentials.clientSecret;
        message = isValid ? "Conexão com Salesforce válida" : "Credenciais inválidas";
        break;
      case "google-analytics":
        isValid = credentials.clientId && credentials.clientSecret && credentials.refreshToken;
        message = isValid ? "Conexão com Google Analytics válida" : "Credenciais inválidas";
        break;
      case "stripe":
        isValid = credentials.apiKey && credentials.apiKey.startsWith("sk_");
        message = isValid ? "Conexão com Stripe válida" : "Chave de API inválida";
        break;
      case "postgresql":
      case "mysql":
        isValid = credentials.host && credentials.port && credentials.database && credentials.username;
        message = isValid ? `Conexão com ${connectorId} válida` : "Credenciais de banco inválidas";
        break;
      default:
        isValid = Object.keys(credentials).length > 0;
        message = isValid ? "Credenciais fornecidas" : "Nenhuma credencial fornecida";
    }

    res.json({
      success: true,
      isValid,
      message,
      connectorId,
    });
  } catch (error) {
    console.error("Erro ao testar conexão:", error);
    res.status(500).json({ error: "Erro ao testar conexão" });
  }
});

/**
 * GET /api/connectors/status/:userId
 * Obter status de todos os conectores do usuário
 */
router.get("/status/:userId", async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const statuses = await db
      .select()
      .from(connectorStatus)
      .where(eq(connectorStatus.userId, userId));

    res.json({
      success: true,
      statuses,
      total: statuses.length,
      connected: statuses.filter((s) => s.isConnected).length,
    });
  } catch (error) {
    console.error("Erro ao obter status:", error);
    res.status(500).json({ error: "Erro ao obter status dos conectores" });
  }
});

/**
 * GET /api/connectors/credentials/:connectorId/:userId
 * Obter credenciais descriptografadas de um conector
 */
router.get("/credentials/:connectorId/:userId", async (req: Request, res: Response) => {
  try {
    const { connectorId, userId } = req.params;

    const cred = await db
      .select()
      .from(connectorCredentials)
      .where(
        and(
          eq(connectorCredentials.connectorId, connectorId),
          eq(connectorCredentials.userId, userId)
        )
      );

    if (!cred.length) {
      return res.status(404).json({ error: "Credenciais não encontradas" });
    }

    const decrypted = decryptCredentials(cred[0].credentials);

    res.json({
      success: true,
      credentials: decrypted,
      connectorId,
    });
  } catch (error) {
    console.error("Erro ao obter credenciais:", error);
    res.status(500).json({ error: "Erro ao obter credenciais" });
  }
});

export default router;

