import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, empresas, InsertEmpresa, diagnosticos, InsertDiagnostico } from "../drizzle/schema";
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
  return result[0].insertId;
}

export async function getEmpresaById(id: number) {
  const db = await getDb();
  if (!db) {
    return undefined;
  }

  const result = await db.select().from(empresas).where(eq(empresas.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
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
