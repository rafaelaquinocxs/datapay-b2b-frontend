import { int, json, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Tabela para armazenar empresas que fizeram o diagnóstico
 */
export const empresas = mysqlTable("empresas", {
  id: int("id").autoincrement().primaryKey(),
  nome: varchar("nome", { length: 255 }),
  email: varchar("email", { length: 320 }),
  telefone: varchar("telefone", { length: 50 }),
  clientesAtivos: int("clientesAtivos"),
  clientesInativos: int("clientesInativos"),
  investimentoMarketing: int("investimentoMarketing"),
  ticketMedio: int("ticketMedio"),
  taxaRecompra: int("taxaRecompra"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Empresa = typeof empresas.$inferSelect;
export type InsertEmpresa = typeof empresas.$inferInsert;

/**
 * Tabela para armazenar os diagnósticos realizados
 */
export const diagnosticos = mysqlTable("diagnosticos", {
  id: int("id").autoincrement().primaryKey(),
  empresaId: int("empresaId").notNull(),
  respostas: json("respostas").notNull(), // JSON com as respostas do questionário
  scoreGeral: int("scoreGeral").notNull(),
  scoreGovernanca: int("scoreGovernanca").notNull(),
  scoreIntegracao: int("scoreIntegracao").notNull(),
  scoreAnalitica: int("scoreAnalitica").notNull(),
  scoreDecisao: int("scoreDecisao").notNull(),
  scoreRoi: int("scoreRoi").notNull(),
  desperdicioMensal: int("desperdicioMensal"),
  potencialMensal: int("potencialMensal"),
  impactoAnual: int("impactoAnual"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Diagnostico = typeof diagnosticos.$inferSelect;
export type InsertDiagnostico = typeof diagnosticos.$inferInsert;