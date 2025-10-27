import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, empresas, InsertEmpresa, diagnosticos, InsertDiagnostico, pesquisas, InsertPesquisa, respostasPesquisas, InsertRespostaPesquisa, fontesDados, InsertFonteDados, baseConhecimento, InsertBaseConhecimento, insightsIA, InsertInsightIA } from "../drizzle/schema";
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

// Helpers para Empresas
export async function createEmpresa(empresa: InsertEmpresa) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  const result = await db.insert(empresas).values(empresa);
  const insertId = Number(result[0].insertId);
  
  // Buscar a empresa recém-criada para retornar o objeto completo
  const novaEmpresa = await getEmpresaById(insertId);
  if (!novaEmpresa) {
    throw new Error("Erro ao criar empresa");
  }
  
  return novaEmpresa;
}

export async function getEmpresaByEmail(email: string) {
  const db = await getDb();
  if (!db) {
    return undefined;
  }

  const result = await db.select().from(empresas).where(eq(empresas.email, email)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getEmpresaById(id: number) {
  const db = await getDb();
  if (!db) {
    return undefined;
  }

  const result = await db.select().from(empresas).where(eq(empresas.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function updateEmpresa(id: number, data: Partial<InsertEmpresa>) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  await db.update(empresas).set(data).where(eq(empresas.id, id));
}

export async function getAllEmpresas() {
  const db = await getDb();
  if (!db) {
    return [];
  }

  return await db.select().from(empresas);
}

// Helpers para Diagnósticos
export async function createDiagnostico(diagnostico: InsertDiagnostico) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  const result = await db.insert(diagnosticos).values(diagnostico);
  return result[0].insertId;
}

export async function getDiagnosticoById(id: number) {
  const db = await getDb();
  if (!db) {
    return undefined;
  }

  const result = await db.select().from(diagnosticos).where(eq(diagnosticos.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getDiagnosticosByEmpresaId(empresaId: number) {
  const db = await getDb();
  if (!db) {
    return [];
  }

  return await db.select().from(diagnosticos).where(eq(diagnosticos.empresaId, empresaId));
}

export async function getAllDiagnosticos() {
  const db = await getDb();
  if (!db) {
    return [];
  }

  return await db.select().from(diagnosticos);
}

// Helpers para Pesquisas
export async function createPesquisa(pesquisa: InsertPesquisa) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  const result = await db.insert(pesquisas).values(pesquisa);
  const insertId = Number(result[0].insertId);
  
  const novaPesquisa = await getPesquisaById(insertId);
  if (!novaPesquisa) {
    throw new Error("Erro ao criar pesquisa");
  }
  
  return novaPesquisa;
}

export async function getPesquisaById(id: number) {
  const db = await getDb();
  if (!db) {
    return undefined;
  }

  const result = await db.select().from(pesquisas).where(eq(pesquisas.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getPesquisaByLink(linkPublico: string) {
  const db = await getDb();
  if (!db) {
    return undefined;
  }

  const result = await db.select().from(pesquisas).where(eq(pesquisas.linkPublico, linkPublico)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getPesquisasByEmpresaId(empresaId: number) {
  const db = await getDb();
  if (!db) {
    return [];
  }

  return await db.select().from(pesquisas).where(eq(pesquisas.empresaId, empresaId));
}

export async function updatePesquisa(id: number, data: Partial<InsertPesquisa>) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  await db.update(pesquisas).set(data).where(eq(pesquisas.id, id));
}

// Helpers para Respostas de Pesquisas
export async function createRespostaPesquisa(resposta: InsertRespostaPesquisa) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  const result = await db.insert(respostasPesquisas).values(resposta);
  return Number(result[0].insertId);
}

export async function getRespostasByPesquisaId(pesquisaId: number) {
  const db = await getDb();
  if (!db) {
    return [];
  }

  return await db.select().from(respostasPesquisas).where(eq(respostasPesquisas.pesquisaId, pesquisaId));
}



// Helpers para Fontes de Dados
export async function createFonteDados(fonte: InsertFonteDados) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  const result = await db.insert(fontesDados).values(fonte);
  return Number(result[0].insertId);
}

export async function getFontesDadosByEmpresa(empresaId: number) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  return await db.select().from(fontesDados).where(eq(fontesDados.empresaId, empresaId));
}

export async function getFonteDadosById(id: number) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  const result = await db.select().from(fontesDados).where(eq(fontesDados.id, id));
  return result.length > 0 ? result[0] : undefined;
}

export async function updateFonteDados(id: number, data: Partial<InsertFonteDados>) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  await db.update(fontesDados).set(data).where(eq(fontesDados.id, id));
}

export async function deleteFonteDados(id: number) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  await db.delete(fontesDados).where(eq(fontesDados.id, id));
}




// Helpers para Base de Conhecimento
export async function getBaseConhecimentoByEmpresa(empresaId: number) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  const result = await db.select().from(baseConhecimento).where(eq(baseConhecimento.empresaId, empresaId));
  return result.length > 0 ? result[0] : null;
}

export async function createOrUpdateBaseConhecimento(empresaId: number, data: Partial<InsertBaseConhecimento>) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  const existing = await getBaseConhecimentoByEmpresa(empresaId);

  if (existing) {
    await db.update(baseConhecimento).set(data).where(eq(baseConhecimento.empresaId, empresaId));
    return existing.id;
  } else {
    const result = await db.insert(baseConhecimento).values({ ...data, empresaId });
    return Number(result[0].insertId);
  }
}

// Helpers para Insights IA
export async function createInsightIA(insight: InsertInsightIA) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  const result = await db.insert(insightsIA).values(insight);
  return Number(result[0].insertId);
}

export async function getInsightsByEmpresa(empresaId: number) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  return await db.select().from(insightsIA).where(eq(insightsIA.empresaId, empresaId));
}

