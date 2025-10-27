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
  email: varchar("email", { length: 320 }).unique(),
  passwordHash: text("passwordHash"), // Hash da senha para login
  telefone: varchar("telefone", { length: 50 }),
  clientesAtivos: int("clientesAtivos"),
  clientesInativos: int("clientesInativos"),
  investimentoMarketing: int("investimentoMarketing"),
  ticketMedio: int("ticketMedio"),
  taxaRecompra: int("taxaRecompra"),
  
  // Campos de assinatura
  plano: varchar("plano", { length: 50 }), // 'starter', 'growth', 'scale'
  stripeCustomerId: varchar("stripeCustomerId", { length: 255 }),
  stripeSubscriptionId: varchar("stripeSubscriptionId", { length: 255 }),
  assinaturaStatus: varchar("assinaturaStatus", { length: 50 }), // 'active', 'canceled', 'past_due', 'trialing'
  assinaturaExpiraEm: timestamp("assinaturaExpiraEm"),
  
  // Campos de recuperação de senha
  resetPasswordToken: varchar("resetPasswordToken", { length: 255 }),
  resetPasswordExpires: timestamp("resetPasswordExpires"),
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Empresa = typeof empresas.$inferSelect;
export type InsertEmpresa = typeof empresas.$inferInsert;

/**
 * Tabela para armazenar os diagnósticos realizados
 */
// Tabela de Pesquisas
export const pesquisas = mysqlTable("pesquisas", {
  id: int("id").primaryKey().autoincrement(),
  empresaId: int("empresa_id").notNull(),
  titulo: varchar("titulo", { length: 255 }).notNull(),
  descricao: text("descricao"),
  tipo: varchar("tipo", { length: 50 }).notNull().default("pesquisa"), // pesquisa, quiz, missao
  status: varchar("status", { length: 50 }).notNull().default("ativa"), // ativa, pausada, encerrada
  perguntas: json("perguntas").notNull(), // Array de objetos com as perguntas
  recompensaTipo: varchar("recompensa_tipo", { length: 50 }), // pontos, desconto, brinde
  recompensaValor: varchar("recompensa_valor", { length: 255 }),
  linkPublico: varchar("link_publico", { length: 255 }).notNull().unique(),
  totalRespostas: int("total_respostas").notNull().default(0),
  criadoEm: timestamp("criado_em").notNull().defaultNow(),
  atualizadoEm: timestamp("atualizado_em").notNull().defaultNow().onUpdateNow(),
});

export type Pesquisa = typeof pesquisas.$inferSelect;
export type InsertPesquisa = typeof pesquisas.$inferInsert;

// Tabela de Respostas de Pesquisas
export const respostasPesquisas = mysqlTable("respostas_pesquisas", {
  id: int("id").primaryKey().autoincrement(),
  pesquisaId: int("pesquisa_id").notNull(),
  nomeRespondente: varchar("nome_respondente", { length: 255 }),
  emailRespondente: varchar("email_respondente", { length: 255 }),
  telefoneRespondente: varchar("telefone_respondente", { length: 50 }),
  respostas: json("respostas").notNull(), // Array de objetos com as respostas
  pontuacao: int("pontuacao"),
  recompensaResgatada: int("recompensa_resgatada").notNull().default(0), // 0 = false, 1 = true
  ipAddress: varchar("ip_address", { length: 50 }),
  userAgent: text("user_agent"),
  criadoEm: timestamp("criado_em").notNull().defaultNow(),
});

export type RespostaPesquisa = typeof respostasPesquisas.$inferSelect;
export type InsertRespostaPesquisa = typeof respostasPesquisas.$inferInsert;

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

/**
 * Tabela para armazenar fontes de dados conectadas
 */
export const fontesDados = mysqlTable("fontes_dados", {
  id: int("id").primaryKey().autoincrement(),
  empresaId: int("empresaId").notNull(),
  nome: varchar("nome", { length: 255 }).notNull(),
  tipo: varchar("tipo", { length: 50 }).notNull(), // 'csv', 'excel', 'api', 'totvs', 'sap', 'salesforce', 'vtex', 'linx'
  status: varchar("status", { length: 50 }).default("conectado"), // 'conectado', 'sincronizando', 'erro', 'desconectado'
  ultimaSincronizacao: timestamp("ultimaSincronizacao"),
  totalRegistros: int("totalRegistros").default(0),
  configuracao: json("configuracao"), // Credenciais API, caminho do arquivo, etc
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow(),
});

export type FonteDados = typeof fontesDados.$inferSelect;
export type InsertFonteDados = typeof fontesDados.$inferInsert;


/**
 * Tabela para armazenar base de conhecimento da empresa
 */
export const baseConhecimento = mysqlTable("base_conhecimento", {
  id: int("id").primaryKey().autoincrement(),
  empresaId: int("empresaId").notNull().unique(), // Uma base por empresa
  urlSite: varchar("urlSite", { length: 500 }),
  missao: text("missao"),
  visao: text("visao"),
  valores: text("valores"),
  produtosServicos: text("produtosServicos"),
  publicoAlvo: text("publicoAlvo"),
  diferenciais: text("diferenciais"),
  historicoSucesso: text("historicoSucesso"),
  documentos: json("documentos"), // Array de URLs de documentos
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow(),
});

export type BaseConhecimento = typeof baseConhecimento.$inferSelect;
export type InsertBaseConhecimento = typeof baseConhecimento.$inferInsert;

/**
 * Tabela para armazenar insights gerados pela IA
 */
export const insightsIA = mysqlTable("insights_ia", {
  id: int("id").primaryKey().autoincrement(),
  empresaId: int("empresaId").notNull(),
  titulo: varchar("titulo", { length: 255 }).notNull(),
  descricao: text("descricao").notNull(),
  categoria: varchar("categoria", { length: 100 }), // 'marketing', 'vendas', 'produto', 'operacional'
  impactoEstimado: varchar("impactoEstimado", { length: 100 }), // 'alto', 'médio', 'baixo'
  acoesSugeridas: json("acoesSugeridas"), // Array de ações
  dadosUtilizados: json("dadosUtilizados"), // Referência aos dados que geraram o insight
  createdAt: timestamp("createdAt").defaultNow(),
});

export type InsightIA = typeof insightsIA.$inferSelect;
export type InsertInsightIA = typeof insightsIA.$inferInsert;

