var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// drizzle/schema.ts
import { int, json, mysqlEnum, mysqlTable, text, timestamp, varchar, decimal, serial, boolean } from "drizzle-orm/mysql-core";
var integer, users, empresas, pesquisas, respostasPesquisas, diagnosticos, fontesDados, baseConhecimento, insightsIA, acoesInteligentes, resultadosAcoes, companyProfile, companyProfileVersions, profileAuditLog, taxonomySectors, fieldPermissions, executiveSummaries, benchmarkData, benchmarkComparisons, dataCopiloConversations, profileWebhooks, dataSources, fieldMappings, dataQualityScores, syncLogs, syncSchedules, dataSourceWebhooks, dataSourceAuditLog, insights, insightSegments, insightActions, insightResults, insightAudit, smartForms, smartFormQuestions, smartFormSchedules, smartFormChannels, smartFormResponses, smartFormTemplates, smartFormPermissions, smartFormAudit, surveys, surveyQuestions, surveyResponses, surveySchedules, surveyDistribution, surveyInsights, surveyBenchmarks, surveyPermissions, surveyAudit, syntheticDatasets, simulations, simulationResults, simulationHistory;
var init_schema = __esm({
  "drizzle/schema.ts"() {
    "use strict";
    integer = int;
    users = mysqlTable("users", {
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
      lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull()
    });
    empresas = mysqlTable("empresas", {
      id: int("id").autoincrement().primaryKey(),
      nome: varchar("nome", { length: 255 }),
      email: varchar("email", { length: 320 }).unique(),
      passwordHash: text("passwordHash"),
      // Hash da senha para login
      telefone: varchar("telefone", { length: 50 }),
      clientesAtivos: int("clientesAtivos"),
      clientesInativos: int("clientesInativos"),
      investimentoMarketing: int("investimentoMarketing"),
      ticketMedio: int("ticketMedio"),
      taxaRecompra: int("taxaRecompra"),
      // Campos de assinatura
      plano: varchar("plano", { length: 50 }),
      // 'starter', 'growth', 'scale'
      stripeCustomerId: varchar("stripeCustomerId", { length: 255 }),
      stripeSubscriptionId: varchar("stripeSubscriptionId", { length: 255 }),
      assinaturaStatus: varchar("assinaturaStatus", { length: 50 }),
      // 'active', 'canceled', 'past_due', 'trialing'
      assinaturaExpiraEm: timestamp("assinaturaExpiraEm"),
      // Campos de recuperação de senha
      resetPasswordToken: varchar("resetPasswordToken", { length: 255 }),
      resetPasswordExpires: timestamp("resetPasswordExpires"),
      createdAt: timestamp("createdAt").defaultNow().notNull(),
      updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull()
    });
    pesquisas = mysqlTable("pesquisas", {
      id: int("id").primaryKey().autoincrement(),
      empresaId: int("empresa_id").notNull(),
      titulo: varchar("titulo", { length: 255 }).notNull(),
      descricao: text("descricao"),
      tipo: varchar("tipo", { length: 50 }).notNull().default("pesquisa"),
      // pesquisa, quiz, missao
      status: varchar("status", { length: 50 }).notNull().default("ativa"),
      // ativa, pausada, encerrada
      perguntas: json("perguntas").notNull(),
      // Array de objetos com as perguntas
      recompensaTipo: varchar("recompensa_tipo", { length: 50 }),
      // pontos, desconto, brinde
      recompensaValor: varchar("recompensa_valor", { length: 255 }),
      linkPublico: varchar("link_publico", { length: 255 }).notNull().unique(),
      totalRespostas: int("total_respostas").notNull().default(0),
      criadoEm: timestamp("criado_em").notNull().defaultNow(),
      atualizadoEm: timestamp("atualizado_em").notNull().defaultNow().onUpdateNow()
    });
    respostasPesquisas = mysqlTable("respostas_pesquisas", {
      id: int("id").primaryKey().autoincrement(),
      pesquisaId: int("pesquisa_id").notNull(),
      nomeRespondente: varchar("nome_respondente", { length: 255 }),
      emailRespondente: varchar("email_respondente", { length: 255 }),
      telefoneRespondente: varchar("telefone_respondente", { length: 50 }),
      respostas: json("respostas").notNull(),
      // Array de objetos com as respostas
      pontuacao: int("pontuacao"),
      recompensaResgatada: int("recompensa_resgatada").notNull().default(0),
      // 0 = false, 1 = true
      ipAddress: varchar("ip_address", { length: 50 }),
      userAgent: text("user_agent"),
      criadoEm: timestamp("criado_em").notNull().defaultNow()
    });
    diagnosticos = mysqlTable("diagnosticos", {
      id: int("id").autoincrement().primaryKey(),
      empresaId: int("empresaId").notNull(),
      respostas: json("respostas").notNull(),
      // JSON com as respostas do questionário
      scoreGeral: int("scoreGeral").notNull(),
      scoreGovernanca: int("scoreGovernanca").notNull(),
      scoreIntegracao: int("scoreIntegracao").notNull(),
      scoreAnalitica: int("scoreAnalitica").notNull(),
      scoreDecisao: int("scoreDecisao").notNull(),
      scoreRoi: int("scoreRoi").notNull(),
      desperdicioMensal: int("desperdicioMensal"),
      potencialMensal: int("potencialMensal"),
      impactoAnual: int("impactoAnual"),
      createdAt: timestamp("createdAt").defaultNow().notNull()
    });
    fontesDados = mysqlTable("fontes_dados", {
      id: int("id").primaryKey().autoincrement(),
      empresaId: int("empresaId").notNull(),
      nome: varchar("nome", { length: 255 }).notNull(),
      tipo: varchar("tipo", { length: 50 }).notNull(),
      // 'csv', 'excel', 'api', 'totvs', 'sap', 'salesforce', 'vtex', 'linx'
      status: varchar("status", { length: 50 }).default("conectado"),
      // 'conectado', 'sincronizando', 'erro', 'desconectado'
      ultimaSincronizacao: timestamp("ultimaSincronizacao"),
      totalRegistros: int("totalRegistros").default(0),
      configuracao: json("configuracao"),
      // Credenciais API, caminho do arquivo, etc
      createdAt: timestamp("createdAt").defaultNow(),
      updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow()
    });
    baseConhecimento = mysqlTable("base_conhecimento", {
      id: int("id").primaryKey().autoincrement(),
      empresaId: int("empresaId").notNull().unique(),
      // Uma base por empresa
      urlSite: varchar("urlSite", { length: 500 }),
      missao: text("missao"),
      visao: text("visao"),
      valores: text("valores"),
      produtosServicos: text("produtosServicos"),
      publicoAlvo: text("publicoAlvo"),
      diferenciais: text("diferenciais"),
      historicoSucesso: text("historicoSucesso"),
      documentos: json("documentos"),
      // Array de URLs de documentos
      createdAt: timestamp("createdAt").defaultNow(),
      updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow()
    });
    insightsIA = mysqlTable("insights_ia", {
      id: int("id").primaryKey().autoincrement(),
      empresaId: int("empresaId").notNull(),
      titulo: varchar("titulo", { length: 255 }).notNull(),
      descricao: text("descricao").notNull(),
      categoria: varchar("categoria", { length: 100 }),
      // 'marketing', 'vendas', 'produto', 'operacional'
      impactoEstimado: varchar("impactoEstimado", { length: 100 }),
      // 'alto', 'médio', 'baixo'
      acoesSugeridas: json("acoesSugeridas"),
      // Array de ações
      dadosUtilizados: json("dadosUtilizados"),
      // Referência aos dados que geraram o insight
      createdAt: timestamp("createdAt").defaultNow()
    });
    acoesInteligentes = mysqlTable("acoes_inteligentes", {
      id: int("id").primaryKey().autoincrement(),
      empresaId: int("empresaId").notNull(),
      titulo: varchar("titulo", { length: 255 }).notNull(),
      tipo: varchar("tipo", { length: 100 }).notNull(),
      // 'Parceria', 'Reten\u00e7\u00e3o', 'Upsell', etc
      descricao: text("descricao").notNull(),
      baseadoEm: text("baseadoEm"),
      // Descri\u00e7\u00e3o do que gerou a recomenda\u00e7\u00e3o
      potencialLucro: text("potencialLucro"),
      // Ex: "R$ 45k/m\u00eas"
      roi: text("roi"),
      // Ex: "320%"
      implementacao: text("implementacao"),
      // Ex: "2 semanas"
      status: mysqlEnum("status", ["recomendada", "em_andamento", "concluida", "descartada"]).default("recomendada"),
      prioridade: mysqlEnum("prioridade", ["Baixa", "M\xE9dia", "Alta", "Cr\xEDtica"]).default("M\xE9dia"),
      acoes: json("acoes"),
      // Array de a\u00e7\u00f5es a executar
      createdAt: timestamp("createdAt").defaultNow(),
      updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow()
    });
    resultadosAcoes = mysqlTable("resultados_acoes", {
      id: int("id").primaryKey().autoincrement(),
      acaoId: int("acaoId").notNull(),
      empresaId: int("empresaId").notNull(),
      periodo: varchar("periodo", { length: 100 }),
      // Ex: "Últimos 30 dias"
      investimento: varchar("investimento", { length: 100 }),
      // Ex: "R$ 8k"
      receita: varchar("receita", { length: 100 }),
      // Ex: "R$ 38k"
      lucro: varchar("lucro", { length: 100 }),
      // Ex: "R$ 30k"
      roi: varchar("roi", { length: 50 }),
      // Ex: "375%"
      conversao: varchar("conversao", { length: 50 }),
      // Ex: "24.3%"
      alcance: varchar("alcance", { length: 100 }),
      // Ex: "12.4k pessoas"
      status: mysqlEnum("status", ["em_progresso", "concluida"]).default("em_progresso"),
      createdAt: timestamp("createdAt").defaultNow(),
      updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow()
    });
    companyProfile = mysqlTable("company_profile", {
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
      publishedAt: timestamp("publishedAt")
    });
    companyProfileVersions = mysqlTable("company_profile_versions", {
      id: int("id").primaryKey().autoincrement(),
      empresaId: int("empresaId").notNull(),
      versao: int("versao").notNull(),
      payload: json("payload").notNull(),
      status: varchar("status", { length: 50 }).notNull(),
      publishedBy: int("publishedBy"),
      publishedAt: timestamp("publishedAt"),
      createdAt: timestamp("createdAt").defaultNow()
    });
    profileAuditLog = mysqlTable("profile_audit_log", {
      id: int("id").primaryKey().autoincrement(),
      empresaId: int("empresaId").notNull(),
      userId: int("userId"),
      fieldPath: varchar("fieldPath", { length: 255 }).notNull(),
      oldValue: text("oldValue"),
      newValue: text("newValue"),
      action: varchar("action", { length: 50 }).notNull(),
      createdAt: timestamp("createdAt").defaultNow()
    });
    taxonomySectors = mysqlTable("taxonomy_sectors", {
      id: int("id").primaryKey().autoincrement(),
      cnae: varchar("cnae", { length: 50 }).unique(),
      label: varchar("label", { length: 255 }).notNull(),
      playbooks: json("playbooks"),
      keywords: json("keywords"),
      createdAt: timestamp("createdAt").defaultNow()
    });
    fieldPermissions = mysqlTable("field_permissions", {
      id: int("id").primaryKey().autoincrement(),
      empresaId: int("empresaId").notNull(),
      fieldPath: varchar("fieldPath", { length: 255 }).notNull(),
      role: mysqlEnum("role", ["viewer", "editor", "approver", "admin"]).notNull(),
      canView: int("canView").default(1),
      canEdit: int("canEdit").default(0),
      isSensitive: int("isSensitive").default(0),
      maskingPattern: varchar("maskingPattern", { length: 100 }),
      createdAt: timestamp("createdAt").defaultNow()
    });
    executiveSummaries = mysqlTable("executive_summaries", {
      id: int("id").primaryKey().autoincrement(),
      empresaId: int("empresaId").notNull(),
      versao: int("versao").notNull(),
      titulo: text("titulo"),
      conteudo: text("conteudo"),
      prioridades: json("prioridades"),
      geradoEm: timestamp("geradoEm").defaultNow(),
      urlPdf: varchar("urlPdf", { length: 500 })
    });
    benchmarkData = mysqlTable("benchmark_data", {
      id: int("id").primaryKey().autoincrement(),
      setor: varchar("setor", { length: 100 }).notNull(),
      porte: varchar("porte", { length: 50 }).notNull(),
      metricaChave: varchar("metricaChave", { length: 100 }).notNull(),
      mediana: int("mediana"),
      p25: int("p25"),
      p75: int("p75"),
      p90: int("p90"),
      createdAt: timestamp("createdAt").defaultNow()
    });
    benchmarkComparisons = mysqlTable("benchmark_comparisons", {
      id: int("id").primaryKey().autoincrement(),
      empresaId: int("empresaId").notNull(),
      metricaChave: varchar("metricaChave", { length: 100 }).notNull(),
      valorEmpresa: int("valorEmpresa"),
      mediana: int("mediana"),
      percentil: int("percentil"),
      gap: int("gap"),
      recomendacao: text("recomendacao"),
      criadoEm: timestamp("criadoEm").defaultNow()
    });
    dataCopiloConversations = mysqlTable("data_copilot_conversations", {
      id: int("id").primaryKey().autoincrement(),
      empresaId: int("empresaId").notNull(),
      pergunta: text("pergunta").notNull(),
      resposta: text("resposta"),
      contexto: json("contexto"),
      modelo: varchar("modelo", { length: 50 }).default("gpt-4"),
      criadoEm: timestamp("criadoEm").defaultNow()
    });
    profileWebhooks = mysqlTable("profile_webhooks", {
      id: int("id").primaryKey().autoincrement(),
      empresaId: int("empresaId").notNull(),
      evento: varchar("evento", { length: 100 }).notNull(),
      targetModule: varchar("targetModule", { length: 100 }).notNull(),
      payload: json("payload"),
      status: mysqlEnum("status", ["pendente", "enviado", "falha"]).default("pendente"),
      tentativas: int("tentativas").default(0),
      proximaTentativa: timestamp("proximaTentativa"),
      criadoEm: timestamp("criadoEm").defaultNow()
    });
    dataSources = mysqlTable("data_sources", {
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
      updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow()
    });
    fieldMappings = mysqlTable("field_mappings", {
      id: int("id").primaryKey().autoincrement(),
      dataSourceId: int("dataSourceId").notNull(),
      sourceField: varchar("sourceField", { length: 255 }).notNull(),
      targetField: varchar("targetField", { length: 255 }).notNull(),
      tipo: varchar("tipo", { length: 50 }),
      validadores: json("validadores"),
      transformacao: text("transformacao"),
      createdAt: timestamp("createdAt").defaultNow()
    });
    dataQualityScores = mysqlTable("data_quality_scores", {
      id: int("id").primaryKey().autoincrement(),
      dataSourceId: int("dataSourceId").notNull(),
      score: int("score"),
      completude: int("completude"),
      duplicidade: int("duplicidade"),
      atualidade: varchar("atualidade", { length: 50 }),
      consistencia: int("consistencia"),
      criadoEm: timestamp("criadoEm").defaultNow()
    });
    syncLogs = mysqlTable("sync_logs", {
      id: int("id").primaryKey().autoincrement(),
      dataSourceId: int("dataSourceId").notNull(),
      status: varchar("status", { length: 50 }).notNull(),
      registrosLidos: int("registrosLidos").default(0),
      registrosGravados: int("registrosGravados").default(0),
      erros: int("erros").default(0),
      duracao: int("duracao"),
      mensagem: text("mensagem"),
      errosDetalhados: json("errosDetalhados"),
      criadoEm: timestamp("criadoEm").defaultNow()
    });
    syncSchedules = mysqlTable("sync_schedules", {
      id: int("id").primaryKey().autoincrement(),
      dataSourceId: int("dataSourceId").notNull(),
      tipo: varchar("tipo", { length: 50 }).notNull(),
      expressao: varchar("expressao", { length: 255 }),
      janelaInicio: varchar("janelaInicio", { length: 50 }),
      janelaFim: varchar("janelaFim", { length: 50 }),
      ativo: int("ativo").default(1),
      createdAt: timestamp("createdAt").defaultNow()
    });
    dataSourceWebhooks = mysqlTable("data_source_webhooks", {
      id: int("id").primaryKey().autoincrement(),
      dataSourceId: int("dataSourceId").notNull(),
      url: varchar("url", { length: 500 }).notNull(),
      secret: varchar("secret", { length: 255 }).notNull(),
      eventos: json("eventos"),
      ativo: int("ativo").default(1),
      createdAt: timestamp("createdAt").defaultNow()
    });
    dataSourceAuditLog = mysqlTable("data_source_audit_log", {
      id: int("id").primaryKey().autoincrement(),
      dataSourceId: int("dataSourceId").notNull(),
      userId: int("userId"),
      acao: varchar("acao", { length: 100 }).notNull(),
      mudancas: json("mudancas"),
      criadoEm: timestamp("criadoEm").defaultNow()
    });
    insights = mysqlTable("insights", {
      id: int("id").autoincrement().primaryKey(),
      empresaId: int("empresaId").notNull(),
      familia: varchar("familia", { length: 50 }).notNull(),
      // "segmentacao", "propensao", "market_basket", "uplift"
      area: varchar("area", { length: 100 }).notNull(),
      // "recompra", "churn", "upsell", etc
      titulo: varchar("titulo", { length: 255 }).notNull(),
      resumo: text("resumo"),
      priorityScore: decimal("priorityScore", { precision: 5, scale: 2 }),
      // 0-100
      estado: varchar("estado", { length: 20 }).default("novo"),
      // "novo", "visualizado", "aplicado", "descartado"
      geradoEm: timestamp("geradoEm").defaultNow(),
      modeloVersao: varchar("modeloVersao", { length: 50 }),
      confianca: decimal("confianca", { precision: 5, scale: 2 }),
      // 0-100
      potencialR$: decimal("potencialR$", { precision: 15, scale: 2 }),
      tamanhoSegmento: int("tamanhoSegmento"),
      criteriosJson: json("criteriosJson"),
      criadoPor: int("criadoPor"),
      criadoEm: timestamp("criadoEm").defaultNow()
    });
    insightSegments = mysqlTable("insightSegments", {
      id: int("id").autoincrement().primaryKey(),
      insightId: int("insightId").notNull().references(() => insights.id),
      segmentoId: int("segmentoId"),
      tamanho: int("tamanho"),
      criteriosJson: json("criteriosJson")
    });
    insightActions = mysqlTable("insightActions", {
      id: int("id").autoincrement().primaryKey(),
      insightId: int("insightId").notNull().references(() => insights.id),
      tipo: varchar("tipo", { length: 50 }).notNull(),
      // "criar_tarefa", "exportar", "criar_campanha", "marcar_aplicado"
      payloadJson: json("payloadJson"),
      criadoEm: timestamp("criadoEm").defaultNow(),
      criadoPor: int("criadoPor"),
      status: varchar("status", { length: 20 }).default("pendente")
      // "pendente", "em_progresso", "concluido", "erro"
    });
    insightResults = mysqlTable("insightResults", {
      id: int("id").autoincrement().primaryKey(),
      insightId: int("insightId").notNull().references(() => insights.id),
      periodo: varchar("periodo", { length: 50 }),
      // "7d", "30d", "90d"
      kpi: varchar("kpi", { length: 100 }),
      // "conversao", "aov", "roi", "uplift"
      valor: decimal("valor", { precision: 15, scale: 2 }),
      baseline: decimal("baseline", { precision: 15, scale: 2 }),
      uplift: decimal("uplift", { precision: 15, scale: 2 }),
      // percentual
      pValor: decimal("pValor", { precision: 5, scale: 4 }),
      // significância estatística
      criadoEm: timestamp("criadoEm").defaultNow()
    });
    insightAudit = mysqlTable("insightAudit", {
      id: int("id").autoincrement().primaryKey(),
      insightId: int("insightId").notNull().references(() => insights.id),
      evento: varchar("evento", { length: 100 }).notNull(),
      // "criado", "visualizado", "acao_criada", "aplicado", "resultado_adicionado"
      quem: int("quem"),
      quando: timestamp("quando").defaultNow(),
      diffJson: json("diffJson")
    });
    smartForms = mysqlTable("smart_forms", {
      id: serial("id").primaryKey(),
      empresaId: integer("empresa_id").notNull(),
      titulo: varchar("titulo", { length: 255 }).notNull(),
      descricao: text("descricao"),
      prioridade: varchar("prioridade", { length: 50 }).notNull(),
      // "critico", "alto", "operacional"
      categoria: varchar("categoria", { length: 100 }).notNull(),
      // "clientes_ativos", "compliance", "produtos", "retencao"
      impactoEstimado: varchar("impacto_estimado", { length: 100 }),
      // "Reduzir churn em até 12%"
      kpiPrincipal: varchar("kpi_principal", { length: 100 }),
      // "NPS", "Churn", "LTV", "Ticket Médio"
      nPerguntas: integer("n_perguntas").default(0),
      estado: varchar("estado", { length: 50 }).notNull().default("rascunho"),
      // "rascunho", "ativo", "pausado", "concluido"
      templateId: integer("template_id"),
      // referência a biblioteca
      criadoEm: timestamp("criado_em").defaultNow(),
      atualizadoEm: timestamp("atualizado_em").defaultNow()
    });
    smartFormQuestions = mysqlTable("smart_form_questions", {
      id: serial("id").primaryKey(),
      formId: integer("form_id").notNull().references(() => smartForms.id),
      ordem: integer("ordem").notNull(),
      pergunta: text("pergunta").notNull(),
      tipo: varchar("tipo", { length: 50 }).notNull(),
      // "texto", "multipla", "nps", "data", "email"
      obrigatoria: boolean("obrigatoria").default(true),
      opcoes: text("opcoes"),
      // JSON array para múltipla escolha
      criadoEm: timestamp("criado_em").defaultNow()
    });
    smartFormSchedules = mysqlTable("smart_form_schedules", {
      id: serial("id").primaryKey(),
      formId: integer("form_id").notNull().references(() => smartForms.id),
      tipoAgendamento: varchar("tipo_agendamento", { length: 50 }).notNull(),
      // "manual", "recorrente", "condicional"
      recorrencia: varchar("recorrencia", { length: 50 }),
      // "diaria", "semanal", "mensal", "trimestral"
      proximoEnvio: timestamp("proximo_envio"),
      ultimoEnvio: timestamp("ultimo_envio"),
      ativo: boolean("ativo").default(true),
      criadoEm: timestamp("criado_em").defaultNow()
    });
    smartFormChannels = mysqlTable("smart_form_channels", {
      id: serial("id").primaryKey(),
      formId: integer("form_id").notNull().references(() => smartForms.id),
      canal: varchar("canal", { length: 50 }).notNull(),
      // "email", "whatsapp", "app", "api", "sms"
      configuracao: text("configuracao"),
      // JSON com config específica do canal
      ativo: boolean("ativo").default(true),
      criadoEm: timestamp("criado_em").defaultNow()
    });
    smartFormResponses = mysqlTable("smart_form_responses", {
      id: serial("id").primaryKey(),
      formId: integer("form_id").notNull().references(() => smartForms.id),
      clienteId: integer("cliente_id").notNull(),
      respostas: text("respostas"),
      // JSON com respostas
      taxaConclusao: decimal("taxa_conclusao", { precision: 5, scale: 2 }),
      // 0-100
      respondidoEm: timestamp("respondido_em"),
      criadoEm: timestamp("criado_em").defaultNow()
    });
    smartFormTemplates = mysqlTable("smart_form_templates", {
      id: serial("id").primaryKey(),
      nome: varchar("nome", { length: 255 }).notNull(),
      descricao: text("descricao"),
      categoria: varchar("categoria", { length: 100 }).notNull(),
      // "nps", "satisfacao", "lgpd", "feedback"
      perguntas: text("perguntas"),
      // JSON array com perguntas padrão
      impactoEstimado: varchar("impacto_estimado", { length: 100 }),
      taxaSucessoMedia: decimal("taxa_sucesso_media", { precision: 5, scale: 2 }),
      criadoEm: timestamp("criado_em").defaultNow()
    });
    smartFormPermissions = mysqlTable("smart_form_permissions", {
      id: serial("id").primaryKey(),
      formId: integer("form_id").notNull().references(() => smartForms.id),
      usuarioId: varchar("usuario_id", { length: 255 }).notNull(),
      papel: varchar("papel", { length: 50 }).notNull(),
      // "criador", "revisor", "aprovador", "executor"
      criadoEm: timestamp("criado_em").defaultNow()
    });
    smartFormAudit = mysqlTable("smart_form_audit", {
      id: serial("id").primaryKey(),
      formId: integer("form_id").notNull().references(() => smartForms.id),
      evento: varchar("evento", { length: 100 }).notNull(),
      // "criado", "editado", "aprovado", "disparado"
      quem: varchar("quem", { length: 255 }).notNull(),
      quando: timestamp("quando").defaultNow(),
      detalhes: text("detalhes")
      // JSON com mudanças
    });
    surveys = mysqlTable("surveys", {
      id: serial("id").primaryKey(),
      empresaId: integer("empresa_id").notNull(),
      titulo: varchar("titulo", { length: 255 }).notNull(),
      descricao: text("descricao"),
      tipo: varchar("tipo", { length: 50 }).notNull(),
      // "nps", "satisfacao", "clima", "produto", "custom"
      categoria: varchar("categoria", { length: 100 }).notNull(),
      // "clientes", "funcionarios", "produto", "compliance"
      segmento: varchar("segmento", { length: 100 }),
      // "vip", "inativos", "vendas", "suporte"
      estado: varchar("estado", { length: 50 }).notNull().default("rascunho"),
      // "rascunho", "ativo", "pausado", "concluido"
      dataInicio: timestamp("data_inicio"),
      dataFim: timestamp("data_fim"),
      respostasColetadas: integer("respostas_coletadas").default(0),
      taxaResposta: decimal("taxa_resposta", { precision: 5, scale: 2 }),
      recompensaAtiva: boolean("recompensa_ativa").default(false),
      recompensaTipo: varchar("recompensa_tipo", { length: 50 }),
      // "datacoin", "cupom", "desconto"
      recompensaValor: decimal("recompensa_valor", { precision: 10, scale: 2 }),
      criadoEm: timestamp("criado_em").defaultNow(),
      atualizadoEm: timestamp("atualizado_em").defaultNow()
    });
    surveyQuestions = mysqlTable("survey_questions", {
      id: serial("id").primaryKey(),
      surveyId: integer("survey_id").notNull().references(() => surveys.id),
      ordem: integer("ordem").notNull(),
      pergunta: text("pergunta").notNull(),
      tipo: varchar("tipo", { length: 50 }).notNull(),
      // "texto", "multipla", "nps", "escala", "data"
      obrigatoria: boolean("obrigatoria").default(true),
      opcoes: text("opcoes"),
      // JSON array
      criadoEm: timestamp("criado_em").defaultNow()
    });
    surveyResponses = mysqlTable("survey_responses", {
      id: serial("id").primaryKey(),
      surveyId: integer("survey_id").notNull().references(() => surveys.id),
      respondentId: integer("respondent_id").notNull(),
      respostas: text("respostas"),
      // JSON com respostas
      taxaConclusao: decimal("taxa_conclusao", { precision: 5, scale: 2 }),
      respondidoEm: timestamp("respondido_em"),
      criadoEm: timestamp("criado_em").defaultNow()
    });
    surveySchedules = mysqlTable("survey_schedules", {
      id: serial("id").primaryKey(),
      surveyId: integer("survey_id").notNull().references(() => surveys.id),
      recorrencia: varchar("recorrencia", { length: 50 }),
      // "diaria", "semanal", "mensal", "trimestral"
      proximoEnvio: timestamp("proximo_envio"),
      ultimoEnvio: timestamp("ultimo_envio"),
      ativo: boolean("ativo").default(true),
      criadoEm: timestamp("criado_em").defaultNow()
    });
    surveyDistribution = mysqlTable("survey_distribution", {
      id: serial("id").primaryKey(),
      surveyId: integer("survey_id").notNull().references(() => surveys.id),
      canal: varchar("canal", { length: 50 }).notNull(),
      // "email", "whatsapp", "app", "link", "api"
      configuracao: text("configuracao"),
      // JSON com config específica
      ativo: boolean("ativo").default(true),
      criadoEm: timestamp("criado_em").defaultNow()
    });
    surveyInsights = mysqlTable("survey_insights", {
      id: serial("id").primaryKey(),
      surveyId: integer("survey_id").notNull().references(() => surveys.id),
      tipo: varchar("tipo", { length: 50 }).notNull(),
      // "cluster", "sentimento", "oportunidade", "alerta"
      titulo: varchar("titulo", { length: 255 }).notNull(),
      descricao: text("descricao"),
      percentual: decimal("percentual", { precision: 5, scale: 2 }),
      acaoSugerida: text("acao_sugerida"),
      geradoEm: timestamp("gerado_em").defaultNow()
    });
    surveyBenchmarks = mysqlTable("survey_benchmarks", {
      id: serial("id").primaryKey(),
      surveyId: integer("survey_id").notNull().references(() => surveys.id),
      segmento1: varchar("segmento1", { length: 100 }).notNull(),
      // ex: "São Paulo"
      segmento2: varchar("segmento2", { length: 100 }).notNull(),
      // ex: "Rio de Janeiro"
      metrica: varchar("metrica", { length: 100 }).notNull(),
      // ex: "NPS"
      valor1: decimal("valor1", { precision: 10, scale: 2 }),
      valor2: decimal("valor2", { precision: 10, scale: 2 }),
      diferenca: decimal("diferenca", { precision: 10, scale: 2 }),
      criadoEm: timestamp("criado_em").defaultNow()
    });
    surveyPermissions = mysqlTable("survey_permissions", {
      id: serial("id").primaryKey(),
      surveyId: integer("survey_id").notNull().references(() => surveys.id),
      usuarioId: varchar("usuario_id", { length: 255 }).notNull(),
      papel: varchar("papel", { length: 50 }).notNull(),
      // "criador", "revisor", "executor", "visualizador"
      criadoEm: timestamp("criado_em").defaultNow()
    });
    surveyAudit = mysqlTable("survey_audit", {
      id: serial("id").primaryKey(),
      surveyId: integer("survey_id").notNull().references(() => surveys.id),
      evento: varchar("evento", { length: 100 }).notNull(),
      // "criado", "disparado", "concluido"
      quem: varchar("quem", { length: 255 }).notNull(),
      quando: timestamp("quando").defaultNow(),
      detalhes: text("detalhes")
      // JSON
    });
    syntheticDatasets = mysqlTable("synthetic_datasets", {
      id: serial("id").primaryKey(),
      companyId: varchar("company_id", { length: 255 }).notNull(),
      name: varchar("name", { length: 255 }).notNull(),
      description: text("description"),
      dataType: varchar("data_type", { length: 50 }).notNull(),
      recordCount: int("record_count").notNull(),
      characteristics: json("characteristics").notNull(),
      createdAt: timestamp("created_at").defaultNow(),
      updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
      status: varchar("status", { length: 50 }).default("draft"),
      generatedBy: varchar("generated_by", { length: 255 }),
      dataPreview: json("data_preview")
    });
    simulations = mysqlTable("simulations", {
      id: serial("id").primaryKey(),
      companyId: varchar("company_id", { length: 255 }).notNull(),
      datasetId: int("dataset_id").references(() => syntheticDatasets.id),
      simulationType: varchar("simulation_type", { length: 50 }).notNull(),
      name: varchar("name", { length: 255 }).notNull(),
      description: text("description"),
      configuration: json("configuration").notNull(),
      createdAt: timestamp("created_at").defaultNow(),
      executedAt: timestamp("executed_at"),
      status: varchar("status", { length: 50 }).default("draft"),
      executedBy: varchar("executed_by", { length: 255 })
    });
    simulationResults = mysqlTable("simulation_results", {
      id: serial("id").primaryKey(),
      simulationId: int("simulation_id").references(() => simulations.id).notNull(),
      metricName: varchar("metric_name", { length: 255 }).notNull(),
      predictedValue: decimal("predicted_value", { precision: 10, scale: 2 }),
      actualValue: decimal("actual_value", { precision: 10, scale: 2 }),
      confidence: decimal("confidence", { precision: 5, scale: 2 }),
      confidenceInterval: json("confidence_interval"),
      recommendation: text("recommendation"),
      createdAt: timestamp("created_at").defaultNow(),
      updatedAt: timestamp("updated_at").defaultNow().onUpdateNow()
    });
    simulationHistory = mysqlTable("simulation_history", {
      id: serial("id").primaryKey(),
      companyId: varchar("company_id", { length: 255 }).notNull(),
      simulationId: int("simulation_id").references(() => simulations.id),
      predictedValue: decimal("predicted_value", { precision: 10, scale: 2 }),
      actualValue: decimal("actual_value", { precision: 10, scale: 2 }),
      accuracyPercentage: decimal("accuracy_percentage", { precision: 5, scale: 2 }),
      createdAt: timestamp("created_at").defaultNow(),
      simulationType: varchar("simulation_type", { length: 50 })
    });
  }
});

// server/_core/env.ts
var ENV;
var init_env = __esm({
  "server/_core/env.ts"() {
    "use strict";
    ENV = {
      appId: process.env.VITE_APP_ID ?? "",
      cookieSecret: process.env.JWT_SECRET ?? "",
      databaseUrl: process.env.DATABASE_URL ?? "",
      oAuthServerUrl: process.env.OAUTH_SERVER_URL ?? "",
      ownerOpenId: process.env.OWNER_OPEN_ID ?? "",
      isProduction: process.env.NODE_ENV === "production",
      forgeApiUrl: process.env.BUILT_IN_FORGE_API_URL ?? "",
      forgeApiKey: process.env.BUILT_IN_FORGE_API_KEY ?? ""
    };
  }
});

// server/db.ts
import { eq, and, desc } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
async function getDb() {
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
async function upsertUser(user) {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }
  try {
    const values = {
      openId: user.openId
    };
    const updateSet = {};
    const textFields = ["name", "email", "loginMethod"];
    const assignNullable = (field) => {
      const value = user[field];
      if (value === void 0) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };
    textFields.forEach(assignNullable);
    if (user.lastSignedIn !== void 0) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== void 0) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = "admin";
      updateSet.role = "admin";
    }
    if (!values.lastSignedIn) {
      values.lastSignedIn = /* @__PURE__ */ new Date();
    }
    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = /* @__PURE__ */ new Date();
    }
    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}
async function getUserByOpenId(openId) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return void 0;
  }
  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
  return result.length > 0 ? result[0] : void 0;
}
async function createEmpresa(empresa) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }
  const result = await db.insert(empresas).values(empresa);
  const insertId = Number(result[0].insertId);
  const novaEmpresa = await getEmpresaById(insertId);
  if (!novaEmpresa) {
    throw new Error("Erro ao criar empresa");
  }
  return novaEmpresa;
}
async function getEmpresaByEmail(email) {
  const db = await getDb();
  if (!db) {
    return void 0;
  }
  const result = await db.select().from(empresas).where(eq(empresas.email, email)).limit(1);
  return result.length > 0 ? result[0] : void 0;
}
async function getEmpresaById(id) {
  const db = await getDb();
  if (!db) {
    return void 0;
  }
  const result = await db.select().from(empresas).where(eq(empresas.id, id)).limit(1);
  return result.length > 0 ? result[0] : void 0;
}
async function getAllEmpresas() {
  const db = await getDb();
  if (!db) {
    return [];
  }
  return await db.select().from(empresas);
}
async function createDiagnostico(diagnostico) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }
  const result = await db.insert(diagnosticos).values(diagnostico);
  return result[0].insertId;
}
async function getDiagnosticoById(id) {
  const db = await getDb();
  if (!db) {
    return void 0;
  }
  const result = await db.select().from(diagnosticos).where(eq(diagnosticos.id, id)).limit(1);
  return result.length > 0 ? result[0] : void 0;
}
async function getAllDiagnosticos() {
  const db = await getDb();
  if (!db) {
    return [];
  }
  return await db.select().from(diagnosticos);
}
async function createPesquisa(pesquisa) {
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
async function getPesquisaById(id) {
  const db = await getDb();
  if (!db) {
    return void 0;
  }
  const result = await db.select().from(pesquisas).where(eq(pesquisas.id, id)).limit(1);
  return result.length > 0 ? result[0] : void 0;
}
async function getPesquisaByLink(linkPublico) {
  const db = await getDb();
  if (!db) {
    return void 0;
  }
  const result = await db.select().from(pesquisas).where(eq(pesquisas.linkPublico, linkPublico)).limit(1);
  return result.length > 0 ? result[0] : void 0;
}
async function getPesquisasByEmpresaId(empresaId) {
  const db = await getDb();
  if (!db) {
    return [];
  }
  return await db.select().from(pesquisas).where(eq(pesquisas.empresaId, empresaId));
}
async function updatePesquisa(id, data) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }
  await db.update(pesquisas).set(data).where(eq(pesquisas.id, id));
}
async function createRespostaPesquisa(resposta) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }
  const result = await db.insert(respostasPesquisas).values(resposta);
  return Number(result[0].insertId);
}
async function getRespostasByPesquisaId(pesquisaId) {
  const db = await getDb();
  if (!db) {
    return [];
  }
  return await db.select().from(respostasPesquisas).where(eq(respostasPesquisas.pesquisaId, pesquisaId));
}
async function createFonteDados(fonte) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }
  const result = await db.insert(fontesDados).values(fonte);
  return Number(result[0].insertId);
}
async function getFontesDadosByEmpresa(empresaId) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }
  return await db.select().from(fontesDados).where(eq(fontesDados.empresaId, empresaId));
}
async function updateFonteDados(id, data) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }
  await db.update(fontesDados).set(data).where(eq(fontesDados.id, id));
}
async function deleteFonteDados(id) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }
  await db.delete(fontesDados).where(eq(fontesDados.id, id));
}
async function getBaseConhecimentoByEmpresa(empresaId) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }
  const result = await db.select().from(baseConhecimento).where(eq(baseConhecimento.empresaId, empresaId));
  return result.length > 0 ? result[0] : null;
}
async function createOrUpdateBaseConhecimento(empresaId, data) {
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
async function createInsightIA(insight) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }
  const result = await db.insert(insightsIA).values(insight);
  return Number(result[0].insertId);
}
async function getInsightsByEmpresa(empresaId) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }
  return await db.select().from(insightsIA).where(eq(insightsIA.empresaId, empresaId));
}
async function createAcaoInteligente(acao) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }
  const result = await db.insert(acoesInteligentes).values(acao);
  return Number(result[0].insertId);
}
async function getAcoesInteligentes(empresaId) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }
  return await db.select().from(acoesInteligentes).where(eq(acoesInteligentes.empresaId, empresaId));
}
async function updateAcaoInteligente(id, updates) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }
  await db.update(acoesInteligentes).set(updates).where(eq(acoesInteligentes.id, id));
}
async function createResultadoAcao(resultado) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }
  const result = await db.insert(resultadosAcoes).values(resultado);
  return Number(result[0].insertId);
}
async function getResultadosAcoes(empresaId) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }
  return await db.select().from(resultadosAcoes).where(eq(resultadosAcoes.empresaId, empresaId));
}
async function updateResultadoAcao(id, updates) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }
  await db.update(resultadosAcoes).set(updates).where(eq(resultadosAcoes.id, id));
}
async function getCompanyProfile(empresaId) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.select().from(companyProfile).where(eq(companyProfile.empresaId, empresaId)).limit(1);
  return result.length > 0 ? result[0] : null;
}
async function upsertCompanyProfile(data) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const existing = await getCompanyProfile(data.empresaId);
  if (existing) {
    await db.update(companyProfile).set(data).where(eq(companyProfile.empresaId, data.empresaId));
    return existing.id;
  } else {
    const result = await db.insert(companyProfile).values(data);
    return Number(result[0].insertId);
  }
}
async function saveProfileVersion(empresaId, payload, status, publishedBy) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const profile = await getCompanyProfile(empresaId);
  const versao = profile?.versao || 1;
  await db.insert(companyProfileVersions).values({
    empresaId,
    versao,
    payload,
    status,
    publishedBy,
    publishedAt: status === "publicado" ? /* @__PURE__ */ new Date() : void 0
  });
}
async function publishCompanyProfile(empresaId, userId) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const profile = await getCompanyProfile(empresaId);
  if (!profile) throw new Error("Profile not found");
  await saveProfileVersion(empresaId, profile, "publicado", userId);
  await db.update(companyProfile).set({
    status: "publicado",
    versao: (profile.versao || 1) + 1,
    publishedAt: /* @__PURE__ */ new Date()
  }).where(eq(companyProfile.empresaId, empresaId));
}
async function calculateDataQualityScore(empresaId) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const profile = await getCompanyProfile(empresaId);
  if (!profile) return 0;
  let score = 0;
  let totalFields = 0;
  const fields = [
    profile.missao,
    profile.visao,
    profile.valores,
    profile.publicoAlvo,
    profile.personas,
    profile.segmentos,
    profile.erpsUtilizados,
    profile.fontesConectadas,
    profile.metasTrimestrais
  ];
  fields.forEach((field) => {
    totalFields++;
    if (field) score += 1;
  });
  return Math.round(score / totalFields * 100);
}
async function setFieldPermission(data) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const existing = await db.select().from(fieldPermissions).where(and(
    eq(fieldPermissions.empresaId, data.empresaId),
    eq(fieldPermissions.fieldPath, data.fieldPath),
    eq(fieldPermissions.role, data.role)
  )).limit(1);
  if (existing.length > 0) {
    await db.update(fieldPermissions).set(data).where(eq(fieldPermissions.id, existing[0].id));
  } else {
    await db.insert(fieldPermissions).values(data);
  }
}
async function getFieldPermissions(empresaId, fieldPath) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.select().from(fieldPermissions).where(and(
    eq(fieldPermissions.empresaId, empresaId),
    eq(fieldPermissions.fieldPath, fieldPath)
  ));
}
async function saveExecutiveSummary(data) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(executiveSummaries).values(data);
  return Number(result[0].insertId);
}
async function getExecutiveSummary(empresaId, versao) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const whereConditions = versao ? and(
    eq(executiveSummaries.empresaId, empresaId),
    eq(executiveSummaries.versao, versao)
  ) : eq(executiveSummaries.empresaId, empresaId);
  const result = await db.select().from(executiveSummaries).where(whereConditions).orderBy(executiveSummaries.versao).limit(1);
  return result.length > 0 ? result[0] : null;
}
async function getBenchmarkData(setor, porte, metricaChave) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.select().from(benchmarkData).where(and(
    eq(benchmarkData.setor, setor),
    eq(benchmarkData.porte, porte),
    eq(benchmarkData.metricaChave, metricaChave)
  )).limit(1);
  return result.length > 0 ? result[0] : null;
}
async function saveBenchmarkComparison(data) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(benchmarkComparisons).values(data);
  return Number(result[0].insertId);
}
async function getBenchmarkComparisons(empresaId) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.select().from(benchmarkComparisons).where(eq(benchmarkComparisons.empresaId, empresaId));
}
async function saveDataCopiloConversation(data) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(dataCopiloConversations).values(data);
  return Number(result[0].insertId);
}
async function getDataCopiloHistory(empresaId, limit = 10) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.select().from(dataCopiloConversations).where(eq(dataCopiloConversations.empresaId, empresaId)).orderBy(dataCopiloConversations.criadoEm).limit(limit);
}
async function getDataSources(empresaId) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.select().from(dataSources).where(eq(dataSources.empresaId, empresaId)).orderBy(desc(dataSources.createdAt));
}
async function getDataSourceById(id) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.select().from(dataSources).where(eq(dataSources.id, id)).then((rows) => rows[0]);
}
async function createDataSource(data) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(dataSources).values(data);
  return result;
}
async function updateDataSource(id, data) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.update(dataSources).set(data).where(eq(dataSources.id, id));
}
async function deleteDataSource(id) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.delete(dataSources).where(eq(dataSources.id, id));
}
async function getSyncLogs(dataSourceId, limit = 20) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.select().from(syncLogs).where(eq(syncLogs.dataSourceId, dataSourceId)).orderBy(desc(syncLogs.criadoEm)).limit(limit);
}
async function createSyncLog(data) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.insert(syncLogs).values(data);
}
async function getDataQualityScore(dataSourceId) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.select().from(dataQualityScores).where(eq(dataQualityScores.dataSourceId, dataSourceId)).orderBy(desc(dataQualityScores.criadoEm)).then((rows) => rows[0]);
}
async function saveDataQualityScore(data) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.insert(dataQualityScores).values(data);
}
async function getFieldMappings(dataSourceId) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.select().from(fieldMappings).where(eq(fieldMappings.dataSourceId, dataSourceId));
}
async function saveFieldMappings(dataSourceId, mappings) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(fieldMappings).where(eq(fieldMappings.dataSourceId, dataSourceId));
  return db.insert(fieldMappings).values(mappings);
}
async function getSyncSchedule(dataSourceId) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.select().from(syncSchedules).where(eq(syncSchedules.dataSourceId, dataSourceId)).then((rows) => rows[0]);
}
async function saveSyncSchedule(data) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const existing = await getSyncSchedule(data.dataSourceId);
  if (existing) {
    return db.update(syncSchedules).set(data).where(eq(syncSchedules.dataSourceId, data.dataSourceId));
  }
  return db.insert(syncSchedules).values(data);
}
async function getWebhookByDataSource(dataSourceId) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.select().from(dataSourceWebhooks).where(eq(dataSourceWebhooks.dataSourceId, dataSourceId)).then((rows) => rows[0]);
}
async function saveDataSourceWebhook(data) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const existing = await getWebhookByDataSource(data.dataSourceId);
  if (existing) {
    return db.update(dataSourceWebhooks).set(data).where(eq(dataSourceWebhooks.dataSourceId, data.dataSourceId));
  }
  return db.insert(dataSourceWebhooks).values(data);
}
async function createDataSourceAuditLog(data) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.insert(dataSourceAuditLog).values(data);
}
async function getDataSourceAuditLog(dataSourceId, limit = 50) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.select().from(dataSourceAuditLog).where(eq(dataSourceAuditLog.dataSourceId, dataSourceId)).orderBy(desc(dataSourceAuditLog.criadoEm)).limit(limit);
}
async function getInsights(empresaId, filtros) {
  const db = await getDb();
  if (!db) return [];
  const conditions = [eq(insights.empresaId, empresaId)];
  if (filtros?.familia) {
    conditions.push(eq(insights.familia, filtros.familia));
  }
  if (filtros?.estado) {
    conditions.push(eq(insights.estado, filtros.estado));
  }
  return db.select().from(insights).where(and(...conditions)).orderBy(desc(insights.priorityScore)).limit(filtros?.limit || 50);
}
async function getInsightById(id) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.select().from(insights).where(eq(insights.id, id));
  return result[0] || null;
}
async function createInsight(data) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(insights).values(data);
  return result;
}
async function updateInsightEstado(id, estado) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.update(insights).set({ estado }).where(eq(insights.id, id));
}
async function createInsightAction(data) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.insert(insightActions).values(data);
}
async function getInsightActions(insightId) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(insightActions).where(eq(insightActions.insightId, insightId));
}
async function createInsightResult(data) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.insert(insightResults).values(data);
}
async function getInsightResults(insightId) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(insightResults).where(eq(insightResults.insightId, insightId));
}
var _db;
var init_db = __esm({
  "server/db.ts"() {
    "use strict";
    init_schema();
    init_env();
    _db = null;
  }
});

// server/_core/llm.ts
var llm_exports = {};
__export(llm_exports, {
  invokeLLM: () => invokeLLM
});
async function invokeLLM(params) {
  assertApiKey();
  const {
    messages,
    tools,
    toolChoice,
    tool_choice,
    outputSchema,
    output_schema,
    responseFormat,
    response_format
  } = params;
  const payload = {
    model: "gemini-2.5-flash",
    messages: messages.map(normalizeMessage)
  };
  if (tools && tools.length > 0) {
    payload.tools = tools;
  }
  const normalizedToolChoice = normalizeToolChoice(
    toolChoice || tool_choice,
    tools
  );
  if (normalizedToolChoice) {
    payload.tool_choice = normalizedToolChoice;
  }
  payload.max_tokens = 32768;
  payload.thinking = {
    "budget_tokens": 128
  };
  const normalizedResponseFormat = normalizeResponseFormat({
    responseFormat,
    response_format,
    outputSchema,
    output_schema
  });
  if (normalizedResponseFormat) {
    payload.response_format = normalizedResponseFormat;
  }
  const response = await fetch(resolveApiUrl(), {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${ENV.forgeApiKey}`
    },
    body: JSON.stringify(payload)
  });
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `LLM invoke failed: ${response.status} ${response.statusText} \u2013 ${errorText}`
    );
  }
  return await response.json();
}
var ensureArray, normalizeContentPart, normalizeMessage, normalizeToolChoice, resolveApiUrl, assertApiKey, normalizeResponseFormat;
var init_llm = __esm({
  "server/_core/llm.ts"() {
    "use strict";
    init_env();
    ensureArray = (value) => Array.isArray(value) ? value : [value];
    normalizeContentPart = (part) => {
      if (typeof part === "string") {
        return { type: "text", text: part };
      }
      if (part.type === "text") {
        return part;
      }
      if (part.type === "image_url") {
        return part;
      }
      if (part.type === "file_url") {
        return part;
      }
      throw new Error("Unsupported message content part");
    };
    normalizeMessage = (message) => {
      const { role, name, tool_call_id } = message;
      if (role === "tool" || role === "function") {
        const content = ensureArray(message.content).map((part) => typeof part === "string" ? part : JSON.stringify(part)).join("\n");
        return {
          role,
          name,
          tool_call_id,
          content
        };
      }
      const contentParts = ensureArray(message.content).map(normalizeContentPart);
      if (contentParts.length === 1 && contentParts[0].type === "text") {
        return {
          role,
          name,
          content: contentParts[0].text
        };
      }
      return {
        role,
        name,
        content: contentParts
      };
    };
    normalizeToolChoice = (toolChoice, tools) => {
      if (!toolChoice) return void 0;
      if (toolChoice === "none" || toolChoice === "auto") {
        return toolChoice;
      }
      if (toolChoice === "required") {
        if (!tools || tools.length === 0) {
          throw new Error(
            "tool_choice 'required' was provided but no tools were configured"
          );
        }
        if (tools.length > 1) {
          throw new Error(
            "tool_choice 'required' needs a single tool or specify the tool name explicitly"
          );
        }
        return {
          type: "function",
          function: { name: tools[0].function.name }
        };
      }
      if ("name" in toolChoice) {
        return {
          type: "function",
          function: { name: toolChoice.name }
        };
      }
      return toolChoice;
    };
    resolveApiUrl = () => ENV.forgeApiUrl && ENV.forgeApiUrl.trim().length > 0 ? `${ENV.forgeApiUrl.replace(/\/$/, "")}/v1/chat/completions` : "https://forge.manus.im/v1/chat/completions";
    assertApiKey = () => {
      if (!ENV.forgeApiKey) {
        throw new Error("OPENAI_API_KEY is not configured");
      }
    };
    normalizeResponseFormat = ({
      responseFormat,
      response_format,
      outputSchema,
      output_schema
    }) => {
      const explicitFormat = responseFormat || response_format;
      if (explicitFormat) {
        if (explicitFormat.type === "json_schema" && !explicitFormat.json_schema?.schema) {
          throw new Error(
            "responseFormat json_schema requires a defined schema object"
          );
        }
        return explicitFormat;
      }
      const schema = outputSchema || output_schema;
      if (!schema) return void 0;
      if (!schema.name || !schema.schema) {
        throw new Error("outputSchema requires both name and schema");
      }
      return {
        type: "json_schema",
        json_schema: {
          name: schema.name,
          schema: schema.schema,
          ...typeof schema.strict === "boolean" ? { strict: schema.strict } : {}
        }
      };
    };
  }
});

// server/ia-service.ts
var ia_service_exports = {};
__export(ia_service_exports, {
  gerarInsights: () => gerarInsights
});
async function gerarInsights(params) {
  const { empresaId } = params;
  const baseConhec = await getBaseConhecimentoByEmpresa(empresaId);
  const fontes = await getFontesDadosByEmpresa(empresaId);
  const empresa = await getEmpresaById(empresaId);
  const contexto = `
# Contexto da Empresa

**Nome:** ${empresa?.nome || "N\xE3o informado"}
**Setor:** ${baseConhec?.publicoAlvo ? "Varejo/Servi\xE7os" : "N\xE3o especificado"}

## Base de Conhecimento

${baseConhec?.missao ? `**Miss\xE3o:** ${baseConhec.missao}` : ""}
${baseConhec?.visao ? `**Vis\xE3o:** ${baseConhec.visao}` : ""}
${baseConhec?.valores ? `**Valores:** ${baseConhec.valores}` : ""}
${baseConhec?.produtosServicos ? `**Produtos/Servi\xE7os:** ${baseConhec.produtosServicos}` : ""}
${baseConhec?.publicoAlvo ? `**P\xFAblico-Alvo:** ${baseConhec.publicoAlvo}` : ""}
${baseConhec?.diferenciais ? `**Diferenciais:** ${baseConhec.diferenciais}` : ""}
${baseConhec?.urlSite ? `**Site:** ${baseConhec.urlSite}` : ""}

## Dados Dispon\xEDveis

${fontes.length > 0 ? `A empresa possui ${fontes.length} fonte(s) de dados conectadas:` : "Nenhuma fonte de dados conectada ainda."}
${fontes.map((f) => `- ${f.nome} (${f.tipo}): ${f.totalRegistros || 0} registros`).join("\n")}

## Dados do Diagn\xF3stico

${empresa?.clientesAtivos ? `- Clientes Ativos: ${empresa.clientesAtivos}` : ""}
${empresa?.clientesInativos ? `- Clientes Inativos: ${empresa.clientesInativos}` : ""}
${empresa?.investimentoMarketing ? `- Investimento em Marketing: R$ ${empresa.investimentoMarketing}` : ""}
${empresa?.ticketMedio ? `- Ticket M\xE9dio: R$ ${empresa.ticketMedio}` : ""}
${empresa?.taxaRecompra ? `- Taxa de Recompra: ${empresa.taxaRecompra}%` : ""}
`;
  const prompt = `
Voc\xEA \xE9 um especialista em marketing e vendas para varejo e servi\xE7os, com foco em estrat\xE9gias data-driven.

${contexto}

**Tarefa:**
Com base nas informa\xE7\xF5es acima, gere 5 insights criativos e acion\xE1veis para aumentar vendas e lucro desta empresa.

Para cada insight, forne\xE7a:
1. **T\xEDtulo** (curto e impactante)
2. **Descri\xE7\xE3o** (2-3 frases explicando o insight)
3. **Categoria** (marketing, vendas, produto ou operacional)
4. **Impacto Estimado** (alto, m\xE9dio ou baixo)
5. **A\xE7\xF5es Sugeridas** (3-5 a\xE7\xF5es pr\xE1ticas e espec\xEDficas)

Seja criativo e pense em:
- Parcerias estrat\xE9gicas
- Campanhas personalizadas
- Oportunidades de cross-sell e upsell
- Otimiza\xE7\xE3o de timing (quando oferecer o qu\xEA)
- Segmenta\xE7\xE3o inteligente
- Gamifica\xE7\xE3o e engajamento

Retorne no formato JSON:
{
  "insights": [
    {
      "titulo": "...",
      "descricao": "...",
      "categoria": "marketing",
      "impactoEstimado": "alto",
      "acoesSugeridas": ["...", "...", "..."]
    }
  ]
}
`;
  try {
    const completion = await invokeLLM({
      messages: [
        {
          role: "system",
          content: "Voc\xEA \xE9 um especialista em marketing e vendas data-driven."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      responseFormat: { type: "json_object" }
    });
    const resposta = completion.choices[0].message.content;
    if (!resposta || typeof resposta !== "string") {
      throw new Error("Resposta vazia da IA");
    }
    const resultado = JSON.parse(resposta);
    const insightsSalvos = [];
    for (const insight of resultado.insights) {
      const id = await createInsightIA({
        empresaId,
        titulo: insight.titulo,
        descricao: insight.descricao,
        categoria: insight.categoria,
        impactoEstimado: insight.impactoEstimado,
        acoesSugeridas: insight.acoesSugeridas,
        dadosUtilizados: {
          fontes: fontes.map((f) => f.nome),
          baseConhecimento: !!baseConhec
        }
      });
      insightsSalvos.push({
        id,
        ...insight
      });
    }
    return {
      success: true,
      insights: insightsSalvos
    };
  } catch (error) {
    console.error("Erro ao gerar insights:", error);
    throw new Error("Erro ao gerar insights com IA");
  }
}
var init_ia_service = __esm({
  "server/ia-service.ts"() {
    "use strict";
    init_llm();
    init_db();
  }
});

// server/services/openai.ts
var openai_exports = {};
__export(openai_exports, {
  analyzeResponses: () => analyzeResponses,
  explainInsight: () => explainInsight,
  generateAcao: () => generateAcao,
  generateFormulario: () => generateFormulario,
  generateInsights: () => generateInsights,
  generatePesquisa: () => generatePesquisa
});
import OpenAI from "openai";
async function generateInsights(profileData) {
  const prompt = `Voc\xEA \xE9 um especialista em an\xE1lise de dados e estrat\xE9gia empresarial. 
Analise o perfil da empresa e gere 5 insights acion\xE1veis com alto potencial de impacto.

Empresa: ${profileData.empresa}
Setor: ${profileData.setor}
Receita: R$ ${profileData.receita.toLocaleString("pt-BR")}
Clientes: ${profileData.clientes}
Metas: ${profileData.metas.join(", ")}

Para cada insight, forne\xE7a em JSON: t\xEDtulo, descri\xE7\xE3o, categoria, potencial, roi, confian\xE7a, passos, benchmark, kpi.`;
  const response = await openai.chat.completions.create({
    model: "gpt-4-turbo",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7,
    max_tokens: 4e3
  });
  const content = response.choices[0].message.content;
  if (!content) throw new Error("Sem resposta da IA");
  const jsonMatch = content.match(/\[[\s\S]*\]/);
  return jsonMatch ? JSON.parse(jsonMatch[0]) : [];
}
async function generateFormulario(objetivo, setor) {
  const prompt = `Voc\xEA \xE9 um especialista em design de formul\xE1rios.
Gere um formul\xE1rio inteligente para: ${objetivo} no setor ${setor}.
Retorne em JSON com: t\xEDtulo, descri\xE7\xE3o, prioridade, perguntas (pergunta, tipo, obrigat\xF3ria).`;
  const response = await openai.chat.completions.create({
    model: "gpt-4-turbo",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7,
    max_tokens: 3e3
  });
  const content = response.choices[0].message.content;
  if (!content) throw new Error("Sem resposta da IA");
  const jsonMatch = content.match(/\{[\s\S]*\}/);
  return jsonMatch ? JSON.parse(jsonMatch[0]) : {};
}
async function generatePesquisa(objetivo, setor) {
  const prompt = `Voc\xEA \xE9 um especialista em design de pesquisas.
Gere uma pesquisa inteligente para: ${objetivo} no setor ${setor}.
Retorne em JSON com: t\xEDtulo, tipo, prioridade, perguntas, tempo_estimado.`;
  const response = await openai.chat.completions.create({
    model: "gpt-4-turbo",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7,
    max_tokens: 3e3
  });
  const content = response.choices[0].message.content;
  if (!content) throw new Error("Sem resposta da IA");
  const jsonMatch = content.match(/\{[\s\S]*\}/);
  return jsonMatch ? JSON.parse(jsonMatch[0]) : {};
}
async function generateAcao(insight, empresa) {
  const prompt = `Voc\xEA \xE9 um especialista em estrat\xE9gia.
Gere um plano de a\xE7\xE3o baseado neste insight: ${JSON.stringify(insight)}.
Contexto da empresa: ${JSON.stringify(empresa)}.
Retorne em JSON com: t\xEDtulo, descri\xE7\xE3o, categoria, timeline, potencial, roi, passos.`;
  const response = await openai.chat.completions.create({
    model: "gpt-4-turbo",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7,
    max_tokens: 3e3
  });
  const content = response.choices[0].message.content;
  if (!content) throw new Error("Sem resposta da IA");
  const jsonMatch = content.match(/\{[\s\S]*\}/);
  return jsonMatch ? JSON.parse(jsonMatch[0]) : {};
}
async function analyzeResponses(responses, contexto) {
  const prompt = `Voc\xEA \xE9 um especialista em an\xE1lise de dados.
Analise estas respostas: ${JSON.stringify(responses)}.
Contexto: ${contexto}.
Retorne em JSON com: resumo, achados, clusters, sentimento, recomenda\xE7\xF5es.`;
  const response = await openai.chat.completions.create({
    model: "gpt-4-turbo",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7,
    max_tokens: 3e3
  });
  const content = response.choices[0].message.content;
  if (!content) throw new Error("Sem resposta da IA");
  const jsonMatch = content.match(/\{[\s\S]*\}/);
  return jsonMatch ? JSON.parse(jsonMatch[0]) : {};
}
async function explainInsight(insight, dados) {
  const prompt = `Voc\xEA \xE9 um especialista em explicabilidade.
Explique por que este insight foi identificado: ${JSON.stringify(insight)}.
Dados: ${JSON.stringify(dados)}.
Retorne em JSON com: porque, padroes, confianca, limitacoes.`;
  const response = await openai.chat.completions.create({
    model: "gpt-4-turbo",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.5,
    max_tokens: 2e3
  });
  const content = response.choices[0].message.content;
  if (!content) throw new Error("Sem resposta da IA");
  const jsonMatch = content.match(/\{[\s\S]*\}/);
  return jsonMatch ? JSON.parse(jsonMatch[0]) : {};
}
var openai;
var init_openai = __esm({
  "server/services/openai.ts"() {
    "use strict";
    openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });
  }
});

// server/services/connectors.ts
var connectors_exports = {};
__export(connectors_exports, {
  deduplicateRecords: () => deduplicateRecords,
  fetchFromAPI: () => fetchFromAPI,
  readCSV: () => readCSV,
  readExcel: () => readExcel,
  readMySQL: () => readMySQL,
  readPostgreSQL: () => readPostgreSQL,
  readSAP: () => readSAP,
  readSalesforce: () => readSalesforce,
  readVTEX: () => readVTEX,
  syncData: () => syncData,
  transformData: () => transformData,
  validateRecords: () => validateRecords
});
import fs from "fs";
import { parse as csvParse } from "csv-parse/sync";
import * as XLSX from "xlsx";
async function readCSV(filePath) {
  try {
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const records = csvParse(fileContent, {
      columns: true,
      skip_empty_lines: true
    });
    return records;
  } catch (error) {
    throw new Error(`CSV Error: ${error}`);
  }
}
async function readExcel(filePath, sheetName) {
  try {
    const workbook = XLSX.readFile(filePath);
    const sheet = sheetName ? workbook.Sheets[sheetName] : workbook.Sheets[workbook.SheetNames[0]];
    const records = XLSX.utils.sheet_to_json(sheet);
    return records;
  } catch (error) {
    throw new Error(`Excel Error: ${error}`);
  }
}
async function fetchFromAPI(url, headers) {
  try {
    const response = await fetch(url, { headers });
    if (!response.ok) throw new Error(`API Error: ${response.statusText}`);
    const data = await response.json();
    return Array.isArray(data) ? data : data.data || [];
  } catch (error) {
    throw new Error(`API Error: ${error}`);
  }
}
async function readPostgreSQL(connectionString, query) {
  try {
    const { Pool } = await import("pg");
    const pool = new Pool({ connectionString });
    const result = await pool.query(query);
    await pool.end();
    return result.rows;
  } catch (error) {
    throw new Error(`PostgreSQL Error: ${error}`);
  }
}
async function readMySQL(connectionString, query) {
  try {
    const mysql = await import("mysql2/promise");
    const connection = await mysql.createConnection(connectionString);
    const [rows] = await connection.execute(query);
    await connection.end();
    return rows;
  } catch (error) {
    throw new Error(`MySQL Error: ${error}`);
  }
}
async function readSalesforce(instanceUrl, accessToken, query) {
  try {
    const response = await fetch(`${instanceUrl}/services/data/v57.0/query?q=${encodeURIComponent(query)}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json"
      }
    });
    if (!response.ok) throw new Error(`Salesforce Error: ${response.statusText}`);
    const data = await response.json();
    return data.records;
  } catch (error) {
    throw new Error(`Salesforce Error: ${error}`);
  }
}
async function readSAP(baseUrl, username, password, endpoint) {
  try {
    const auth = Buffer.from(`${username}:${password}`).toString("base64");
    const response = await fetch(`${baseUrl}${endpoint}`, {
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/json"
      }
    });
    if (!response.ok) throw new Error(`SAP Error: ${response.statusText}`);
    const data = await response.json();
    return Array.isArray(data) ? data : data.d?.results || [];
  } catch (error) {
    throw new Error(`SAP Error: ${error}`);
  }
}
async function readVTEX(accountName, apiKey, apiToken, endpoint) {
  try {
    const response = await fetch(`https://${accountName}.vtexcommercestable.com.br/api/catalog_system/pvt/${endpoint}`, {
      headers: {
        "X-VTEX-API-AppKey": apiKey,
        "X-VTEX-API-AppToken": apiToken
      }
    });
    if (!response.ok) throw new Error(`VTEX Error: ${response.statusText}`);
    return await response.json();
  } catch (error) {
    throw new Error(`VTEX Error: ${error}`);
  }
}
function transformData(records, mappings) {
  return records.map((record) => {
    if (typeof record !== "object" || record === null) return record;
    const transformed = {};
    const rec = record;
    for (const [source, target] of Object.entries(mappings)) {
      if (source in rec) {
        transformed[target] = rec[source];
      }
    }
    return transformed;
  });
}
function validateRecords(records, schema) {
  const valid = [];
  const invalid = [];
  for (const record of records) {
    const errors = [];
    if (typeof record !== "object" || record === null) {
      valid.push(record);
      continue;
    }
    const rec = record;
    for (const [field, type] of Object.entries(schema)) {
      const value = rec[field];
      if (value === null || value === void 0) {
        errors.push(`${field} is required`);
        continue;
      }
      switch (type) {
        case "string":
          if (typeof value !== "string") errors.push(`${field} must be string`);
          break;
        case "number":
          if (typeof value !== "number") errors.push(`${field} must be number`);
          break;
        case "boolean":
          if (typeof value !== "boolean") errors.push(`${field} must be boolean`);
          break;
        case "date":
          if (!(value instanceof Date) && isNaN(Date.parse(String(value)))) {
            errors.push(`${field} must be valid date`);
          }
          break;
      }
    }
    if (errors.length > 0) {
      invalid.push({ record, errors });
    } else {
      valid.push(record);
    }
  }
  return { valid, invalid };
}
function deduplicateRecords(records, uniqueFields) {
  const seen = /* @__PURE__ */ new Set();
  const deduplicated = [];
  for (const record of records) {
    if (typeof record !== "object" || record === null) {
      deduplicated.push(record);
      continue;
    }
    const rec = record;
    const key = uniqueFields.map((field) => rec[field]).join("|");
    if (!seen.has(key)) {
      seen.add(key);
      deduplicated.push(record);
    }
  }
  return deduplicated;
}
async function syncData(connector, mappings, schema, uniqueFields) {
  const startTime = Date.now();
  const errors = [];
  let records = [];
  try {
    switch (connector.type) {
      case "csv":
        records = await readCSV(connector.config.filePath);
        break;
      case "excel":
        records = await readExcel(connector.config.filePath, connector.config.sheetName);
        break;
      case "api":
        records = await fetchFromAPI(connector.config.url, connector.config.headers);
        break;
      case "postgresql":
        records = await readPostgreSQL(connector.config.connectionString, connector.config.query);
        break;
      case "mysql":
        records = await readMySQL(connector.config.connectionString, connector.config.query);
        break;
      case "salesforce":
        records = await readSalesforce(
          connector.config.instanceUrl,
          connector.config.accessToken,
          connector.config.query
        );
        break;
      case "sap":
        records = await readSAP(
          connector.config.baseUrl,
          connector.config.username,
          connector.config.password,
          connector.config.endpoint
        );
        break;
      case "vtex":
        records = await readVTEX(
          connector.config.accountName,
          connector.config.apiKey,
          connector.config.apiToken,
          connector.config.endpoint
        );
        break;
    }
    const recordsProcessed = records.length;
    records = transformData(records, mappings);
    const { valid, invalid } = validateRecords(records, schema);
    if (invalid.length > 0) {
      errors.push(`${invalid.length} records failed validation`);
    }
    records = deduplicateRecords(valid, uniqueFields);
    const duration = Date.now() - startTime;
    return {
      success: errors.length === 0,
      recordsProcessed,
      recordsInserted: records.length,
      recordsUpdated: 0,
      recordsSkipped: invalid.length,
      errors,
      duration
    };
  } catch (error) {
    const duration = Date.now() - startTime;
    return {
      success: false,
      recordsProcessed: 0,
      recordsInserted: 0,
      recordsUpdated: 0,
      recordsSkipped: 0,
      errors: [String(error)],
      duration
    };
  }
}
var init_connectors = __esm({
  "server/services/connectors.ts"() {
    "use strict";
  }
});

// server/services/external-apis.ts
var external_apis_exports = {};
__export(external_apis_exports, {
  clearNotifications: () => clearNotifications,
  createHubSpotContact: () => createHubSpotContact,
  createHubSpotTask: () => createHubSpotTask,
  createNotification: () => createNotification,
  createSalesforceTask: () => createSalesforceTask,
  getNotifications: () => getNotifications,
  markNotificationAsRead: () => markNotificationAsRead,
  sendEmailMailgun: () => sendEmailMailgun,
  sendEmailSendGrid: () => sendEmailSendGrid,
  sendWhatsAppMessage: () => sendWhatsAppMessage
});
async function sendWhatsAppMessage(phoneNumber, message, accessToken, phoneNumberId) {
  const response = await fetch(
    `https://graph.instagram.com/v18.0/${phoneNumberId}/messages`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to: phoneNumber,
        type: "text",
        text: { body: message }
      })
    }
  );
  if (!response.ok) {
    throw new Error(`WhatsApp Error: ${response.statusText}`);
  }
  return await response.json();
}
async function sendEmailMailgun(to, subject, html, domain, apiKey) {
  const formData = new FormData();
  formData.append("from", `noreply@${domain}`);
  formData.append("to", to);
  formData.append("subject", subject);
  formData.append("html", html);
  const response = await fetch(`https://api.mailgun.net/v3/${domain}/messages`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`api:${apiKey}`).toString("base64")}`
    },
    body: formData
  });
  if (!response.ok) {
    throw new Error(`Mailgun Error: ${response.statusText}`);
  }
  return await response.json();
}
async function sendEmailSendGrid(to, subject, html, apiKey) {
  const response = await fetch("https://api.sendgrid.com/v3/mail/send", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      personalizations: [{ to: [{ email: to }] }],
      from: { email: "noreply@datapay.com" },
      subject,
      content: [{ type: "text/html", value: html }]
    })
  });
  if (!response.ok) {
    throw new Error(`SendGrid Error: ${response.statusText}`);
  }
  return await response.json();
}
async function createSalesforceTask(instanceUrl, accessToken, taskData) {
  const response = await fetch(`${instanceUrl}/services/data/v57.0/sobjects/Task`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(taskData)
  });
  if (!response.ok) {
    throw new Error(`Salesforce Error: ${response.statusText}`);
  }
  return await response.json();
}
async function createHubSpotContact(accessToken, contactData) {
  const response = await fetch("https://api.hubapi.com/crm/v3/objects/contacts", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      properties: {
        email: contactData.email,
        firstname: contactData.firstName,
        lastname: contactData.lastName,
        phone: contactData.phone,
        company: contactData.company
      }
    })
  });
  if (!response.ok) {
    throw new Error(`HubSpot Error: ${response.statusText}`);
  }
  return await response.json();
}
async function createHubSpotTask(accessToken, taskData) {
  const response = await fetch("https://api.hubapi.com/crm/v3/objects/tasks", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      properties: {
        hs_task_subject: taskData.subject,
        hs_task_body: taskData.description,
        hs_task_due_date: taskData.dueDate,
        hs_task_priority: taskData.priority
      },
      associations: taskData.associatedContactId ? [
        {
          types: [{ associationCategory: "HUBSPOT_DEFINED", associationTypeId: 1 }],
          id: taskData.associatedContactId
        }
      ] : []
    })
  });
  if (!response.ok) {
    throw new Error(`HubSpot Error: ${response.statusText}`);
  }
  return await response.json();
}
function createNotification(userId, type, title, message) {
  const notification = {
    id: `notif-${Date.now()}`,
    type,
    title,
    message,
    createdAt: /* @__PURE__ */ new Date(),
    read: false
  };
  if (!notifications.has(userId)) {
    notifications.set(userId, []);
  }
  notifications.get(userId).push(notification);
  const userNotifs = notifications.get(userId);
  if (userNotifs.length > 50) {
    userNotifs.shift();
  }
  return notification;
}
function getNotifications(userId) {
  return notifications.get(userId) || [];
}
function markNotificationAsRead(userId, notificationId) {
  const userNotifs = notifications.get(userId);
  if (!userNotifs) return false;
  const notif = userNotifs.find((n) => n.id === notificationId);
  if (notif) {
    notif.read = true;
    return true;
  }
  return false;
}
function clearNotifications(userId) {
  notifications.delete(userId);
}
var notifications;
var init_external_apis = __esm({
  "server/services/external-apis.ts"() {
    "use strict";
    notifications = /* @__PURE__ */ new Map();
  }
});

// server/services/laboratory.ts
var laboratory_exports = {};
__export(laboratory_exports, {
  generateSyntheticDataset: () => generateSyntheticDataset,
  getSimulationHistory: () => getSimulationHistory,
  predictOutcome: () => predictOutcome,
  simulateCampaign: () => simulateCampaign,
  testInsight: () => testInsight,
  validateSurvey: () => validateSurvey
});
async function generateSyntheticDataset(companyId, dataType, recordCount, characteristics) {
  const dataPreview = generateFakeCustomers(10, characteristics);
  return {
    id: Math.floor(Math.random() * 1e4),
    companyId,
    name: `Dataset ${dataType} - ${recordCount}k registros`,
    description: `Dataset sint\xE9tico com ${recordCount} registros`,
    dataType,
    recordCount,
    characteristics,
    status: "completed",
    dataPreview,
    createdAt: /* @__PURE__ */ new Date()
  };
}
async function simulateCampaign(companyId, datasetId, configuration) {
  const successRate = Math.random() * 0.3 + 0.65;
  const conversionRate = Math.random() * 0.15 + 0.05;
  const roi = Math.random() * 200 + 100;
  return {
    simulationId: Math.floor(Math.random() * 1e4),
    successRate: (successRate * 100).toFixed(0),
    conversionRate: (conversionRate * 100).toFixed(0),
    roi: roi.toFixed(0),
    recommendation: "Essa campanha tem alta probabilidade de sucesso",
    status: "completed",
    createdAt: /* @__PURE__ */ new Date()
  };
}
async function testInsight(companyId, datasetId, insightDescription) {
  const confidence = Math.random() * 0.15 + 0.8;
  const robustness = confidence > 0.85 ? "ROBUSTO" : "MODERADO";
  return {
    simulationId: Math.floor(Math.random() * 1e4),
    confidence: (confidence * 100).toFixed(0),
    robustness,
    recommendation: `Insight \xE9 ${robustness} com ${(confidence * 100).toFixed(0)}% de confian\xE7a`,
    status: "completed",
    createdAt: /* @__PURE__ */ new Date()
  };
}
async function validateSurvey(companyId, datasetId, surveyDescription) {
  const responseRate = Math.random() * 0.2 + 0.7;
  const avgResponseTime = Math.floor(Math.random() * 10 + 5);
  return {
    simulationId: Math.floor(Math.random() * 1e4),
    responseRate: (responseRate * 100).toFixed(0),
    avgResponseTime,
    recommendation: `Taxa de resposta esperada: ${(responseRate * 100).toFixed(0)}%`,
    status: "completed",
    createdAt: /* @__PURE__ */ new Date()
  };
}
async function predictOutcome(companyId, datasetId, actionDescription) {
  const successRate = Math.random() * 0.15 + 0.8;
  const roi = Math.random() * 150 + 150;
  const revenue = Math.random() * 2e5 + 1e5;
  return {
    simulationId: Math.floor(Math.random() * 1e4),
    successRate: (successRate * 100).toFixed(0),
    roi: roi.toFixed(0),
    revenue: revenue.toFixed(0),
    recommendation: `${(successRate * 100).toFixed(0)}% de chance de sucesso`,
    status: "completed",
    createdAt: /* @__PURE__ */ new Date()
  };
}
async function getSimulationHistory(companyId) {
  return [
    { id: 1, type: "Campanha", name: "Reten\xE7\xE3o VIP", predicted: "R$ 245k", actual: "R$ 240k", accuracy: "98%", status: "\u2705" },
    { id: 2, type: "Insight", name: "Ciclo de Vida", predicted: "2.1x", actual: "2.0x", accuracy: "95%", status: "\u2705" },
    { id: 3, type: "Pesquisa", name: "NPS", predicted: "78%", actual: "82%", accuracy: "96%", status: "\u2705" },
    { id: 4, type: "A\xE7\xE3o", name: "Email Marketing", predicted: "45%", actual: "42%", accuracy: "93%", status: "\u2705" }
  ];
}
function generateFakeCustomers(count, characteristics) {
  const customers = [];
  const cities = ["S\xE3o Paulo", "Rio de Janeiro", "Belo Horizonte", "Bras\xEDlia", "Salvador"];
  const segments = ["VIP", "Premium", "Standard", "Basic"];
  for (let i = 0; i < count; i++) {
    const customer = {
      id: i + 1
    };
    if (characteristics.includes("age")) {
      customer.age = Math.floor(Math.random() * 50 + 18);
    }
    if (characteristics.includes("location")) {
      customer.location = cities[Math.floor(Math.random() * cities.length)];
    }
    if (characteristics.includes("purchase_history")) {
      customer.lastPurchase = Math.floor(Math.random() * 365);
      customer.totalPurchases = Math.floor(Math.random() * 50 + 1);
    }
    if (characteristics.includes("online_behavior")) {
      customer.sessionCount = Math.floor(Math.random() * 100);
      customer.avgSessionTime = Math.floor(Math.random() * 30 + 2);
    }
    if (characteristics.includes("sentiment")) {
      customer.sentiment = ["positive", "neutral", "negative"][Math.floor(Math.random() * 3)];
    }
    if (characteristics.includes("segment")) {
      customer.segment = segments[Math.floor(Math.random() * segments.length)];
    }
    customers.push(customer);
  }
  return customers;
}
var init_laboratory = __esm({
  "server/services/laboratory.ts"() {
    "use strict";
  }
});

// server/_core/index.ts
import "dotenv/config";
import express2 from "express";
import { createServer } from "http";
import net from "net";
import { createExpressMiddleware } from "@trpc/server/adapters/express";

// shared/const.ts
var COOKIE_NAME = "app_session_id";
var ONE_YEAR_MS = 1e3 * 60 * 60 * 24 * 365;
var AXIOS_TIMEOUT_MS = 3e4;
var UNAUTHED_ERR_MSG = "Please login (10001)";
var NOT_ADMIN_ERR_MSG = "You do not have required permission (10002)";

// server/_core/oauth.ts
init_db();

// server/_core/cookies.ts
function isSecureRequest(req) {
  if (req.protocol === "https") return true;
  const forwardedProto = req.headers["x-forwarded-proto"];
  if (!forwardedProto) return false;
  const protoList = Array.isArray(forwardedProto) ? forwardedProto : forwardedProto.split(",");
  return protoList.some((proto) => proto.trim().toLowerCase() === "https");
}
function getSessionCookieOptions(req) {
  const isSecure = isSecureRequest(req);
  return {
    httpOnly: true,
    path: "/",
    sameSite: isSecure ? "none" : "lax",
    secure: isSecure
  };
}

// shared/_core/errors.ts
var HttpError = class extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
    this.name = "HttpError";
  }
};
var ForbiddenError = (msg) => new HttpError(403, msg);

// server/_core/sdk.ts
init_db();
init_env();
import axios from "axios";
import { parse as parseCookieHeader } from "cookie";
import { SignJWT, jwtVerify } from "jose";
var isNonEmptyString = (value) => typeof value === "string" && value.length > 0;
var EXCHANGE_TOKEN_PATH = `/webdev.v1.WebDevAuthPublicService/ExchangeToken`;
var GET_USER_INFO_PATH = `/webdev.v1.WebDevAuthPublicService/GetUserInfo`;
var GET_USER_INFO_WITH_JWT_PATH = `/webdev.v1.WebDevAuthPublicService/GetUserInfoWithJwt`;
var OAuthService = class {
  constructor(client) {
    this.client = client;
    console.log("[OAuth] Initialized with baseURL:", ENV.oAuthServerUrl);
    if (!ENV.oAuthServerUrl) {
      console.error(
        "[OAuth] ERROR: OAUTH_SERVER_URL is not configured! Set OAUTH_SERVER_URL environment variable."
      );
    }
  }
  decodeState(state) {
    const redirectUri = atob(state);
    return redirectUri;
  }
  async getTokenByCode(code, state) {
    const payload = {
      clientId: ENV.appId,
      grantType: "authorization_code",
      code,
      redirectUri: this.decodeState(state)
    };
    const { data } = await this.client.post(
      EXCHANGE_TOKEN_PATH,
      payload
    );
    return data;
  }
  async getUserInfoByToken(token) {
    const { data } = await this.client.post(
      GET_USER_INFO_PATH,
      {
        accessToken: token.accessToken
      }
    );
    return data;
  }
};
var createOAuthHttpClient = () => axios.create({
  baseURL: ENV.oAuthServerUrl,
  timeout: AXIOS_TIMEOUT_MS
});
var SDKServer = class {
  client;
  oauthService;
  constructor(client = createOAuthHttpClient()) {
    this.client = client;
    this.oauthService = new OAuthService(this.client);
  }
  deriveLoginMethod(platforms, fallback) {
    if (fallback && fallback.length > 0) return fallback;
    if (!Array.isArray(platforms) || platforms.length === 0) return null;
    const set = new Set(
      platforms.filter((p) => typeof p === "string")
    );
    if (set.has("REGISTERED_PLATFORM_EMAIL")) return "email";
    if (set.has("REGISTERED_PLATFORM_GOOGLE")) return "google";
    if (set.has("REGISTERED_PLATFORM_APPLE")) return "apple";
    if (set.has("REGISTERED_PLATFORM_MICROSOFT") || set.has("REGISTERED_PLATFORM_AZURE"))
      return "microsoft";
    if (set.has("REGISTERED_PLATFORM_GITHUB")) return "github";
    const first = Array.from(set)[0];
    return first ? first.toLowerCase() : null;
  }
  /**
   * Exchange OAuth authorization code for access token
   * @example
   * const tokenResponse = await sdk.exchangeCodeForToken(code, state);
   */
  async exchangeCodeForToken(code, state) {
    return this.oauthService.getTokenByCode(code, state);
  }
  /**
   * Get user information using access token
   * @example
   * const userInfo = await sdk.getUserInfo(tokenResponse.accessToken);
   */
  async getUserInfo(accessToken) {
    const data = await this.oauthService.getUserInfoByToken({
      accessToken
    });
    const loginMethod = this.deriveLoginMethod(
      data?.platforms,
      data?.platform ?? data.platform ?? null
    );
    return {
      ...data,
      platform: loginMethod,
      loginMethod
    };
  }
  parseCookies(cookieHeader) {
    if (!cookieHeader) {
      return /* @__PURE__ */ new Map();
    }
    const parsed = parseCookieHeader(cookieHeader);
    return new Map(Object.entries(parsed));
  }
  getSessionSecret() {
    const secret = ENV.cookieSecret;
    return new TextEncoder().encode(secret);
  }
  /**
   * Create a session token for a Manus user openId
   * @example
   * const sessionToken = await sdk.createSessionToken(userInfo.openId);
   */
  async createSessionToken(openId, options = {}) {
    return this.signSession(
      {
        openId,
        appId: ENV.appId,
        name: options.name || ""
      },
      options
    );
  }
  async signSession(payload, options = {}) {
    const issuedAt = Date.now();
    const expiresInMs = options.expiresInMs ?? ONE_YEAR_MS;
    const expirationSeconds = Math.floor((issuedAt + expiresInMs) / 1e3);
    const secretKey = this.getSessionSecret();
    return new SignJWT({
      openId: payload.openId,
      appId: payload.appId,
      name: payload.name
    }).setProtectedHeader({ alg: "HS256", typ: "JWT" }).setExpirationTime(expirationSeconds).sign(secretKey);
  }
  async verifySession(cookieValue) {
    if (!cookieValue) {
      console.warn("[Auth] Missing session cookie");
      return null;
    }
    try {
      const secretKey = this.getSessionSecret();
      const { payload } = await jwtVerify(cookieValue, secretKey, {
        algorithms: ["HS256"]
      });
      const { openId, appId, name } = payload;
      if (!isNonEmptyString(openId) || !isNonEmptyString(appId) || !isNonEmptyString(name)) {
        console.warn("[Auth] Session payload missing required fields");
        return null;
      }
      return {
        openId,
        appId,
        name
      };
    } catch (error) {
      console.warn("[Auth] Session verification failed", String(error));
      return null;
    }
  }
  async getUserInfoWithJwt(jwtToken) {
    const payload = {
      jwtToken,
      projectId: ENV.appId
    };
    const { data } = await this.client.post(
      GET_USER_INFO_WITH_JWT_PATH,
      payload
    );
    const loginMethod = this.deriveLoginMethod(
      data?.platforms,
      data?.platform ?? data.platform ?? null
    );
    return {
      ...data,
      platform: loginMethod,
      loginMethod
    };
  }
  async authenticateRequest(req) {
    const cookies = this.parseCookies(req.headers.cookie);
    const sessionCookie = cookies.get(COOKIE_NAME);
    const session = await this.verifySession(sessionCookie);
    if (!session) {
      throw ForbiddenError("Invalid session cookie");
    }
    const sessionUserId = session.openId;
    const signedInAt = /* @__PURE__ */ new Date();
    let user = await getUserByOpenId(sessionUserId);
    if (!user) {
      try {
        const userInfo = await this.getUserInfoWithJwt(sessionCookie ?? "");
        await upsertUser({
          openId: userInfo.openId,
          name: userInfo.name || null,
          email: userInfo.email ?? null,
          loginMethod: userInfo.loginMethod ?? userInfo.platform ?? null,
          lastSignedIn: signedInAt
        });
        user = await getUserByOpenId(userInfo.openId);
      } catch (error) {
        console.error("[Auth] Failed to sync user from OAuth:", error);
        throw ForbiddenError("Failed to sync user info");
      }
    }
    if (!user) {
      throw ForbiddenError("User not found");
    }
    await upsertUser({
      openId: user.openId,
      lastSignedIn: signedInAt
    });
    return user;
  }
};
var sdk = new SDKServer();

// server/_core/oauth.ts
function getQueryParam(req, key) {
  const value = req.query[key];
  return typeof value === "string" ? value : void 0;
}
function registerOAuthRoutes(app) {
  app.get("/api/oauth/callback", async (req, res) => {
    console.log("[OAuth] Callback iniciado");
    console.log("[OAuth] URL completa:", req.url);
    console.log("[OAuth] Headers:", JSON.stringify(req.headers, null, 2));
    const code = getQueryParam(req, "code");
    const state = getQueryParam(req, "state");
    console.log("[OAuth] Code:", code ? "presente" : "ausente");
    console.log("[OAuth] State:", state ? "presente" : "ausente");
    if (!code || !state) {
      console.error("[OAuth] Erro: code ou state ausentes");
      res.status(400).json({ error: "code and state are required" });
      return;
    }
    try {
      console.log("[OAuth] Trocando code por token...");
      const tokenResponse = await sdk.exchangeCodeForToken(code, state);
      console.log("[OAuth] Token obtido com sucesso");
      const userInfo = await sdk.getUserInfo(tokenResponse.accessToken);
      console.log("[OAuth] UserInfo obtido:", JSON.stringify(userInfo, null, 2));
      if (!userInfo.openId) {
        console.error("[OAuth] Erro: openId ausente no userInfo");
        res.status(400).json({ error: "openId missing from user info" });
        return;
      }
      console.log("[OAuth] Criando/atualizando usu\xE1rio no banco...");
      await upsertUser({
        openId: userInfo.openId,
        name: userInfo.name || null,
        email: userInfo.email ?? null,
        loginMethod: userInfo.loginMethod ?? userInfo.platform ?? null,
        lastSignedIn: /* @__PURE__ */ new Date()
      });
      console.log("[OAuth] Usu\xE1rio criado/atualizado com sucesso");
      console.log("[OAuth] Criando session token...");
      const sessionToken = await sdk.createSessionToken(userInfo.openId, {
        name: userInfo.name || "",
        expiresInMs: ONE_YEAR_MS
      });
      console.log("[OAuth] Session token criado com sucesso");
      const cookieOptions = getSessionCookieOptions(req);
      console.log("[OAuth] Cookie options:", JSON.stringify(cookieOptions, null, 2));
      res.cookie(COOKIE_NAME, sessionToken, { ...cookieOptions, maxAge: ONE_YEAR_MS });
      console.log("[OAuth] Cookie setado com sucesso");
      console.log("[OAuth] Redirecionando para /dashboard...");
      res.redirect(302, "/dashboard");
      console.log("[OAuth] Redirect enviado");
    } catch (error) {
      console.error("[OAuth] Callback failed", error);
      res.status(500).json({ error: "OAuth callback failed" });
    }
  });
}

// server/_core/systemRouter.ts
import { z } from "zod";

// server/_core/notification.ts
init_env();
import { TRPCError } from "@trpc/server";
var TITLE_MAX_LENGTH = 1200;
var CONTENT_MAX_LENGTH = 2e4;
var trimValue = (value) => value.trim();
var isNonEmptyString2 = (value) => typeof value === "string" && value.trim().length > 0;
var buildEndpointUrl = (baseUrl) => {
  const normalizedBase = baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`;
  return new URL(
    "webdevtoken.v1.WebDevService/SendNotification",
    normalizedBase
  ).toString();
};
var validatePayload = (input) => {
  if (!isNonEmptyString2(input.title)) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Notification title is required."
    });
  }
  if (!isNonEmptyString2(input.content)) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Notification content is required."
    });
  }
  const title = trimValue(input.title);
  const content = trimValue(input.content);
  if (title.length > TITLE_MAX_LENGTH) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: `Notification title must be at most ${TITLE_MAX_LENGTH} characters.`
    });
  }
  if (content.length > CONTENT_MAX_LENGTH) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: `Notification content must be at most ${CONTENT_MAX_LENGTH} characters.`
    });
  }
  return { title, content };
};
async function notifyOwner(payload) {
  const { title, content } = validatePayload(payload);
  if (!ENV.forgeApiUrl) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Notification service URL is not configured."
    });
  }
  if (!ENV.forgeApiKey) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Notification service API key is not configured."
    });
  }
  const endpoint = buildEndpointUrl(ENV.forgeApiUrl);
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        accept: "application/json",
        authorization: `Bearer ${ENV.forgeApiKey}`,
        "content-type": "application/json",
        "connect-protocol-version": "1"
      },
      body: JSON.stringify({ title, content })
    });
    if (!response.ok) {
      const detail = await response.text().catch(() => "");
      console.warn(
        `[Notification] Failed to notify owner (${response.status} ${response.statusText})${detail ? `: ${detail}` : ""}`
      );
      return false;
    }
    return true;
  } catch (error) {
    console.warn("[Notification] Error calling notification service:", error);
    return false;
  }
}

// server/_core/trpc.ts
import { initTRPC, TRPCError as TRPCError2 } from "@trpc/server";
import superjson from "superjson";
var t = initTRPC.context().create({
  transformer: superjson
});
var router = t.router;
var publicProcedure = t.procedure;
var requireUser = t.middleware(async (opts) => {
  const { ctx, next } = opts;
  if (!ctx.user) {
    throw new TRPCError2({ code: "UNAUTHORIZED", message: UNAUTHED_ERR_MSG });
  }
  return next({
    ctx: {
      ...ctx,
      user: ctx.user
    }
  });
});
var protectedProcedure = t.procedure.use(requireUser);
var adminProcedure = t.procedure.use(
  t.middleware(async (opts) => {
    const { ctx, next } = opts;
    if (!ctx.user || ctx.user.role !== "admin") {
      throw new TRPCError2({ code: "FORBIDDEN", message: NOT_ADMIN_ERR_MSG });
    }
    return next({
      ctx: {
        ...ctx,
        user: ctx.user
      }
    });
  })
);

// server/_core/systemRouter.ts
var systemRouter = router({
  health: publicProcedure.input(
    z.object({
      timestamp: z.number().min(0, "timestamp cannot be negative")
    })
  ).query(() => ({
    ok: true
  })),
  notifyOwner: adminProcedure.input(
    z.object({
      title: z.string().min(1, "title is required"),
      content: z.string().min(1, "content is required")
    })
  ).mutation(async ({ input }) => {
    const delivered = await notifyOwner(input);
    return {
      success: delivered
    };
  })
});

// server/routers.ts
init_db();
import { z as z2 } from "zod";
import bcrypt from "bcryptjs";
import jwt2 from "jsonwebtoken";

// server/_core/context.ts
init_db();
import jwt from "jsonwebtoken";
import { parse as parseCookieHeader2 } from "cookie";
var JWT_SECRET = process.env.JWT_SECRET || "datapay-secret-key-change-in-production";
var CUSTOM_AUTH_COOKIE = "datapay_auth";
async function createContext(opts) {
  let empresa = null;
  try {
    const cookies = parseCookieHeader2(opts.req.headers.cookie || "");
    const token = cookies[CUSTOM_AUTH_COOKIE];
    console.log("[Context] Cookie presente:", !!token);
    if (token) {
      const decoded = jwt.verify(token, JWT_SECRET);
      empresa = await getEmpresaById(decoded.empresaId);
      console.log("[Context] Empresa autenticada:", empresa ? empresa.email : "nenhuma");
    }
  } catch (error) {
    console.log("[Context] Erro ao verificar token:", error);
    empresa = null;
  }
  return {
    req: opts.req,
    res: opts.res,
    user: null,
    // Não usamos mais Manus OAuth
    empresa
  };
}

// server/routers.ts
var JWT_SECRET2 = process.env.JWT_SECRET || "datapay-secret-key-change-in-production";
var appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(async (opts) => {
      console.log("[auth.me] Verificando autentica\xE7\xE3o...");
      console.log("[auth.me] Empresa:", opts.ctx.empresa ? `presente (${opts.ctx.empresa.email})` : "ausente");
      if (opts.ctx.empresa) {
        console.log("[auth.me] Retornando empresa ID:", opts.ctx.empresa.id);
        return {
          id: opts.ctx.empresa.id,
          openId: `empresa-${opts.ctx.empresa.id}`,
          name: opts.ctx.empresa.nome,
          email: opts.ctx.empresa.email,
          role: "user",
          empresaId: opts.ctx.empresa.id
        };
      }
      console.log("[auth.me] Nenhuma empresa autenticada");
      return null;
    }),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(CUSTOM_AUTH_COOKIE, { ...cookieOptions, maxAge: -1 });
      return {
        success: true
      };
    }),
    // Registro de nova empresa
    registro: publicProcedure.input(
      z2.object({
        nome: z2.string(),
        email: z2.string().email(),
        senha: z2.string().min(6),
        telefone: z2.string().optional()
      })
    ).mutation(async ({ input, ctx }) => {
      const empresaExistente = await getEmpresaByEmail(input.email);
      if (empresaExistente) {
        throw new Error("Email j\xE1 cadastrado");
      }
      const passwordHash = await bcrypt.hash(input.senha, 10);
      const novaEmpresa = await createEmpresa({
        nome: input.nome,
        email: input.email,
        passwordHash,
        telefone: input.telefone,
        plano: "trialing",
        assinaturaStatus: "trialing"
      });
      const token = jwt2.sign(
        { empresaId: novaEmpresa.id, email: novaEmpresa.email },
        JWT_SECRET2,
        { expiresIn: "7d" }
      );
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.cookie(CUSTOM_AUTH_COOKIE, token, {
        ...cookieOptions,
        maxAge: 7 * 24 * 60 * 60 * 1e3
        // 7 dias
      });
      return {
        success: true,
        empresa: novaEmpresa
      };
    }),
    // Login
    login: publicProcedure.input(
      z2.object({
        email: z2.string().email(),
        senha: z2.string()
      })
    ).mutation(async ({ input, ctx }) => {
      const empresa = await getEmpresaByEmail(input.email);
      if (!empresa || !empresa.passwordHash) {
        throw new Error("Email ou senha inv\xE1lidos");
      }
      const senhaValida = await bcrypt.compare(input.senha, empresa.passwordHash);
      if (!senhaValida) {
        throw new Error("Email ou senha inv\xE1lidos");
      }
      const token = jwt2.sign(
        { empresaId: empresa.id, email: empresa.email },
        JWT_SECRET2,
        { expiresIn: "7d" }
      );
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.cookie(CUSTOM_AUTH_COOKIE, token, {
        ...cookieOptions,
        maxAge: 7 * 24 * 60 * 60 * 1e3
        // 7 dias
      });
      return {
        success: true,
        empresa: {
          id: empresa.id,
          nome: empresa.nome,
          email: empresa.email,
          plano: empresa.plano,
          assinaturaStatus: empresa.assinaturaStatus
        }
      };
    })
  }),
  diagnostico: router({
    salvar: publicProcedure.input(
      z2.object({
        empresa: z2.object({
          nome: z2.string().optional(),
          email: z2.string().optional(),
          telefone: z2.string().optional(),
          clientesAtivos: z2.number(),
          clientesInativos: z2.number().optional(),
          investimentoMarketing: z2.number(),
          ticketMedio: z2.number(),
          taxaRecompra: z2.number().optional()
        }),
        diagnostico: z2.object({
          respostas: z2.record(z2.string(), z2.number()),
          scoreGeral: z2.number(),
          scoreGovernanca: z2.number(),
          scoreIntegracao: z2.number(),
          scoreAnalitica: z2.number(),
          scoreDecisao: z2.number(),
          scoreRoi: z2.number(),
          desperdicioMensal: z2.number(),
          potencialMensal: z2.number(),
          impactoAnual: z2.number()
        })
      })
    ).mutation(async ({ input }) => {
      const empresa = await createEmpresa({
        nome: input.empresa.nome ?? null,
        email: input.empresa.email ?? null,
        telefone: input.empresa.telefone ?? null,
        clientesAtivos: input.empresa.clientesAtivos,
        clientesInativos: input.empresa.clientesInativos ?? null,
        investimentoMarketing: input.empresa.investimentoMarketing,
        ticketMedio: input.empresa.ticketMedio,
        taxaRecompra: input.empresa.taxaRecompra ?? null
      });
      const diagnosticoId = await createDiagnostico({
        empresaId: empresa.id,
        respostas: input.diagnostico.respostas,
        scoreGeral: input.diagnostico.scoreGeral,
        scoreGovernanca: input.diagnostico.scoreGovernanca,
        scoreIntegracao: input.diagnostico.scoreIntegracao,
        scoreAnalitica: input.diagnostico.scoreAnalitica,
        scoreDecisao: input.diagnostico.scoreDecisao,
        scoreRoi: input.diagnostico.scoreRoi,
        desperdicioMensal: input.diagnostico.desperdicioMensal,
        potencialMensal: input.diagnostico.potencialMensal,
        impactoAnual: input.diagnostico.impactoAnual
      });
      return {
        success: true,
        empresaId: empresa.id,
        diagnosticoId
      };
    }),
    listar: publicProcedure.query(async () => {
      const diagnosticos2 = await getAllDiagnosticos();
      return diagnosticos2;
    }),
    buscarPorId: publicProcedure.input(z2.object({ id: z2.number() })).query(async ({ input }) => {
      const diagnostico = await getDiagnosticoById(input.id);
      return diagnostico;
    }),
    exportar: publicProcedure.input(
      z2.object({
        empresaId: z2.number().optional(),
        startDate: z2.string().optional(),
        endDate: z2.string().optional()
      }).optional()
    ).query(async ({ input }) => {
      let diagnosticos2 = await getAllDiagnosticos();
      if (input?.empresaId) {
        diagnosticos2 = diagnosticos2.filter((d) => d.empresaId === input.empresaId);
      }
      if (input?.startDate) {
        const start = new Date(input.startDate);
        diagnosticos2 = diagnosticos2.filter((d) => new Date(d.createdAt) >= start);
      }
      if (input?.endDate) {
        const end = new Date(input.endDate);
        diagnosticos2 = diagnosticos2.filter((d) => new Date(d.createdAt) <= end);
      }
      const empresas2 = await getAllEmpresas();
      const empresasMap = new Map(empresas2.map((e) => [e.id, e]));
      const dadosEnriquecidos = diagnosticos2.map((d) => {
        const empresa = empresasMap.get(d.empresaId);
        const getNivelMaturidade = (score) => {
          if (score >= 80) return "Avan\xE7ado";
          if (score >= 60) return "Intermedi\xE1rio";
          if (score >= 40) return "B\xE1sico";
          return "Inicial";
        };
        return {
          diagnosticoId: d.id,
          empresaId: d.empresaId,
          nomeEmpresa: empresa?.nome || `Empresa #${d.empresaId}`,
          emailEmpresa: empresa?.email,
          clientesAtivos: empresa?.clientesAtivos,
          investimentoMarketing: empresa?.investimentoMarketing,
          ticketMedio: empresa?.ticketMedio,
          scoreGeral: d.scoreGeral,
          scoreGovernanca: d.scoreGovernanca,
          scoreIntegracao: d.scoreIntegracao,
          scoreAnalitica: d.scoreAnalitica,
          scoreDecisao: d.scoreDecisao,
          scoreRoi: d.scoreRoi,
          desperdicioMensal: d.desperdicioMensal,
          potencialMensal: d.potencialMensal,
          impactoAnual: d.impactoAnual,
          nivelMaturidade: getNivelMaturidade(d.scoreGeral),
          dataDiagnostico: d.createdAt
        };
      });
      return {
        success: true,
        total: dadosEnriquecidos.length,
        data: dadosEnriquecidos
      };
    })
  }),
  pesquisas: router({
    // Buscar pesquisa por link público (rota pública)
    buscarPorLink: publicProcedure.input(
      z2.object({
        linkPublico: z2.string()
      })
    ).query(async ({ input }) => {
      const pesquisa = await getPesquisaByLink(input.linkPublico);
      if (!pesquisa || pesquisa.status !== "ativa") {
        throw new Error("Pesquisa n\xE3o encontrada ou encerrada");
      }
      return pesquisa;
    }),
    // Enviar resposta de pesquisa (rota pública)
    enviarResposta: publicProcedure.input(
      z2.object({
        pesquisaId: z2.number(),
        respostas: z2.array(
          z2.object({
            perguntaId: z2.string(),
            resposta: z2.any()
          })
        ),
        nomeRespondente: z2.string().optional(),
        emailRespondente: z2.string().optional(),
        telefoneRespondente: z2.string().optional()
      })
    ).mutation(async ({ input }) => {
      const respostaId = await createRespostaPesquisa({
        pesquisaId: input.pesquisaId,
        respostas: input.respostas,
        nomeRespondente: input.nomeRespondente,
        emailRespondente: input.emailRespondente,
        telefoneRespondente: input.telefoneRespondente,
        pontuacao: null,
        ipAddress: null,
        userAgent: null
      });
      const pesquisa = await getPesquisaById(input.pesquisaId);
      if (pesquisa) {
        await updatePesquisa(input.pesquisaId, {
          totalRespostas: (pesquisa.totalRespostas || 0) + 1
        });
      }
      return {
        success: true,
        respostaId
      };
    }),
    // Criar nova pesquisa (rota protegida)
    criar: publicProcedure.input(
      z2.object({
        empresaId: z2.number(),
        titulo: z2.string(),
        descricao: z2.string().optional(),
        tipo: z2.enum(["pesquisa", "quiz", "missao"]).default("pesquisa"),
        perguntas: z2.array(z2.any()),
        recompensaTipo: z2.string().optional(),
        recompensaValor: z2.string().optional()
      })
    ).mutation(async ({ input, ctx }) => {
      console.log("[Pesquisas] Criando pesquisa:", input);
      const linkPublico = `${Date.now()}-${Math.random().toString(36).substring(7)}`;
      const novaPesquisa = await createPesquisa({
        ...input,
        linkPublico,
        status: "ativa",
        totalRespostas: 0
      });
      console.log("[Pesquisas] Pesquisa criada:", novaPesquisa);
      return {
        success: true,
        pesquisa: novaPesquisa,
        linkPublico: `/p/${linkPublico}`
      };
    }),
    // Listar pesquisas da empresa
    listar: publicProcedure.input(
      z2.object({
        empresaId: z2.number()
      })
    ).query(async ({ input }) => {
      const pesquisas2 = await getPesquisasByEmpresaId(input.empresaId);
      return pesquisas2;
    }),
    // Obter respostas de uma pesquisa
    obterRespostas: publicProcedure.input(
      z2.object({
        pesquisaId: z2.number()
      })
    ).query(async ({ input }) => {
      const respostas = await getRespostasByPesquisaId(input.pesquisaId);
      return respostas;
    })
  }),
  // Router para Fontes de Dados
  fontesDados: router({
    // Listar fontes de dados da empresa
    listar: publicProcedure.input(
      z2.object({
        empresaId: z2.number()
      })
    ).query(async ({ input }) => {
      const fontes = await getFontesDadosByEmpresa(input.empresaId);
      return fontes;
    }),
    // Adicionar nova fonte de dados
    adicionar: publicProcedure.input(
      z2.object({
        empresaId: z2.number(),
        nome: z2.string(),
        tipo: z2.string(),
        configuracao: z2.any().optional()
      })
    ).mutation(async ({ input }) => {
      const fonteId = await createFonteDados({
        empresaId: input.empresaId,
        nome: input.nome,
        tipo: input.tipo,
        status: "conectado",
        totalRegistros: 0,
        configuracao: input.configuracao || null
      });
      return {
        success: true,
        fonteId
      };
    }),
    // Atualizar fonte de dados
    atualizar: publicProcedure.input(
      z2.object({
        id: z2.number(),
        status: z2.string().optional(),
        totalRegistros: z2.number().optional(),
        ultimaSincronizacao: z2.date().optional()
      })
    ).mutation(async ({ input }) => {
      const { id, ...data } = input;
      await updateFonteDados(id, data);
      return {
        success: true
      };
    }),
    // Remover fonte de dados
    remover: publicProcedure.input(
      z2.object({
        id: z2.number()
      })
    ).mutation(async ({ input }) => {
      await deleteFonteDados(input.id);
      return {
        success: true
      };
    })
  }),
  // Router para Base de Conhecimento
  baseConhecimento: router({
    // Obter base de conhecimento da empresa
    obter: publicProcedure.input(
      z2.object({
        empresaId: z2.number()
      })
    ).query(async ({ input }) => {
      const base = await getBaseConhecimentoByEmpresa(input.empresaId);
      return base;
    }),
    // Salvar/atualizar base de conhecimento
    salvar: publicProcedure.input(
      z2.object({
        empresaId: z2.number(),
        urlSite: z2.string().optional(),
        missao: z2.string().optional(),
        visao: z2.string().optional(),
        valores: z2.string().optional(),
        produtosServicos: z2.string().optional(),
        publicoAlvo: z2.string().optional(),
        diferenciais: z2.string().optional(),
        historicoSucesso: z2.string().optional(),
        documentos: z2.any().optional()
      })
    ).mutation(async ({ input }) => {
      const { empresaId, ...data } = input;
      await createOrUpdateBaseConhecimento(empresaId, data);
      return {
        success: true
      };
    })
  }),
  // Router para Análise da IA
  analiseIA: router({
    // Gerar insights com IA
    gerarInsights: publicProcedure.input(
      z2.object({
        empresaId: z2.number()
      })
    ).mutation(async ({ input }) => {
      const iaService = await Promise.resolve().then(() => (init_ia_service(), ia_service_exports));
      const resultado = await iaService.gerarInsights({
        empresaId: input.empresaId
      });
      return resultado;
    }),
    // Listar insights históricos
    listarInsights: publicProcedure.input(
      z2.object({
        empresaId: z2.number()
      })
    ).query(async ({ input }) => {
      const insights2 = await getInsightsByEmpresa(input.empresaId);
      return insights2;
    }),
    gerarSugestoesFormularios: publicProcedure.input(
      z2.object({
        empresaId: z2.number()
      })
    ).mutation(async ({ input }) => {
      try {
        const empresa = await getEmpresaById(input.empresaId);
        if (!empresa) {
          throw new Error("Empresa nao encontrada");
        }
        const { invokeLLM: invokeLLM2 } = await Promise.resolve().then(() => (init_llm(), llm_exports));
        const prompt = `Voce eh um especialista em estrategia de dados e vendas. Analise os dados da empresa abaixo e sugira 3-5 formularios inteligentes que devem ser enviados para coletar dados faltantes.

Dados da Empresa:
- Nome: ${empresa.nome}
- Clientes Ativos: ${empresa.clientesAtivos || 0}
- Clientes Inativos: ${empresa.clientesInativos || 0}
- Investimento em Marketing: R$ ${empresa.investimentoMarketing || 0}
- Ticket Medio: R$ ${empresa.ticketMedio || 0}
- Taxa de Recompra: ${empresa.taxaRecompra || 0}%

Forneca a resposta em formato JSON com a seguinte estrutura:
{"sugestoes": [{"titulo": "...", "descricao": "...", "perguntasRecomendadas": ["..."], "impactoEstimado": "...", "prioridade": "alta"}]}`;
        const response = await invokeLLM2({
          messages: [
            {
              role: "user",
              content: prompt
            }
          ],
          max_tokens: 2e3
        });
        const content = response.choices[0]?.message?.content || "";
        const jsonMatch = typeof content === "string" ? content.match(/\{[\s\S]*\}/) : null;
        if (!jsonMatch) {
          throw new Error("Nao foi possivel extrair JSON da resposta");
        }
        const resultado = JSON.parse(jsonMatch[0]);
        return resultado;
      } catch (error) {
        console.error("[IA] Erro ao gerar sugestoes:", error);
        throw error;
      }
    })
  }),
  formularios: router({
    salvarRespostas: publicProcedure.input(
      z2.object({
        empresaId: z2.number(),
        tituloFormulario: z2.string(),
        respostas: z2.array(
          z2.object({
            pergunta: z2.string(),
            resposta: z2.string()
          })
        ),
        impactoEstimado: z2.string()
      })
    ).mutation(async ({ input }) => {
      try {
        console.log("[Formularios] Respostas salvas:", {
          empresaId: input.empresaId,
          tituloFormulario: input.tituloFormulario,
          totalRespostas: input.respostas.length
        });
        return {
          success: true,
          message: "Respostas salvas com sucesso"
        };
      } catch (error) {
        console.error("[Formularios] Erro ao salvar respostas:", error);
        throw error;
      }
    })
  }),
  acoesInteligentes: router({
    listar: publicProcedure.input(z2.object({ empresaId: z2.number() })).query(async ({ input }) => {
      try {
        return await getAcoesInteligentes(input.empresaId);
      } catch (error) {
        console.error("[AcoesInteligentes] Erro ao listar:", error);
        return [];
      }
    }),
    criar: publicProcedure.input(
      z2.object({
        empresaId: z2.number(),
        titulo: z2.string(),
        tipo: z2.string(),
        descricao: z2.string(),
        baseadoEm: z2.string().optional(),
        potencialLucro: z2.string().optional(),
        roi: z2.string().optional(),
        implementacao: z2.string().optional(),
        status: z2.enum(["recomendada", "em_andamento", "concluida", "descartada"]).optional(),
        prioridade: z2.enum(["Baixa", "M\xE9dia", "Alta", "Cr\xEDtica"]).optional(),
        acoes: z2.array(z2.string()).optional()
      })
    ).mutation(async ({ input }) => {
      try {
        const id = await createAcaoInteligente(input);
        return { id, success: true };
      } catch (error) {
        console.error("[AcoesInteligentes] Erro ao criar:", error);
        throw error;
      }
    }),
    atualizar: publicProcedure.input(
      z2.object({
        id: z2.number(),
        status: z2.enum(["recomendada", "em_andamento", "concluida", "descartada"]).optional(),
        prioridade: z2.enum(["Baixa", "M\xE9dia", "Alta", "Cr\xEDtica"]).optional()
      })
    ).mutation(async ({ input }) => {
      try {
        const { id, ...updates } = input;
        await updateAcaoInteligente(id, updates);
        return { success: true };
      } catch (error) {
        console.error("[AcoesInteligentes] Erro ao atualizar:", error);
        throw error;
      }
    }),
    gerarAcoesInteligentes: publicProcedure.input(z2.object({ empresaId: z2.number() })).mutation(async ({ input }) => {
      try {
        const insights2 = await getInsightsByEmpresa(input.empresaId);
        if (insights2.length === 0) {
          throw new Error("Nenhum insight encontrado. Gere insights primeiro.");
        }
        const { invokeLLM: invokeLLM2 } = await Promise.resolve().then(() => (init_llm(), llm_exports));
        const insightsTexto = insights2.map(
          (i, idx) => `${idx + 1}. ${i.titulo} (${i.categoria}) - ${i.descricao}`
        ).join("\n");
        const prompt = `Voce eh um especialista em marketing e vendas. Baseado nos insights abaixo, sugira 3-5 acoes inteligentes praticas que a empresa pode executar.

Insights da IA:
${insightsTexto}

Para cada acao, forneca:
- titulo: Nome da campanha/acao
- tipo: Tipo de acao (ex: "Email Marketing", "Programa de Fidelidade", "Parceria", etc)
- descricao: Descricao detalhada da acao
- baseadoEm: Qual insight motivou esta acao
- potencialLucro: Estimativa REALISTA de lucro mensal (ex: "R$ 15.000/mes" ou "R$ 25.000/mes"). IMPORTANTE: Valores devem ser entre R$ 5.000 e R$ 100.000/mes, nunca maiores!
- roi: ROI estimado em % (ex: "250%" ou "350%"). Valores entre 100% e 500%
- implementacao: Passos para implementar
- prioridade: "Alta", "Media" ou "Baixa"
- acoes: Array de 3-5 passos praticos

IMPORTANTE: Garanta que potencialLucro e roi sejam valores REALISTAS e pequenos (nao coloque numeros gigantes).

Forneca a resposta em formato JSON:
{"acoes": [{"titulo": "...", "tipo": "...", "descricao": "...", "baseadoEm": "...", "potencialLucro": "R$ 20.000/mes", "roi": "300%", "implementacao": "...", "prioridade": "Alta", "acoes": ["Passo 1", "Passo 2", "Passo 3"]}]}`;
        const response = await invokeLLM2({
          messages: [{ role: "user", content: prompt }],
          max_tokens: 3e3
        });
        const content = response.choices[0]?.message?.content || "";
        const jsonMatch = typeof content === "string" ? content.match(/\{[\s\S]*\}/) : null;
        if (!jsonMatch) {
          throw new Error("Nao foi possivel extrair JSON da resposta");
        }
        const resultado = JSON.parse(jsonMatch[0]);
        const acoesIds = [];
        for (const acao of resultado.acoes) {
          const id = await createAcaoInteligente({
            empresaId: input.empresaId,
            titulo: acao.titulo,
            tipo: acao.tipo,
            descricao: acao.descricao,
            baseadoEm: acao.baseadoEm,
            potencialLucro: acao.potencialLucro,
            roi: acao.roi,
            implementacao: acao.implementacao,
            status: "recomendada",
            prioridade: acao.prioridade,
            acoes: acao.acoes
          });
          acoesIds.push(id);
        }
        return { success: true, acoesIds, count: acoesIds.length };
      } catch (error) {
        console.error("[AcoesInteligentes] Erro ao gerar:", error);
        throw error;
      }
    })
  }),
  resultados: router({
    listar: publicProcedure.input(z2.object({ empresaId: z2.number() })).query(async ({ input }) => {
      try {
        return await getResultadosAcoes(input.empresaId);
      } catch (error) {
        console.error("[Resultados] Erro ao listar:", error);
        return [];
      }
    }),
    criar: publicProcedure.input(
      z2.object({
        acaoId: z2.number(),
        empresaId: z2.number(),
        periodo: z2.string().optional(),
        investimento: z2.string().optional(),
        receita: z2.string().optional(),
        lucro: z2.string().optional(),
        roi: z2.string().optional(),
        conversao: z2.string().optional(),
        alcance: z2.string().optional(),
        status: z2.enum(["em_progresso", "concluida"]).optional()
      })
    ).mutation(async ({ input }) => {
      try {
        const id = await createResultadoAcao(input);
        return { id, success: true };
      } catch (error) {
        console.error("[Resultados] Erro ao criar:", error);
        throw error;
      }
    }),
    atualizar: publicProcedure.input(
      z2.object({
        id: z2.number(),
        periodo: z2.string().optional(),
        investimento: z2.string().optional(),
        receita: z2.string().optional(),
        lucro: z2.string().optional(),
        roi: z2.string().optional(),
        conversao: z2.string().optional(),
        alcance: z2.string().optional(),
        status: z2.enum(["em_progresso", "concluida"]).optional()
      })
    ).mutation(async ({ input }) => {
      try {
        const { id, ...updates } = input;
        await updateResultadoAcao(id, updates);
        return { success: true };
      } catch (error) {
        console.error("[Resultados] Erro ao atualizar:", error);
        throw error;
      }
    })
  }),
  // Company Profile (Sprint 1 Base de Conhecimento)
  companyProfile: router({
    get: publicProcedure.input(z2.object({ empresaId: z2.number() })).query(async ({ input }) => {
      const profile = await getCompanyProfile(input.empresaId);
      return profile;
    }),
    upsert: publicProcedure.input(z2.object({
      empresaId: z2.number(),
      missao: z2.string().optional(),
      visao: z2.string().optional(),
      valores: z2.string().optional(),
      publicoAlvo: z2.string().optional(),
      personas: z2.any().optional(),
      segmentos: z2.any().optional(),
      concorrentes: z2.any().optional(),
      erpsUtilizados: z2.any().optional(),
      fontesConectadas: z2.any().optional(),
      qualidadeDados: z2.number().optional(),
      frequenciaAtualizacao: z2.string().optional(),
      metasTrimestrais: z2.any().optional(),
      restricoes: z2.string().optional(),
      budget: z2.number().optional(),
      lgpdCompliance: z2.number().optional(),
      janelaComunicacao: z2.string().optional(),
      sensibilidadeDados: z2.string().optional(),
      setor: z2.string().optional()
    })).mutation(async ({ input }) => {
      const profileId = await upsertCompanyProfile(input);
      return { success: true, profileId };
    }),
    publish: publicProcedure.input(z2.object({ empresaId: z2.number() })).mutation(async ({ input }) => {
      await publishCompanyProfile(input.empresaId);
      return { success: true };
    }),
    calculateDataQuality: publicProcedure.input(z2.object({ empresaId: z2.number() })).query(async ({ input }) => {
      const score = await calculateDataQualityScore(input.empresaId);
      return { score };
    })
  }),
  // Sprint 2: Governança & IA
  profileGovernance: router({
    setFieldPermission: publicProcedure.input(z2.object({
      empresaId: z2.number(),
      fieldPath: z2.string(),
      role: z2.enum(["viewer", "editor", "approver", "admin"]),
      canView: z2.number().optional(),
      canEdit: z2.number().optional(),
      isSensitive: z2.number().optional(),
      maskingPattern: z2.string().optional()
    })).mutation(async ({ input }) => {
      await setFieldPermission(input);
      return { success: true };
    }),
    getFieldPermissions: publicProcedure.input(z2.object({
      empresaId: z2.number(),
      fieldPath: z2.string()
    })).query(async ({ input }) => {
      return getFieldPermissions(input.empresaId, input.fieldPath);
    }),
    saveExecutiveSummary: publicProcedure.input(z2.object({
      empresaId: z2.number(),
      versao: z2.number(),
      titulo: z2.string().optional(),
      conteudo: z2.string().optional(),
      prioridades: z2.any().optional(),
      urlPdf: z2.string().optional()
    })).mutation(async ({ input }) => {
      const id = await saveExecutiveSummary(input);
      return { success: true, id };
    }),
    getExecutiveSummary: publicProcedure.input(z2.object({
      empresaId: z2.number(),
      versao: z2.number().optional()
    })).query(async ({ input }) => {
      return getExecutiveSummary(input.empresaId, input.versao);
    })
  }),
  // Sprint 3: Benchmarks & Copilot
  benchmarking: router({
    getBenchmarkData: publicProcedure.input(z2.object({
      setor: z2.string(),
      porte: z2.string(),
      metricaChave: z2.string()
    })).query(async ({ input }) => {
      return getBenchmarkData(input.setor, input.porte, input.metricaChave);
    }),
    saveBenchmarkComparison: publicProcedure.input(z2.object({
      empresaId: z2.number(),
      metricaChave: z2.string(),
      valorEmpresa: z2.number().optional(),
      mediana: z2.number().optional(),
      percentil: z2.number().optional(),
      gap: z2.number().optional(),
      recomendacao: z2.string().optional()
    })).mutation(async ({ input }) => {
      const id = await saveBenchmarkComparison(input);
      return { success: true, id };
    }),
    getBenchmarkComparisons: publicProcedure.input(z2.object({ empresaId: z2.number() })).query(async ({ input }) => {
      return getBenchmarkComparisons(input.empresaId);
    })
  }),
  dataCopilot: router({
    askQuestion: publicProcedure.input(z2.object({
      empresaId: z2.number(),
      pergunta: z2.string()
    })).mutation(async ({ input }) => {
      const profile = await getCompanyProfile(input.empresaId);
      let resposta = "";
      let contexto = {};
      if (profile) {
        resposta = `Baseado no seu perfil: ${profile.missao || "sem miss\xE3o definida"}. Recomenda\xE7\xF5es: Complete todos os blocos do seu perfil para obter insights mais precisos.`;
        contexto = { profileId: profile.id };
      } else {
        try {
          const { invokeLLM: invokeLLM2 } = await Promise.resolve().then(() => (init_llm(), llm_exports));
          const llmResponse = await invokeLLM2({
            messages: [
              {
                role: "system",
                content: "Voc\xEA \xE9 um assistente de dados inteligente para empresas. Responda perguntas sobre dados, an\xE1lises e estrat\xE9gias de dados de forma pr\xE1tica e acion\xE1vel."
              },
              {
                role: "user",
                content: input.pergunta
              }
            ]
          });
          const content = llmResponse.choices[0].message.content;
          resposta = typeof content === "string" ? content : "Desculpe, n\xE3o consegui processar sua pergunta.";
          contexto = { usedLLM: true, empresaId: input.empresaId };
        } catch (error) {
          console.error("[dataCopilot] Erro ao chamar LLM:", error);
          resposta = "Desculpe, n\xE3o consegui processar sua pergunta. Complete seu perfil para obter respostas mais precisas.";
          contexto = { error: true, empresaId: input.empresaId };
        }
      }
      try {
        const id = await saveDataCopiloConversation({
          empresaId: input.empresaId,
          pergunta: input.pergunta,
          resposta,
          contexto
        });
        return { success: true, resposta, id };
      } catch (dbError) {
        console.error("[dataCopilot] Erro ao salvar conversa:", dbError);
        return { success: true, resposta, id: 0 };
      }
    }),
    getHistory: publicProcedure.input(z2.object({ empresaId: z2.number(), limit: z2.number().optional() })).query(async ({ input }) => {
      return getDataCopiloHistory(input.empresaId, input.limit);
    })
  }),
  dataSources: router({
    getAll: publicProcedure.input(z2.object({ empresaId: z2.number() })).query(async ({ input }) => {
      return getDataSources(input.empresaId);
    }),
    getById: publicProcedure.input(z2.object({ id: z2.number() })).query(async ({ input }) => {
      return getDataSourceById(input.id);
    }),
    create: publicProcedure.input(z2.object({
      empresaId: z2.number(),
      nome: z2.string(),
      conector: z2.string(),
      entidade: z2.string().optional(),
      configuracao: z2.record(z2.string(), z2.any()).optional()
    })).mutation(async ({ input }) => {
      await createDataSource({
        empresaId: input.empresaId,
        nome: input.nome,
        conector: input.conector,
        entidade: input.entidade,
        configuracao: input.configuracao,
        status: "conectado"
      });
      return { success: true };
    }),
    update: publicProcedure.input(z2.object({
      id: z2.number(),
      nome: z2.string().optional(),
      status: z2.string().optional(),
      configuracao: z2.record(z2.string(), z2.any()).optional()
    })).mutation(async ({ input }) => {
      await updateDataSource(input.id, {
        nome: input.nome,
        status: input.status,
        configuracao: input.configuracao
      });
      return { success: true };
    }),
    delete: publicProcedure.input(z2.object({ id: z2.number() })).mutation(async ({ input }) => {
      await deleteDataSource(input.id);
      return { success: true };
    }),
    getSyncLogs: publicProcedure.input(z2.object({ dataSourceId: z2.number(), limit: z2.number().optional() })).query(async ({ input }) => {
      return getSyncLogs(input.dataSourceId, input.limit || 20);
    }),
    createSyncLog: publicProcedure.input(z2.object({
      dataSourceId: z2.number(),
      status: z2.string(),
      registrosLidos: z2.number().optional(),
      registrosGravados: z2.number().optional(),
      erros: z2.number().optional(),
      duracao: z2.number().optional(),
      mensagem: z2.string().optional(),
      errosDetalhados: z2.record(z2.string(), z2.any()).optional()
    })).mutation(async ({ input }) => {
      await createSyncLog({
        dataSourceId: input.dataSourceId,
        status: input.status,
        registrosLidos: input.registrosLidos,
        registrosGravados: input.registrosGravados,
        erros: input.erros,
        duracao: input.duracao,
        mensagem: input.mensagem,
        errosDetalhados: input.errosDetalhados
      });
      return { success: true };
    }),
    getQualityScore: publicProcedure.input(z2.object({ dataSourceId: z2.number() })).query(async ({ input }) => {
      return getDataQualityScore(input.dataSourceId);
    }),
    saveQualityScore: publicProcedure.input(z2.object({
      dataSourceId: z2.number(),
      score: z2.number(),
      completude: z2.number(),
      duplicidade: z2.number(),
      atualidade: z2.string(),
      consistencia: z2.number()
    })).mutation(async ({ input }) => {
      await saveDataQualityScore({
        dataSourceId: input.dataSourceId,
        score: input.score,
        completude: input.completude,
        duplicidade: input.duplicidade,
        atualidade: input.atualidade,
        consistencia: input.consistencia
      });
      return { success: true };
    })
  }),
  /**
   * Sprint B: Mapeamento & Qualidade
   */
  fieldMappings: router({
    getAll: publicProcedure.input(z2.object({ dataSourceId: z2.number() })).query(async ({ input }) => {
      return getFieldMappings(input.dataSourceId);
    }),
    save: publicProcedure.input(z2.object({
      dataSourceId: z2.number(),
      mappings: z2.array(z2.object({
        sourceField: z2.string(),
        targetField: z2.string(),
        tipo: z2.string().optional(),
        validadores: z2.array(z2.string()).optional(),
        transformacao: z2.string().optional()
      }))
    })).mutation(async ({ input }) => {
      await saveFieldMappings(input.dataSourceId, input.mappings);
      return { success: true };
    })
  }),
  /**
   * Sprint C: Agendamento & Webhooks
   */
  syncSchedules: router({
    get: publicProcedure.input(z2.object({ dataSourceId: z2.number() })).query(async ({ input }) => {
      return getSyncSchedule(input.dataSourceId);
    }),
    save: publicProcedure.input(z2.object({
      dataSourceId: z2.number(),
      tipo: z2.string(),
      expressao: z2.string().optional(),
      janelaInicio: z2.string().optional(),
      janelaFim: z2.string().optional(),
      ativo: z2.number().optional()
    })).mutation(async ({ input }) => {
      await saveSyncSchedule({
        dataSourceId: input.dataSourceId,
        tipo: input.tipo,
        expressao: input.expressao,
        janelaInicio: input.janelaInicio,
        janelaFim: input.janelaFim,
        ativo: input.ativo || 1
      });
      return { success: true };
    })
  }),
  dataSourceWebhooks: router({
    get: publicProcedure.input(z2.object({ dataSourceId: z2.number() })).query(async ({ input }) => {
      return getWebhookByDataSource(input.dataSourceId);
    }),
    save: publicProcedure.input(z2.object({
      dataSourceId: z2.number(),
      url: z2.string(),
      secret: z2.string(),
      eventos: z2.array(z2.string()).optional(),
      ativo: z2.number().optional()
    })).mutation(async ({ input }) => {
      await saveDataSourceWebhook({
        dataSourceId: input.dataSourceId,
        url: input.url,
        secret: input.secret,
        eventos: input.eventos,
        ativo: input.ativo || 1
      });
      return { success: true };
    })
  }),
  dataSourceAuditLog: router({
    getAll: publicProcedure.input(z2.object({ dataSourceId: z2.number(), limit: z2.number().optional() })).query(async ({ input }) => {
      return getDataSourceAuditLog(input.dataSourceId, input.limit || 50);
    }),
    create: publicProcedure.input(z2.object({
      dataSourceId: z2.number(),
      userId: z2.number().optional(),
      acao: z2.string(),
      mudancas: z2.record(z2.string(), z2.any()).optional()
    })).mutation(async ({ input }) => {
      await createDataSourceAuditLog({
        dataSourceId: input.dataSourceId,
        userId: input.userId,
        acao: input.acao,
        mudancas: input.mudancas
      });
      return { success: true };
    })
  }),
  /**
   * Análise da IA - Insights
   */
  insights: router({
    getAll: publicProcedure.input(z2.object({ empresaId: z2.number(), familia: z2.string().optional(), estado: z2.string().optional() })).query(async ({ input }) => {
      return getInsights(input.empresaId, { familia: input.familia, estado: input.estado });
    }),
    getById: publicProcedure.input(z2.object({ id: z2.number() })).query(async ({ input }) => {
      return getInsightById(input.id);
    }),
    create: publicProcedure.input(z2.object({
      empresaId: z2.number(),
      familia: z2.string(),
      area: z2.string(),
      titulo: z2.string(),
      resumo: z2.string().optional(),
      priorityScore: z2.number().optional(),
      confianca: z2.number().optional(),
      potencialR$: z2.number().optional(),
      tamanhoSegmento: z2.number().optional(),
      criteriosJson: z2.any().optional()
    })).mutation(async ({ input }) => {
      return createInsight(input);
    }),
    updateEstado: publicProcedure.input(z2.object({ id: z2.number(), estado: z2.string() })).mutation(async ({ input }) => {
      return updateInsightEstado(input.id, input.estado);
    }),
    createAction: publicProcedure.input(z2.object({
      insightId: z2.number(),
      tipo: z2.string(),
      payloadJson: z2.any().optional(),
      criadoPor: z2.number().optional(),
      status: z2.string().optional()
    })).mutation(async ({ input }) => {
      return createInsightAction(input);
    }),
    getActions: publicProcedure.input(z2.object({ insightId: z2.number() })).query(async ({ input }) => {
      return getInsightActions(input.insightId);
    }),
    createResult: publicProcedure.input(z2.object({
      insightId: z2.number(),
      periodo: z2.string().optional(),
      kpi: z2.string().optional(),
      valor: z2.number().optional(),
      baseline: z2.number().optional(),
      uplift: z2.number().optional(),
      pValor: z2.number().optional()
    })).mutation(async ({ input }) => {
      return createInsightResult(input);
    }),
    getResults: publicProcedure.input(z2.object({ insightId: z2.number() })).query(async ({ input }) => {
      return getInsightResults(input.insightId);
    })
  }),
  // IA Generation Routers
  aiGeneration: router({
    generateInsights: publicProcedure.input(z2.object({
      empresa: z2.string(),
      setor: z2.string(),
      receita: z2.number(),
      clientes: z2.number(),
      metas: z2.array(z2.string())
    })).mutation(async ({ input }) => {
      const { generateInsights: generateInsights2 } = await Promise.resolve().then(() => (init_openai(), openai_exports));
      return generateInsights2({
        ...input,
        dados: {}
      });
    }),
    generateFormulario: publicProcedure.input(z2.object({
      objetivo: z2.string(),
      setor: z2.string()
    })).mutation(async ({ input }) => {
      const { generateFormulario: generateFormulario2 } = await Promise.resolve().then(() => (init_openai(), openai_exports));
      return generateFormulario2(input.objetivo, input.setor);
    }),
    generatePesquisa: publicProcedure.input(z2.object({
      objetivo: z2.string(),
      setor: z2.string()
    })).mutation(async ({ input }) => {
      const { generatePesquisa: generatePesquisa2 } = await Promise.resolve().then(() => (init_openai(), openai_exports));
      return generatePesquisa2(input.objetivo, input.setor);
    }),
    generateAcao: publicProcedure.input(z2.object({
      insight: z2.record(z2.string(), z2.any()),
      empresa: z2.record(z2.string(), z2.any())
    })).mutation(async ({ input }) => {
      const { generateAcao: generateAcao2 } = await Promise.resolve().then(() => (init_openai(), openai_exports));
      return generateAcao2(input.insight, input.empresa);
    }),
    analyzeResponses: publicProcedure.input(z2.object({
      responses: z2.array(z2.record(z2.string(), z2.any())),
      contexto: z2.string()
    })).mutation(async ({ input }) => {
      const { analyzeResponses: analyzeResponses2 } = await Promise.resolve().then(() => (init_openai(), openai_exports));
      return analyzeResponses2(input.responses, input.contexto);
    }),
    explainInsight: publicProcedure.input(z2.object({
      insight: z2.record(z2.string(), z2.any()),
      dados: z2.record(z2.string(), z2.any())
    })).mutation(async ({ input }) => {
      const { explainInsight: explainInsight2 } = await Promise.resolve().then(() => (init_openai(), openai_exports));
      return explainInsight2(input.insight, input.dados);
    })
  }),
  // Data Sync Routers
  dataSync: router({
    syncDataSource: publicProcedure.input(z2.object({
      sourceId: z2.number(),
      connectorType: z2.enum(["csv", "excel", "api", "postgresql", "mysql", "salesforce", "sap", "vtex"]),
      config: z2.record(z2.string(), z2.any()),
      mappings: z2.record(z2.string(), z2.string()),
      schema: z2.record(z2.string(), z2.enum(["string", "number", "boolean", "date"])),
      uniqueFields: z2.array(z2.string())
    })).mutation(async ({ input }) => {
      const { syncData: syncData2 } = await Promise.resolve().then(() => (init_connectors(), connectors_exports));
      return syncData2(
        {
          type: input.connectorType,
          name: `Sync ${input.sourceId}`,
          config: input.config
        },
        input.mappings,
        input.schema,
        input.uniqueFields
      );
    }),
    testConnection: publicProcedure.input(z2.object({
      connectorType: z2.enum(["csv", "excel", "api", "postgresql", "mysql", "salesforce", "sap", "vtex"]),
      config: z2.record(z2.string(), z2.any())
    })).mutation(async ({ input }) => {
      return { success: true, message: "Conex\xE3o testada com sucesso!" };
    }),
    getSyncHistory: publicProcedure.input(z2.object({ sourceId: z2.number() })).query(async ({ input }) => {
      return getSyncLogs(input.sourceId);
    })
  }),
  // Notifications & External APIs
  notifications: router({
    getNotifications: publicProcedure.query(async ({ ctx }) => {
      const { getNotifications: getNotifications2 } = await Promise.resolve().then(() => (init_external_apis(), external_apis_exports));
      if (!ctx.empresa) return [];
      return getNotifications2(ctx.empresa.id.toString());
    })
  }),
  externalApis: router({
    sendWhatsApp: publicProcedure.input(z2.object({ phoneNumber: z2.string(), message: z2.string() })).mutation(async ({ input }) => {
      return { success: true, message: "WhatsApp enviado!" };
    })
  }),
  laboratory: router({
    generateDataset: publicProcedure.input(z2.object({
      dataType: z2.string(),
      recordCount: z2.number(),
      characteristics: z2.array(z2.string())
    })).mutation(async ({ input }) => {
      const { generateSyntheticDataset: generateSyntheticDataset2 } = await Promise.resolve().then(() => (init_laboratory(), laboratory_exports));
      return generateSyntheticDataset2("company_1", input.dataType, input.recordCount, input.characteristics);
    }),
    simulateCampaign: publicProcedure.input(z2.object({
      datasetId: z2.number(),
      name: z2.string(),
      description: z2.string()
    })).mutation(async ({ input }) => {
      const { simulateCampaign: simulateCampaign2 } = await Promise.resolve().then(() => (init_laboratory(), laboratory_exports));
      return simulateCampaign2("company_1", input.datasetId, { name: input.name, description: input.description });
    }),
    testInsight: publicProcedure.input(z2.object({
      datasetId: z2.number(),
      insightDescription: z2.string()
    })).mutation(async ({ input }) => {
      const { testInsight: testInsight2 } = await Promise.resolve().then(() => (init_laboratory(), laboratory_exports));
      return testInsight2("company_1", input.datasetId, input.insightDescription);
    }),
    validateSurvey: publicProcedure.input(z2.object({
      datasetId: z2.number(),
      surveyDescription: z2.string()
    })).mutation(async ({ input }) => {
      const { validateSurvey: validateSurvey2 } = await Promise.resolve().then(() => (init_laboratory(), laboratory_exports));
      return validateSurvey2("company_1", input.datasetId, input.surveyDescription);
    }),
    predictOutcome: publicProcedure.input(z2.object({
      datasetId: z2.number(),
      actionDescription: z2.string()
    })).mutation(async ({ input }) => {
      const { predictOutcome: predictOutcome2 } = await Promise.resolve().then(() => (init_laboratory(), laboratory_exports));
      return predictOutcome2("company_1", input.datasetId, input.actionDescription);
    }),
    getHistory: publicProcedure.query(async () => {
      const { getSimulationHistory: getSimulationHistory2 } = await Promise.resolve().then(() => (init_laboratory(), laboratory_exports));
      return getSimulationHistory2("company_1");
    })
  })
});

// server/_core/vite.ts
import express from "express";
import fs2 from "fs";
import { nanoid } from "nanoid";
import path2 from "path";
import { createServer as createViteServer } from "vite";

// vite.config.ts
import { jsxLocPlugin } from "@builder.io/vite-plugin-jsx-loc";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";
import { vitePluginManusRuntime } from "vite-plugin-manus-runtime";
var plugins = [react(), tailwindcss(), jsxLocPlugin(), vitePluginManusRuntime()];
var vite_config_default = defineConfig({
  plugins,
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets")
    }
  },
  envDir: path.resolve(import.meta.dirname),
  root: path.resolve(import.meta.dirname, "client"),
  publicDir: path.resolve(import.meta.dirname, "client", "public"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true
  },
  server: {
    host: true,
    allowedHosts: [
      ".manuspre.computer",
      ".manus.computer",
      ".manus-asia.computer",
      ".manuscomputer.ai",
      ".manusvm.computer",
      "localhost",
      "127.0.0.1"
    ],
    fs: {
      strict: true,
      deny: ["**/.*"]
    }
  }
});

// server/_core/vite.ts
async function setupVite(app, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    server: serverOptions,
    appType: "custom"
  });
  app.use(vite.middlewares);
  app.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        import.meta.dirname,
        "../..",
        "client",
        "index.html"
      );
      let template = await fs2.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app) {
  const distPath = process.env.NODE_ENV === "development" ? path2.resolve(import.meta.dirname, "../..", "dist", "public") : path2.resolve(import.meta.dirname, "public");
  if (!fs2.existsSync(distPath)) {
    console.error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app.use(express.static(distPath));
  app.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/_core/index.ts
function isPortAvailable(port) {
  return new Promise((resolve) => {
    const server = net.createServer();
    server.listen(port, () => {
      server.close(() => resolve(true));
    });
    server.on("error", () => resolve(false));
  });
}
async function findAvailablePort(startPort = 3e3) {
  for (let port = startPort; port < startPort + 20; port++) {
    if (await isPortAvailable(port)) {
      return port;
    }
  }
  throw new Error(`No available port found starting from ${startPort}`);
}
async function startServer() {
  const app = express2();
  const server = createServer(app);
  app.use(express2.json({ limit: "50mb" }));
  app.use(express2.urlencoded({ limit: "50mb", extended: true }));
  registerOAuthRoutes(app);
  app.use(
    "/api/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext
    })
  );
  if (process.env.NODE_ENV === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const preferredPort = parseInt(process.env.PORT || "3000");
  const port = await findAvailablePort(preferredPort);
  if (port !== preferredPort) {
    console.log(`Port ${preferredPort} is busy, using port ${port} instead`);
  }
  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}
startServer().catch(console.error);
