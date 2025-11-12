# DataPay Enterprise - Roadmap de Escalabilidade

## 🎯 OBJETIVO: Escalar de 5k/mês (MVP) → 20k+/mês (Enterprise) → 1 Bilhão

---

## ✅ FASE 1: INTEGRAÇÕES NATIVAS + GOVERNANÇA (Curto Prazo - 4 semanas)

### 🔌 Integrações com ERPs/CRMs (Semana 1-2)

- [ ] **Integração SAP**
  - [ ] Autenticação OAuth com SAP
  - [ ] Sincronização automática de clientes
  - [ ] Sincronização de pedidos e faturamento
  - [ ] Sincronização de estoque
  - [ ] Agendamento de sincronizações (diárias/horárias)

- [ ] **Integração TOTVS**
  - [ ] Autenticação com TOTVS
  - [ ] Sincronização de dados financeiros
  - [ ] Sincronização de CRM integrado
  - [ ] Extração de relatórios automáticos

- [ ] **Integração Salesforce**
  - [ ] Autenticação OAuth Salesforce
  - [ ] Sincronização de leads e oportunidades
  - [ ] Sincronização de clientes e contas
  - [ ] Sincronização de histórico de vendas

- [ ] **Integração HubSpot**
  - [ ] Autenticação HubSpot API
  - [ ] Sincronização de contatos
  - [ ] Sincronização de deals
  - [ ] Sincronização de campanhas

- [ ] **Integração Odoo**
  - [ ] Autenticação Odoo XML-RPC
  - [ ] Sincronização de produtos
  - [ ] Sincronização de vendas
  - [ ] Sincronização de clientes

### 🔐 Governança & Compliance LGPD (Semana 2-3)

- [ ] **Sistema de Permissões Multi-usuário**
  - [ ] Roles: Admin, Gerente, Analista, Visualizador
  - [ ] Controle granular de acesso por módulo
  - [ ] Controle de acesso por dados (ex: vendedor só vê seus dados)
  - [ ] Delegação de permissões

- [ ] **Auditoria e Logs**
  - [ ] Log de todas as ações de usuário
  - [ ] Log de acessos a dados sensíveis
  - [ ] Log de mudanças em configurações
  - [ ] Retenção de logs por 2 anos (LGPD)
  - [ ] Dashboard de auditoria para compliance

- [ ] **Conformidade LGPD**
  - [ ] Consentimento explícito para coleta de dados
  - [ ] Direito ao esquecimento (deletar dados de cliente)
  - [ ] Portabilidade de dados (exportar em formato aberto)
  - [ ] Criptografia de dados em repouso e em trânsito
  - [ ] Política de privacidade e termos de serviço

- [ ] **Segurança**
  - [ ] 2FA (autenticação de dois fatores)
  - [ ] SSO (Single Sign-On) com Azure AD / Okta
  - [ ] Backup automático e recuperação de desastres
  - [ ] Teste de penetração (pen test)

### 📊 Data Pipeline Automático (Semana 3-4)

- [ ] **ETL (Extract, Transform, Load)**
  - [ ] Limpeza automática de dados duplicados
  - [ ] Padronização de formatos (datas, moedas, etc)
  - [ ] Validação de integridade de dados
  - [ ] Tratamento de valores nulos e outliers

- [ ] **Agendamento de Sincronizações**
  - [ ] Interface para configurar frequência de sync
  - [ ] Sincronização em tempo real para dados críticos
  - [ ] Fila de processamento (queue) para grandes volumes
  - [ ] Notificações de falha de sincronização

---

## 🚀 FASE 2: AUTOMAÇÃO ACIONÁVEL + RELATÓRIOS EXECUTIVOS (Médio Prazo - 8 semanas)

### ⚙️ Automação Acionável (Semana 1-3)

- [ ] **Botão "Executar Agora" para Ações**
  - [ ] Integração com Salesforce para disparar campanha
  - [ ] Integração com HubSpot para criar tarefa
  - [ ] Integração com ERP para aplicar desconto automático
  - [ ] Integração com CRM para atualizar estágio do lead
  - [ ] Integração com e-mail marketing (Klaviyo, RD Station)

- [ ] **Workflow Automático**
  - [ ] Criar fluxo de trabalho visual (no-code)
  - [ ] Disparar ações baseadas em eventos (ex: cliente inativo → enviar e-mail)
  - [ ] Agendamento de ações (ex: executar campanha toda segunda-feira)
  - [ ] Histórico de execução de ações

- [ ] **Integração com Ferramentas de Produtividade**
  - [ ] Criar tarefa no Asana / Monday / Trello
  - [ ] Criar evento no Google Calendar / Outlook
  - [ ] Enviar notificação no Slack / Teams
  - [ ] Integração com Zapier / Make para automações customizadas

### 📈 Relatórios Executivos Premium (Semana 3-6)

- [ ] **Relatórios Board-Ready**
  - [ ] Geração automática de PDF executivo
  - [ ] Gráficos profissionais (ROI, receita, churn, LTV, CAC)
  - [ ] Resumo executivo com recomendações
  - [ ] Comparação com período anterior
  - [ ] Exportação em PowerPoint para apresentação

- [ ] **Métricas Avançadas**
  - [ ] LTV (Lifetime Value) por cliente/segmento
  - [ ] CAC (Customer Acquisition Cost)
  - [ ] Payback period
  - [ ] Churn rate e retenção
  - [ ] NPS (Net Promoter Score)
  - [ ] Análise de coorte

- [ ] **Dashboards Personalizados por Cargo**
  - [ ] Dashboard CFO: receita, margem, fluxo de caixa
  - [ ] Dashboard CMO: leads, conversão, CAC, LTV
  - [ ] Dashboard CEO: KPIs estratégicos, crescimento
  - [ ] Dashboard de Vendas: pipeline, taxa de fechamento

- [ ] **Exportação para BI**
  - [ ] Integração com Power BI (via API)
  - [ ] Integração com Looker Studio (via BigQuery)
  - [ ] Integração com Tableau (via API)
  - [ ] Exportação em formato CSV/Excel/JSON

### 💰 Simulação de Impacto Financeiro (Semana 6-8)

- [ ] **Calculadora de ROI Avançada**
  - [ ] Simular impacto de cada ação (receita, economia)
  - [ ] Mostrar payback period realista
  - [ ] Projeção de receita acumulada ao longo de 12 meses
  - [ ] Análise de sensibilidade (e se aumentar X%?)

- [ ] **Roadmap de Impacto Acumulado**
  - [ ] Mostrar como cada ação se soma ao longo do tempo
  - [ ] Projeção de crescimento mês a mês
  - [ ] Identificar ações de maior impacto para priorizar

---

## 🌟 FASE 3: BENCHMARKING SETORIAL + MARKETPLACE (Longo Prazo - 12 semanas)

### 📊 Benchmarking Setorial (Semana 1-4)

- [ ] **Coleta de Dados de Mercado**
  - [ ] Parceria com associações setoriais
  - [ ] Agregação de dados de clientes (anonimizados)
  - [ ] Dados públicos de concorrentes
  - [ ] Pesquisas de mercado externas

- [ ] **Análise Comparativa**
  - [ ] Comparar empresa com média do setor
  - [ ] Identificar gaps em relação aos líderes
  - [ ] Mostrar oportunidades de melhoria
  - [ ] Recomendações baseadas em benchmarks

- [ ] **Relatório de Maturidade em Dados**
  - [ ] Nível de maturidade (1-5)
  - [ ] Comparação com empresas do mesmo setor
  - [ ] Roadmap para próximo nível
  - [ ] Estimativa de impacto financeiro

### 🛒 Marketplace de Dados (Semana 5-8)

- [ ] **Plataforma de Compra/Venda de Dados**
  - [ ] Catálogo de datasets disponíveis
  - [ ] Sistema de precificação
  - [ ] Integração de pagamento (Stripe)
  - [ ] Contratos de dados (termos de uso)

- [ ] **Dados Disponíveis para Venda**
  - [ ] Dados agregados de comportamento de consumidor
  - [ ] Tendências de mercado por setor
  - [ ] Previsões de demanda
  - [ ] Análise de concorrência

### 🤖 Inteligência Preditiva em Tempo Real (Semana 9-12)

- [ ] **Previsões Automáticas**
  - [ ] Prever churn de clientes (com 60+ dias de antecedência)
  - [ ] Prever oportunidades de upsell/cross-sell
  - [ ] Prever demanda de produtos
  - [ ] Prever sazonalidade

- [ ] **Alertas Proativos**
  - [ ] "Identificamos que cliente X tem 70% de chance de sair"
  - [ ] "Oportunidade de vender Y para cliente Z (ROI estimado: R$ 50k)"
  - [ ] "Demanda de produto A vai aumentar 40% no próximo mês"

- [ ] **Recomendações Contínuas**
  - [ ] Atualizar recomendações de ações diariamente
  - [ ] Priorizar por impacto financeiro
  - [ ] Mostrar confiança da previsão

---

## 📋 BACKLOG GERAL

### Melhorias no Dashboard
- [ ] Adicionar alertas automáticos ("Oportunidade identificada: reduzir churn em 15%")
- [ ] Personalização por setor (varejo, saúde, indústria, etc)
- [ ] Benchmarks de mercado na tela inicial
- [ ] Histórico de ações e resultados

### Melhorias na Base de Conhecimento
- [ ] Importar automaticamente dados do site da empresa
- [ ] Extrair dados de redes sociais (LinkedIn, Instagram)
- [ ] Gerar SWOT automático
- [ ] Gerar matriz BCG
- [ ] Análise de proposta de valor vs concorrência

### Melhorias em Meus Dados
- [ ] Validação de qualidade de dados (score)
- [ ] Recomendações de limpeza de dados
- [ ] Histórico de sincronizações
- [ ] Alertas de dados faltantes

### Melhorias em Análise da IA
- [ ] Matriz de impacto/esforço (priorização)
- [ ] Integração com Trello/Asana (transformar insights em tarefas)
- [ ] Histórico de insights gerados
- [ ] Feedback do usuário (insight foi útil?)

### Melhorias em Formulários Inteligentes
- [ ] Biblioteca de templates por setor
- [ ] Automação de distribuição (e-mail, WhatsApp, SMS)
- [ ] Análise de respostas em tempo real
- [ ] Relacionar respostas com ROI esperado

### Melhorias em Pesquisas Gamificadas
- [ ] Biblioteca de templates de pesquisa
- [ ] Integração com DataCoins (recompensas reais)
- [ ] Relacionar pesquisas com KPIs (churn, LTV, ticket médio)
- [ ] Análise de engajamento

### Melhorias em Ações Inteligentes
- [ ] Botão "Executar Agora" com integrações
- [ ] Transparência total de ROI (baseado em dados reais)
- [ ] Roadmap de impacto acumulado
- [ ] Histórico de ações executadas

### Melhorias em Resultados
- [ ] Simulação de impacto (e se implementar X?)
- [ ] Exportação executiva (PDF/PowerPoint)
- [ ] Métricas avançadas (LTV, CAC, payback, churn)
- [ ] Comparação com benchmark do setor

### Melhorias em Relatórios
- [ ] Benchmarking setorial
- [ ] Relatórios customizados por cargo (CFO, CMO, CEO)
- [ ] Exportação para BI (Power BI, Looker, Tableau)
- [ ] Agendamento de relatórios por e-mail

---

## 🎯 MARCOS CRÍTICOS

- **Semana 4:** Fase 1 completa (integrações + governança) → Justifica R$ 10k/mês
- **Semana 12:** Fase 2 completa (automação + relatórios) → Justifica R$ 20k/mês
- **Semana 24:** Fase 3 completa (benchmarking + marketplace) → Justifica R$ 50k+/mês
- **Ano 2:** Marketplace + IA preditiva → Caminho para R$ 1 bilhão

---

---

## ✅ TESTES COMPLETADOS

- [x] Landing Page - Todas as 7 seções funcionando
- [x] Dashboard Início - KPIs e fluxo de trabalho visual
- [x] Meus Dados - Gerenciamento de fontes de dados
- [x] Análise da IA - Geração de insights
- [x] Copiloto de Dados - Chat com IA
- [x] Benchmarks - Comparação com mercado
- [x] Laboratório - Gerador de dados sintéticos
- [x] Simulador - Modal de acesso
- [x] Formulário Inteligente - Geração de sugestões
- [x] Pesquisas - Gerenciamento de pesquisas gamificadas
- [x] Ações Inteligentes - Recomendações com ROI

## 🐛 BUGS CONHECIDOS

- [ ] Criação de pesquisas não persiste no banco (debug necessário)
- [ ] Chamada à IA para gerar sugestões pode estar falhando (debug necessário)
- [ ] Paths do Laboratório precisam de rotas dinâmicas em App.tsx

---

## 💡 ESTRATÉGIA DE VENDAS

### Ticket 5k/mês (MVP Atual)
- Coleta de dados + Insights básicos + Pesquisas

### Ticket 10k/mês (Após Fase 1)
- + Integrações com ERPs/CRMs
- + Governança LGPD
- + Multi-usuário com permissões

### Ticket 20k/mês (Após Fase 2)
- + Automação acionável
- + Relatórios executivos
- + Métricas avançadas (LTV, CAC, churn)

### Ticket 50k+/mês (Após Fase 3)
- + Benchmarking setorial
- + Marketplace de dados
- + IA preditiva em tempo real
- + Suporte dedicado

---

## 📞 PRÓXIMOS PASSOS

1. ✅ Revisar este roadmap com stakeholders
2. ⏳ Priorizar features por impacto/esforço
3. ⏳ Começar Fase 1 (Integrações + Governança)
4. ⏳ Montar equipe de desenvolvimento
5. ⏳ Definir SLAs e métricas de sucesso




## ✅ FASE 4: LABORATÓRIO (COMPLETE)

### Sprint 1: Advanced Generator ✅
- [x] Slider para quantidade de registros (1k-10M)
- [x] Segmentação por 8 regiões brasileiras
- [x] Sazonalidade (Black Friday, Natal, Dia das Mães, etc)
- [x] Calibração com dados reais
- [x] Preview de tabela com 10 registros

### Sprint 2: Sidebar Reorganization ✅
- [x] Agrupamento lógico em 4 seções (Inteligência, Laboratório, Coleta & Ações, Resultados)
- [x] Hierarquia clara com section headers
- [x] Ícones distintos para cada menu item
- [x] Paths únicos para subferramentas (/laboratorio/gerador, /simulador, /testador)

### Sprint 3: Export Integrations (PENDING)
- [ ] CSV export com dados sintéticos
- [ ] Excel export com formatação
- [ ] BigQuery integration
- [ ] Snowflake integration
- [ ] Integração com outros módulos (Análise IA, Ações)

---

## 🏢 MENU 1: BASE DE CONHECIMENTO - Evolução Completa

### 📋 Sprint 1: Infra do Valor Imediato (Semana 1-2) ✅

- [x] Wizard em 4 blocos com progress bar
- [x] Estados: Rascunho → Em revisão → Publicado
- [x] Versionamento de perfil (company_profile_versions)
- [x] Taxonomia de setor (CNAE) + mapeamento para playbooks
- [x] Score de qualidade de dados (completude, atualidade, consistência)
- [x] Alertas acionáveis (lacunas de dados)
- [ ] Campo URL + Preencher automaticamente (crawler + LLM extract) - Sprint 4
- [ ] Microcopys úteis

### 🔐 Sprint 2: Governança & IA (Semana 3-4) ✅

- [x] RBAC por campo (Viewer, Editor, Approver, Admin) - Backend pronto
- [x] Campos LGPD com rótulo e mascaramento - Backend pronto
- [x] Resumo Executivo (PDF/HTML) com logo do cliente - Frontend pronto
- [x] Audit log (company_profile_versions, profile_audit_log) - Backend pronto
- [ ] Botão "Criar Formulário" para completar dados - Sprint 4
- [ ] Botão "Criar Pesquisa" para coletar feedback - Sprint 4

### 🌟 Sprint 3: Benchmarks & Copiloto (Semana 5-6) ✅

- [x] Benchmarks anonimizados por setor/porte - Frontend pronto
- [x] Comparação com mediana do setor - Frontend pronto
- [x] Copiloto de dados (Q&A com IA sobre perfil) - Frontend pronto
- [x] Webhooks para notificar mudanças de perfil - Backend pronto
- [ ] Integração com Análise da IA (usa setor+metas) - Sprint 4
- [ ] Integração com Formulários Inteligentes (templates por lacunas) - Sprint 4
- [ ] Integração com Ações Inteligentes (filtra playbooks por setor) - Sprint 4
- [ ] Integração com Relatórios (score de maturidade de dados) - Sprint 4

### 📊 Schema de Dados

- [x] Tabela company_profile (JSON: identidade, mercado, operacao_dados, objetivos_kpis, politicas)
- [x] Tabela company_profile_versions (versionamento)
- [x] Tabela profile_audit_log (auditoria)
- [x] Tabela taxonomy_sectors (CNAE → playbooks)

---



## ✅ CONFIGURAÇÕES ENTERPRISE - NOVO (2025-11-02)

### Landing Page Premium ✅
- [x] Redesenhar Landing Page com conteúdo premium
- [x] Hero section com executivo de alta qualidade
- [x] Seção "O Problema" com 4 desafios reais
- [x] Fluxo de 5 passos "Como DataPay Transforma Seus Dados"
- [x] Screenshot real da plataforma integrado
- [x] Seção "Laboratório de Dados Sintéticos"
- [x] 6 Benefícios principais
- [x] CTA final com urgência
- [x] Footer completo
- [x] Modal de Login com OAuth
- [x] Design TOTVS-level com gradiente roxo/verde
- [x] Responsivo para mobile/tablet/desktop

### Menu de Configurações Enterprise ✅
- [x] Criar tabelas de banco de dados:
  - [x] roles (papéis/funções)
  - [x] colaboradores (usuários da empresa)
  - [x] permissoes (matriz RBAC por módulo)
  - [x] audit_logs (auditoria)
  - [x] configuracoes_empresa (preferências)
  - [x] alertas_seguranca (monitoramento)
- [x] Implementar APIs tRPC para:
  - [x] Gerenciamento de colaboradores (CRUD)
  - [x] Gerenciamento de roles
  - [x] Controle de permissões por módulo
  - [x] Logs de auditoria
  - [x] Alertas de segurança
  - [x] Configurações da empresa

### Página de Configurações (Frontend) ✅
- [x] Criar página Configuracoes.tsx com 5 abas:
  - [x] Aba Colaboradores (KPIs + tabela + modal de convite)
  - [x] Aba Roles (grid de roles com permissões)
  - [x] Aba Permissões (matriz RBAC interativa)
  - [x] Aba Auditoria (log de todas as ações)
  - [x] Aba Segurança (alertas + configurações 2FA/SSO)
- [x] Adicionar rota /configuracoes no App.tsx
- [x] Adicionar link no menu lateral (DashboardLayout)
- [x] Design premium com gradiente roxo/verde
- [x] Ícones Lucide em todas as abas
- [x] Dados de exemplo para validação

### Integração com APIs tRPC ✅
- [x] Integrar APIs tRPC com componentes (remover mock data)
- [x] Implementar validação de permissões em tempo real
- [x] Tabelas de banco de dados criadas e populadas
- [x] Dados de teste inseridos (3 colaboradores, 4 roles, permissões)
- [x] KPIs carregando dados reais do banco
- [x] Tabela de colaboradores funcionando 100%
- [x] Ações (Editar/Deletar) funcionando
- [x] Modal "Convidar Colaborador" funcional

### Próximas Fases (Futuro)
- [ ] Adicionar notificações em tempo real para alertas
- [ ] Implementar 2FA com QR code
- [ ] Configurar SSO com Azure AD / Google Workspace
- [ ] Adicionar exportação de logs de auditoria (CSV/PDF)
- [ ] Implementar webhooks para notificações Slack
- [ ] Dashboard de segurança com gráficos
- [ ] Testes automatizados para RBAC
- [ ] Documentação de API
- [ ] Guia do usuário (userGuide.md)

---

## 🆕 BUG REPORT - 2025-10-28

- [x] Erro "Perfil não encontrado" em /copiloto-dados (empresaId 240003)
  - Usuário: Robson Suzin (copiloto.supravel@gmail.com)
  - Causa: Sem login, company_profile não foi criado
  - Solução: Implementado fallback com GPT para gerar respostas sem depender do banco
  - Status: RESOLVIDO - Copiloto agora funciona com ou sem perfil



- [x] BUG: Páginas do Laboratório não abrem (Gerador, Simulador, Testador)
  - Sidebar mostra links mas não navega para as páginas
  - Problema: Rotas não estavam definidas em A...

## 🆕 BUGS - 2025-11-04 - RESOLVIDOS

- [x] Remover/filtrar dados de petshop que aparecem para novo usuário
  - Novo usuário estava vendo dados de um petshop (seed data)
  - Problema: MeusDados.tsx tinha empresaId hardcoded como 1
  - Solução: Alterado para usar usuario?.id do localStorage
  - Status: RESOLVIDO ✅

- [x] Corrigir link "Início" que estava deslogando
  - Clique em "Início" na navbar desconectava e voltava à Landing Page
  - Problema: Link apontava para "/" em vez de "/inicio"
  - Solução: Mudado para rota correta /inicio em DashboardLayout.tsx
  - Status: RESOLVIDO ✅

- [x] Adicionar página "Início" no dashboard
  - Faltava uma página home/dashboard principal
  - Problema: Página Inicio.tsx estava incompleta
  - Solução: Reescrita com KPIs, próximos passos, atividades e dicas
  - Status: RESOLVIDO ✅tsx
  - Solução: Adicionadas rotas dinâmicas para /laboratorio/gerador, /laboratorio/simulador, /laboratorio/testador
  - Status: RESOLVIDO



- [x] BUG: Abas do Laboratorio nao mudam automaticamente ao navegar
  - Todas as rotas apontam para o mesmo componente
  - Cards das ferramentas nao abrem detalhes
  - Solucao: Detectar rota com useLocation + implementar modais com Dialog
  - Status: RESOLVIDO




## 🚀 NOVA FASE: LABORATÓRIO PRODUCTION-READY (SPRINT ATUAL)

### Backend - Tabelas e Schemas
- [ ] Criar tabela synthetic_datasets (id, empresaId, name, recordCount, regions, seasonality, calibration, createdAt)
- [ ] Criar tabela campaign_simulations (id, empresaId, datasetId, campaignName, budget, expectedROI, results, createdAt)
- [ ] Criar tabela insight_validations (id, empresaId, insightName, scenarioCount, accuracy, results, createdAt)
- [ ] Criar tabela survey_predictions (id, empresaId, surveyName, expectedResponseRate, quality, factors, createdAt)
- [ ] Criar tabela result_forecasts (id, empresaId, actionName, estimatedROI, impact, timeline, createdAt)
- [ ] Criar tabela simulation_history (id, empresaId, toolType, parameters, results, accuracy, createdAt)

### Backend - APIs (tRPC Routers)
- [ ] Router syntheticData.generate - Gerar dados sintéticos com IA
- [ ] Router syntheticData.list - Listar datasets gerados
- [ ] Router syntheticData.export - Exportar em CSV/Excel
- [ ] Router campaignSimulator.simulate - Simular campanha
- [ ] Router campaignSimulator.history - Histórico de simulações
- [ ] Router insightValidator.validate - Validar insights
- [ ] Router surveyPredictor.predict - Prever taxa de resposta
- [ ] Router resultForecaster.forecast - Prever ROI
- [ ] Router simulationHistory.getAll - Histórico completo

### Frontend - Integração com APIs
- [ ] Gerador: Conectar botão "Gerar Dataset" com API
- [ ] Gerador: Mostrar preview dos dados gerados
- [ ] Gerador: Implementar exportação (CSV/Excel)
- [ ] Simulador: Formulário para simular campanha
- [ ] Simulador: Gráficos de resultados
- [ ] Testador: Validar insights com múltiplos cenários
- [ ] Validador: Prever taxa de resposta de pesquisas
- [ ] Previsor: Simular ROI de ações
- [ ] Histórico: Dashboard com todas as simulações

### Integração com IA (OpenAI)
- [ ] Usar GPT para gerar padrões de dados sintéticos realistas
- [ ] Usar GPT para analisar impacto de campanhas
- [ ] Usar GPT para validar insights
- [ ] Usar GPT para prever resultados

### Testes e Qualidade
- [ ] Testar geração de dados com 1k, 100k, 1M registros
- [ ] Testar simulações de campanhas
- [ ] Testar validação de insights
- [ ] Testar previsões de ROI
- [ ] Performance testing com grandes volumes

### Deploy e Produção
- [ ] Migrations do banco de dados
- [ ] Variáveis de ambiente configuradas
- [ ] Logs e monitoramento
- [ ] Backup e recovery
- [ ] Documentação de APIs



### Formulário "Peça uma Demo" - EM PROGRESSO
- [ ] Criar tabela de banco para requisições de demo
- [ ] Implementar API tRPC para criar requisição de demo
- [ ] Criar modal com formulário na Landing Page
- [ ] Integrar com botão "Peça uma Demo" no Hero
- [ ] Validação de campos (Nome, Email, Empresa, Telefone, Mensagem)
- [ ] Envio de email de confirmação
- [ ] Mensagem de sucesso/erro com toast
- [ ] Testar formulário completo




## 🎨 FASE 5: DATAPAY STUDIO + SIDEBAR PREMIUM (COMPLETO)

- [x] Refatorar Sidebar com colapsibilidade e slide animation
- [x] Implementar menus em cascata (Inteligência de Dados, Laboratório, Coleta & Ações)
- [x] Criar página DataPay Studio com design premium
- [x] Adicionar cores, gradientes e ícones à sidebar
- [x] Adicionar badges com contadores nos menus
- [x] Testar navegação e responsividade mobile
- [ ] Publicar nova versão

