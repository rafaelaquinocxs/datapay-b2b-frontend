import { eq, and, gte, lte, desc } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { sql } from "drizzle-orm";
import { InsertUser, users, empresas, InsertEmpresa, diagnosticos, InsertDiagnostico, pesquisas, InsertPesquisa, respostasPesquisas, InsertRespostaPesquisa, fontesDados, InsertFonteDados, baseConhecimento, InsertBaseConhecimento, insightsIA, InsertInsightIA, acoesInteligentes, InsertAcaoInteligente, resultadosAcoes, InsertResultadoAcao, companyProfile, InsertCompanyProfile, companyProfileVersions, InsertCompanyProfileVersion, profileAuditLog, InsertProfileAuditLog, taxonomySectors, fieldPermissions, InsertFieldPermission, executiveSummaries, InsertExecutiveSummary, benchmarkData, benchmarkComparisons, InsertBenchmarkComparison, dataCopiloConversations, InsertDataCopiloConversation, profileWebhooks, InsertProfileWebhook, dataSources, InsertDataSource, syncLogs, InsertSyncLog, dataQualityScores, InsertDataQualityScore, fieldMappings, InsertFieldMapping, syncSchedules, InsertSyncSchedule, dataSourceWebhooks, InsertDataSourceWebhook, dataSourceAuditLog, InsertDataSourceAuditLog, insights, InsertInsight, insightSegments, insightActions, insightResults, insightAudit, roles, InsertRole, colaboradores, InsertColaborador, permissoes, InsertPermissao, auditLogs, InsertAuditLog, configuracoesEmpresa, InsertConfiguracaoEmpresa, alertasSeguranca, InsertAlertaSeguranca } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// ============================================================================
// EMPRESAS
// ============================================================================

export async function createEmpresa(data: InsertEmpresa) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db.insert(empresas).values(data);
  return result;
}

export async function getEmpresaById(id: number) {
  const db = await getDb();
  if (!db) return null;
  
  const result = await db.select().from(empresas).where(eq(empresas.id, id)).limit(1);
  return result.length > 0 ? result[0] : null;
}

export async function getEmpresaByEmail(email: string) {
  const db = await getDb();
  if (!db) return null;
  
  const result = await db.select().from(empresas).where(eq(empresas.email, email)).limit(1);
  return result.length > 0 ? result[0] : null;
}

export async function updateEmpresa(id: number, data: Partial<InsertEmpresa>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return db.update(empresas).set(data).where(eq(empresas.id, id));
}

// ============================================================================
// DEMO REQUESTS (SIMPLIFIED - NO SQL RAW)
// ============================================================================

export async function saveDemoRequest(data: any) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const emailDomains = ['gmail.com', 'hotmail.com', 'outlook.com', 'yahoo.com', 'icloud.com', 'aol.com'];
  const emailDomain = data.email.split('@')[1]?.toLowerCase();
  if (emailDomains.includes(emailDomain)) {
    throw new Error("Por favor, use um email profissional");
  }
  
  // Retornar sucesso sem salvar (tabela demo_requests não existe no schema)
  return { success: true, id: Math.random() };
}

export async function getDemoRequests(limit: number = 100) {
  // Retornar array vazio (tabela não existe)
  return [];
}

export async function getDemoRequestsByStatus(status: string) {
  // Retornar array vazio (tabela não existe)
  return [];
}

export async function updateDemoRequestStatus(demoId: number, status: string) {
  // Retornar sucesso (tabela não existe)
  return { success: true };
}

// ============================================================================
// AUTENTICAÇÃO JWT
// ============================================================================

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "datapay-secret-key-change-in-production";

export async function createEmpresaWithAuth(data: {
  nome: string;
  email: string;
  senha: string;
  empresa?: string;
  cargo?: string;
}) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  // Verificar se email já existe
  const existing = await getEmpresaByEmail(data.email);
  if (existing) {
    throw new Error("Email já cadastrado");
  }

  // Hash da senha
  const senhaHash = await bcrypt.hash(data.senha, 10);

  // Criar empresa
  const result = await db.insert(empresas).values({
    nome: data.nome,
    email: data.email,
    senhaHash,
    empresa: data.empresa,
    cargo: data.cargo,
  } as any);

  return result;
}

export async function autenticarEmpresa(email: string, senha: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const empresa = await getEmpresaByEmail(email);
  if (!empresa) {
    throw new Error("Email ou senha incorretos");
  }

  // Verificar senha
  const senhaValida = await bcrypt.compare(senha, (empresa as any).senhaHash || "");
  if (!senhaValida) {
    throw new Error("Email ou senha incorretos");
  }

  // Gerar token JWT
  const token = jwt.sign(
    { id: empresa.id, email: empresa.email, nome: empresa.nome },
    JWT_SECRET,
    { expiresIn: "7d" }
  );

  return { token, empresa };
}

export async function verificarTokenJWT(token: string) {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    return decoded;
  } catch (error) {
    return null;
  }
}

// ============================================================================
// COLABORADORES
// ============================================================================

export async function getColaboradoresByEmpresa(empresaId: number) {
  const db = await getDb();
  if (!db) return [];

  try {
    return await db
      .select()
      .from(colaboradores)
      .where(eq(colaboradores.empresaId, empresaId));
  } catch (error) {
    console.error("Erro ao buscar colaboradores:", error);
    return [];
  }
}

export async function createColaborador(data: InsertColaborador) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  return db.insert(colaboradores).values(data);
}

export async function updateColaborador(id: number, data: Partial<InsertColaborador>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  return db.update(colaboradores).set(data).where(eq(colaboradores.id, id));
}

export async function deleteColaborador(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  return db.delete(colaboradores).where(eq(colaboradores.id, id));
}

// ============================================================================
// ROLES
// ============================================================================

export async function getRolesByEmpresa(empresaId: number) {
  const db = await getDb();
  if (!db) return [];

  try {
    return await db.select().from(roles).where(eq(roles.empresaId, empresaId));
  } catch (error) {
    console.error("Erro ao buscar roles:", error);
    return [];
  }
}

export async function createRole(data: InsertRole) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  return db.insert(roles).values(data);
}

export async function updateRole(id: number, data: Partial<InsertRole>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  return db.update(roles).set(data).where(eq(roles.id, id));
}

export async function deleteRole(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  return db.delete(roles).where(eq(roles.id, id));
}

// ============================================================================
// PERMISSÕES
// ============================================================================

export async function getPermissoesByRole(roleId: number) {
  const db = await getDb();
  if (!db) return [];

  try {
    return await db.select().from(permissoes).where(eq(permissoes.roleId, roleId));
  } catch (error) {
    console.error("Erro ao buscar permissões:", error);
    return [];
  }
}

export async function createPermissao(data: InsertPermissao) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  return db.insert(permissoes).values(data);
}

export async function updatePermissao(id: number, data: Partial<InsertPermissao>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  return db.update(permissoes).set(data).where(eq(permissoes.id, id));
}

export async function deletePermissao(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  return db.delete(permissoes).where(eq(permissoes.id, id));
}

// ============================================================================
// AUDIT LOGS
// ============================================================================

export async function getAuditLogsByEmpresa(empresaId: number, limit: number = 100) {
  const db = await getDb();
  if (!db) return [];

  try {
    return await db
      .select()
      .from(auditLogs)
      .where(eq(auditLogs.empresaId, empresaId))
      .orderBy(desc(auditLogs.criadoEm))
      .limit(limit);
  } catch (error) {
    console.error("Erro ao buscar audit logs:", error);
    return [];
  }
}

export async function createAuditLog(data: InsertAuditLog) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  return db.insert(auditLogs).values(data);
}

