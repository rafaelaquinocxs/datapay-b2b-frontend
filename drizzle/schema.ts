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




/**
 * Tabela para armazenar ações inteligentes recomendadas pela IA
 */
export const acoesInteligentes = mysqlTable("acoes_inteligentes", {
  id: int("id").primaryKey().autoincrement(),
  empresaId: int("empresaId").notNull(),
  titulo: varchar("titulo", { length: 255 }).notNull(),
  tipo: varchar("tipo", { length: 100 }).notNull(), // 'Parceria', 'Reten\u00e7\u00e3o', 'Upsell', etc
  descricao: text("descricao").notNull(),
  baseadoEm: text("baseadoEm"), // Descri\u00e7\u00e3o do que gerou a recomenda\u00e7\u00e3o
  potencialLucro: text("potencialLucro"), // Ex: "R$ 45k/m\u00eas"
  roi: text("roi"), // Ex: "320%"
  implementacao: text("implementacao"), // Ex: "2 semanas"
  status: mysqlEnum("status", ["recomendada", "em_andamento", "concluida", "descartada"]).default("recomendada"),
  prioridade: mysqlEnum("prioridade", ["Baixa", "M\u00e9dia", "Alta", "Cr\u00edtica"]).default("M\u00e9dia"),
  acoes: json("acoes"), // Array de a\u00e7\u00f5es a executar
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow(),
});

export type AcaoInteligente = typeof acoesInteligentes.$inferSelect;
export type InsertAcaoInteligente = typeof acoesInteligentes.$inferInsert;

/**
 * Tabela para armazenar resultados das ações inteligentes
 */
export const resultadosAcoes = mysqlTable("resultados_acoes", {
  id: int("id").primaryKey().autoincrement(),
  acaoId: int("acaoId").notNull(),
  empresaId: int("empresaId").notNull(),
  periodo: varchar("periodo", { length: 100 }), // Ex: "Últimos 30 dias"
  investimento: varchar("investimento", { length: 100 }), // Ex: "R$ 8k"
  receita: varchar("receita", { length: 100 }), // Ex: "R$ 38k"
  lucro: varchar("lucro", { length: 100 }), // Ex: "R$ 30k"
  roi: varchar("roi", { length: 50 }), // Ex: "375%"
  conversao: varchar("conversao", { length: 50 }), // Ex: "24.3%"
  alcance: varchar("alcance", { length: 100 }), // Ex: "12.4k pessoas"
  status: mysqlEnum("status", ["em_progresso", "concluida"]).default("em_progresso"),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow(),
});

export type ResultadoAcao = typeof resultadosAcoes.$inferSelect;
export type InsertResultadoAcao = typeof resultadosAcoes.$inferInsert;



/**
 * Tabela para armazenar perfil completo da empresa (Sprint 1 Base de Conhecimento)
 */
export const companyProfile = mysqlTable("company_profile", {
  id: int("id").primaryKey().autoincrement(),
  empresaId: int("empresaId").notNull().unique(),
  
  // Bloco 1: Identidade & Mercado
  missao: text("missao"),
  visao: text("visao"),
  valores: text("valores"),
  publicoAlvo: text("publicoAlvo"),
  personas: json("personas"),
  segmentos: json("segmentos"),
  concorrentes: json("concorrentes"),
  
  // Bloco 2: Operação & Dados
  erpsUtilizados: json("erpsUtilizados"),
  fontesConectadas: json("fontesConectadas"),
  qualidadeDados: int("qualidadeDados"),
  frequenciaAtualizacao: varchar("frequenciaAtualizacao", { length: 100 }),
  
  // Bloco 3: Objetivos & KPIs
  metasTrimestrais: json("metasTrimestrais"),
  restricoes: text("restricoes"),
  budget: int("budget"),
  
  // Bloco 4: Regras & Política
  lgpdCompliance: int("lgpdCompliance").default(0),
  janelaComunicacao: varchar("janelaComunicacao", { length: 255 }),
  sensibilidadeDados: varchar("sensibilidadeDados", { length: 50 }),
  
  // Metadados
  status: mysqlEnum("status", ["rascunho", "em_revisao", "publicado"]).default("rascunho"),
  versao: int("versao").default(1),
  setor: varchar("setor", { length: 100 }),
  dataQualityScore: int("dataQualityScore").default(0),
  
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow(),
  publishedAt: timestamp("publishedAt"),
});

export type CompanyProfile = typeof companyProfile.$inferSelect;
export type InsertCompanyProfile = typeof companyProfile.$inferInsert;

/**
 * Tabela para armazenar histórico de versões do perfil
 */
export const companyProfileVersions = mysqlTable("company_profile_versions", {
  id: int("id").primaryKey().autoincrement(),
  empresaId: int("empresaId").notNull(),
  versao: int("versao").notNull(),
  payload: json("payload").notNull(),
  status: varchar("status", { length: 50 }).notNull(),
  publishedBy: int("publishedBy"),
  publishedAt: timestamp("publishedAt"),
  createdAt: timestamp("createdAt").defaultNow(),
});

export type CompanyProfileVersion = typeof companyProfileVersions.$inferSelect;
export type InsertCompanyProfileVersion = typeof companyProfileVersions.$inferInsert;

/**
 * Tabela para auditoria de mudanças no perfil
 */
export const profileAuditLog = mysqlTable("profile_audit_log", {
  id: int("id").primaryKey().autoincrement(),
  empresaId: int("empresaId").notNull(),
  userId: int("userId"),
  fieldPath: varchar("fieldPath", { length: 255 }).notNull(),
  oldValue: text("oldValue"),
  newValue: text("newValue"),
  action: varchar("action", { length: 50 }).notNull(),
  createdAt: timestamp("createdAt").defaultNow(),
});

export type ProfileAuditLog = typeof profileAuditLog.$inferSelect;
export type InsertProfileAuditLog = typeof profileAuditLog.$inferInsert;

/**
 * Tabela para taxonomia de setores (CNAE) e mapeamento para playbooks
 */
export const taxonomySectors = mysqlTable("taxonomy_sectors", {
  id: int("id").primaryKey().autoincrement(),
  cnae: varchar("cnae", { length: 50 }).unique(),
  label: varchar("label", { length: 255 }).notNull(),
  playbooks: json("playbooks"),
  keywords: json("keywords"),
  createdAt: timestamp("createdAt").defaultNow(),
});

export type TaxonomySector = typeof taxonomySectors.$inferSelect;
export type InsertTaxonomySector = typeof taxonomySectors.$inferInsert;




/**
 * Sprint 2: Tabela para RBAC por campo
 */
export const fieldPermissions = mysqlTable("field_permissions", {
  id: int("id").primaryKey().autoincrement(),
  empresaId: int("empresaId").notNull(),
  fieldPath: varchar("fieldPath", { length: 255 }).notNull(),
  role: mysqlEnum("role", ["viewer", "editor", "approver", "admin"]).notNull(),
  canView: int("canView").default(1),
  canEdit: int("canEdit").default(0),
  isSensitive: int("isSensitive").default(0),
  maskingPattern: varchar("maskingPattern", { length: 100 }),
  createdAt: timestamp("createdAt").defaultNow(),
});

export type FieldPermission = typeof fieldPermissions.$inferSelect;
export type InsertFieldPermission = typeof fieldPermissions.$inferInsert;

/**
 * Sprint 2: Tabela para armazenar resumos executivos gerados
 */
export const executiveSummaries = mysqlTable("executive_summaries", {
  id: int("id").primaryKey().autoincrement(),
  empresaId: int("empresaId").notNull(),
  versao: int("versao").notNull(),
  titulo: text("titulo"),
  conteudo: text("conteudo"),
  prioridades: json("prioridades"),
  geradoEm: timestamp("geradoEm").defaultNow(),
  urlPdf: varchar("urlPdf", { length: 500 }),
});

export type ExecutiveSummary = typeof executiveSummaries.$inferSelect;
export type InsertExecutiveSummary = typeof executiveSummaries.$inferInsert;

/**
 * Sprint 3: Tabela para benchmarks por setor
 */
export const benchmarkData = mysqlTable("benchmark_data", {
  id: int("id").primaryKey().autoincrement(),
  setor: varchar("setor", { length: 100 }).notNull(),
  porte: varchar("porte", { length: 50 }).notNull(),
  metricaChave: varchar("metricaChave", { length: 100 }).notNull(),
  mediana: int("mediana"),
  p25: int("p25"),
  p75: int("p75"),
  p90: int("p90"),
  createdAt: timestamp("createdAt").defaultNow(),
});

export type BenchmarkData = typeof benchmarkData.$inferSelect;
export type InsertBenchmarkData = typeof benchmarkData.$inferInsert;

/**
 * Sprint 3: Tabela para armazenar comparações com benchmarks
 */
export const benchmarkComparisons = mysqlTable("benchmark_comparisons", {
  id: int("id").primaryKey().autoincrement(),
  empresaId: int("empresaId").notNull(),
  metricaChave: varchar("metricaChave", { length: 100 }).notNull(),
  valorEmpresa: int("valorEmpresa"),
  mediana: int("mediana"),
  percentil: int("percentil"),
  gap: int("gap"),
  recomendacao: text("recomendacao"),
  criadoEm: timestamp("criadoEm").defaultNow(),
});

export type BenchmarkComparison = typeof benchmarkComparisons.$inferSelect;
export type InsertBenchmarkComparison = typeof benchmarkComparisons.$inferInsert;

/**
 * Sprint 3: Tabela para armazenar conversas com copiloto de dados
 */
export const dataCopiloConversations = mysqlTable("data_copilot_conversations", {
  id: int("id").primaryKey().autoincrement(),
  empresaId: int("empresaId").notNull(),
  pergunta: text("pergunta").notNull(),
  resposta: text("resposta"),
  contexto: json("contexto"),
  modelo: varchar("modelo", { length: 50 }).default("gpt-4"),
  criadoEm: timestamp("criadoEm").defaultNow(),
});

export type DataCopiloConversation = typeof dataCopiloConversations.$inferSelect;
export type InsertDataCopiloConversation = typeof dataCopiloConversations.$inferInsert;

/**
 * Sprint 3: Tabela para webhooks de notificação
 */
export const profileWebhooks = mysqlTable("profile_webhooks", {
  id: int("id").primaryKey().autoincrement(),
  empresaId: int("empresaId").notNull(),
  evento: varchar("evento", { length: 100 }).notNull(),
  targetModule: varchar("targetModule", { length: 100 }).notNull(),
  payload: json("payload"),
  status: mysqlEnum("status", ["pendente", "enviado", "falha"]).default("pendente"),
  tentativas: int("tentativas").default(0),
  proximaTentativa: timestamp("proximaTentativa"),
  criadoEm: timestamp("criadoEm").defaultNow(),
});

export type ProfileWebhook = typeof profileWebhooks.$inferSelect;
export type InsertProfileWebhook = typeof profileWebhooks.$inferInsert;




/**
 * Sprint A-C: Meus Dados - Data Sources Management
 */

export const dataSources = mysqlTable("data_sources", {
  id: int("id").primaryKey().autoincrement(),
  empresaId: int("empresaId").notNull(),
  nome: varchar("nome", { length: 255 }).notNull(),
  conector: varchar("conector", { length: 100 }).notNull(),
  entidade: varchar("entidade", { length: 100 }),
  status: mysqlEnum("status", ["conectado", "sincronizando", "erro", "desconectado"]).default("conectado"),
  ultimaSincronizacao: timestamp("ultimaSincronizacao"),
  proximaSincronizacao: timestamp("proximaSincronizacao"),
  totalRegistros: int("totalRegistros").default(0),
  configuracao: json("configuracao"),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow(),
});

export type DataSource = typeof dataSources.$inferSelect;
export type InsertDataSource = typeof dataSources.$inferInsert;

/**
 * Sprint B: Mapeamento de campos
 */
export const fieldMappings = mysqlTable("field_mappings", {
  id: int("id").primaryKey().autoincrement(),
  dataSourceId: int("dataSourceId").notNull(),
  sourceField: varchar("sourceField", { length: 255 }).notNull(),
  targetField: varchar("targetField", { length: 255 }).notNull(),
  tipo: varchar("tipo", { length: 50 }),
  validadores: json("validadores"),
  transformacao: text("transformacao"),
  createdAt: timestamp("createdAt").defaultNow(),
});

export type FieldMapping = typeof fieldMappings.$inferSelect;
export type InsertFieldMapping = typeof fieldMappings.$inferInsert;

/**
 * Sprint B: Score de qualidade de dados
 */
export const dataQualityScores = mysqlTable("data_quality_scores", {
  id: int("id").primaryKey().autoincrement(),
  dataSourceId: int("dataSourceId").notNull(),
  score: int("score"),
  completude: int("completude"),
  duplicidade: int("duplicidade"),
  atualidade: varchar("atualidade", { length: 50 }),
  consistencia: int("consistencia"),
  criadoEm: timestamp("criadoEm").defaultNow(),
});

export type DataQualityScore = typeof dataQualityScores.$inferSelect;
export type InsertDataQualityScore = typeof dataQualityScores.$inferInsert;

/**
 * Sprint A: Logs de sincronização
 */
export const syncLogs = mysqlTable("sync_logs", {
  id: int("id").primaryKey().autoincrement(),
  dataSourceId: int("dataSourceId").notNull(),
  status: varchar("status", { length: 50 }).notNull(),
  registrosLidos: int("registrosLidos").default(0),
  registrosGravados: int("registrosGravados").default(0),
  erros: int("erros").default(0),
  duracao: int("duracao"),
  mensagem: text("mensagem"),
  errosDetalhados: json("errosDetalhados"),
  criadoEm: timestamp("criadoEm").defaultNow(),
});

export type SyncLog = typeof syncLogs.$inferSelect;
export type InsertSyncLog = typeof syncLogs.$inferInsert;

/**
 * Sprint C: Agendamento de sincronizações
 */
export const syncSchedules = mysqlTable("sync_schedules", {
  id: int("id").primaryKey().autoincrement(),
  dataSourceId: int("dataSourceId").notNull(),
  tipo: varchar("tipo", { length: 50 }).notNull(),
  expressao: varchar("expressao", { length: 255 }),
  janelaInicio: varchar("janelaInicio", { length: 50 }),
  janelaFim: varchar("janelaFim", { length: 50 }),
  ativo: int("ativo").default(1),
  createdAt: timestamp("createdAt").defaultNow(),
});

export type SyncSchedule = typeof syncSchedules.$inferSelect;
export type InsertSyncSchedule = typeof syncSchedules.$inferInsert;

/**
 * Sprint C: Webhooks para sincronização em tempo real
 */
export const dataSourceWebhooks = mysqlTable("data_source_webhooks", {
  id: int("id").primaryKey().autoincrement(),
  dataSourceId: int("dataSourceId").notNull(),
  url: varchar("url", { length: 500 }).notNull(),
  secret: varchar("secret", { length: 255 }).notNull(),
  eventos: json("eventos"),
  ativo: int("ativo").default(1),
  createdAt: timestamp("createdAt").defaultNow(),
});

export type DataSourceWebhook = typeof dataSourceWebhooks.$inferSelect;
export type InsertDataSourceWebhook = typeof dataSourceWebhooks.$inferInsert;

/**
 * Sprint C: Auditoria de mudanças em data sources
 */
export const dataSourceAuditLog = mysqlTable("data_source_audit_log", {
  id: int("id").primaryKey().autoincrement(),
  dataSourceId: int("dataSourceId").notNull(),
  userId: int("userId"),
  acao: varchar("acao", { length: 100 }).notNull(),
  mudancas: json("mudancas"),
  criadoEm: timestamp("criadoEm").defaultNow(),
});

export type DataSourceAuditLog = typeof dataSourceAuditLog.$inferSelect;
export type InsertDataSourceAuditLog = typeof dataSourceAuditLog.$inferInsert;

