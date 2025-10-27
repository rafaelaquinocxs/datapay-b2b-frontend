# DataPay Enterprise - TODO

## ✅ Concluído

- [x] Tela de Início com onboarding
- [x] Tela Meus Dados (conectar fontes)
- [x] Tela Análise da IA (insights + gaps)
- [x] Tela Pesquisas (gamificadas)
- [x] Tela Ações Inteligentes
- [x] Tela Resultados (ROI)
- [x] Menu lateral com navegação
- [x] Tema roxo personalizado

## 🚧 Em Desenvolvimento

- [x] Redirecionar página inicial para o diagnóstico
- [x] Adicionar banco de dados (MySQL via Drizzle ORM)
- [x] Salvar respostas do diagnóstico no banco
- [x] Salvar dados das empresas no banco
- [x] Sistema de autenticação básico (Manus OAuth)
- [x] APIs tRPC para diagnóstico

## ✅ Concluído Recentemente

- [x] Módulo de Diagnóstico de Maturidade em Dados
  - [x] Página inicial do diagnóstico
  - [x] Questionário interativo (5 dimensões, 20 perguntas)
  - [x] Calculadora de ROI
  - [x] Relatório visual com gráficos
  - [ ] Exportação de relatório em PDF

## 📋 Backlog

- [ ] Integração com backend real
- [ ] Sistema de autenticação
- [ ] Conectores de APIs (TOTVS, SAP, Salesforce, etc.)
- [ ] Dashboard de administração



## 📊 Relatório Power BI / Looker Studio

- [x] Criar especificação do relatório interativo
- [x] Gerar script SQL para extração de dados
- [x] Criar guia de configuração do Looker Studio
- [ ] Desenvolver template visual do dashboard (mockup)



## 📈 Implementação de Relatórios no Dashboard

- [x] Criar página de Relatórios no dashboard
- [x] Adicionar iframe do Looker Studio
- [x] Criar API para exportar dados dos diagnósticos
- [x] Adicionar botão de exportação de dados (CSV)
- [x] Adicionar item Relatórios no menu lateral
- [x] Exibir estatísticas rápidas na página de relatórios
- [x] Criar tabela de dados brutos
- [x] Adicionar painel de configuração do banco




## 🔐 Sistema de Autenticação Completo

- [x] Página de Login com email e senha
- [x] Página de Registro de nova conta
- [x] APIs de autenticação (login, registro)
- [x] Hash de senha com bcryptjs
- [x] Geração de token JWT
- [ ] Recuperação de senha (email)
- [ ] Página de Perfil do usuário
- [ ] Gestão de conta (editar dados, trocar senha)
- [ ] Proteção de rotas (middleware de autenticação)

## 💳 Gateway de Pagamento

- [ ] Integração com Stripe
- [ ] Página de Pricing com 3 planos (Starter, Growth, Scale)
- [ ] Checkout de assinatura
- [ ] Painel de cobrança (faturas, histórico)
- [ ] Webhook para atualizar status de assinatura
- [ ] Cancelamento e upgrade de planos

## 📱 Pesquisas via Link Externo (Mobile-First)

- [ ] Criar página pública de pesquisa (sem login)
- [ ] Design mobile-first responsivo
- [ ] Link compartilhável único por pesquisa
- [ ] Coleta de respostas e salvamento no banco
- [ ] Sistema de gamificação (pontos, badges)
- [ ] Página de obrigado após envio
- [ ] Dashboard para visualizar respostas

## 📊 Melhorias no Relatório

- [ ] Remover dependência do Looker Studio
- [ ] Implementar gráficos nativos (Recharts/Chart.js)
- [ ] Conectar com dados reais do banco
- [ ] Exportação de relatório em PDF
- [ ] Filtros avançados (data, empresa, score)

## 🏢 Multi-tenancy

- [ ] Isolamento de dados por empresa/tenant
- [ ] Cada usuário vê apenas seus dados
- [ ] Sistema de permissões (admin, usuário)
- [ ] Seletor de empresa (para usuários com múltiplas empresas)

## 🌐 Landing Page de Vendas

- [ ] Hero section com proposta de valor
- [ ] Seção de benefícios
- [ ] Seção de como funciona
- [ ] Pricing com CTAs
- [ ] Depoimentos/cases de sucesso
- [ ] Footer com links
- [ ] Botão "Começar Gratuitamente"

## 👥 Sistema de Usuários Finais (APÓS TUDO ACIMA)

- [ ] Portal para usuários finais
- [ ] Gamificação completa
- [ ] Sistema de recompensas




## 🎨 Landing Page e Fluxo de Onboarding

- [x] Criar landing page profissional com hero section
- [x] Adicionar popup/modal de diagnóstico gratuito na landing
- [x] Permitir fazer diagnóstico sem login
- [ ] Após diagnóstico, mostrar popup para criar conta
- [x] Redirecionar para dashboard completo após login (não para diagnóstico)
- [x] Criar página inicial do dashboard (Dashboard.tsx)
- [x] Rota / agora é a landing page
- [x] Rota /dashboard é o dashboard completo após login




## 📊 Módulo "Meus Dados" - Implementação Completa

### Backend
- [x] Criar tabela `fontes_dados` no schema do banco
- [x] API para listar fontes de dados da empresa
- [x] API para adicionar fonte via upload (CSV/Excel)
- [x] API para conectar fonte via API (credenciais)
- [x] API para remover fonte
- [x] API para atualizar status de sincronização
- [x] Helpers de banco para fontes de dados
- [ ] Parser de CSV/Excel (processamento real de arquivos)
- [ ] Validação e armazenamento de dados importados

### Frontend
- [x] Implementar upload de arquivos CSV/Excel
- [x] Formulário de conexão via API com credenciais
- [x] Lista de fontes conectadas com status
- [x] Botão para remover fonte
- [x] Indicadores de status (conectado, sincronizando, erro)
- [x] Modal de adicionar fonte com múltiplos tipos
- [x] Suporte para 8 tipos de conexão (CSV, Excel, TOTVS, SAP, Salesforce, VTEX, Linx, API)
- [ ] Visualização de dados importados (tabela de registros)

## 🔌 Integração com ERPs/CRMs Brasileiros

- [ ] Pesquisar e documentar APIs dos 5 principais ERPs/CRMs
- [ ] TOTVS Protheus API
- [ ] SAP Business One API
- [ ] Salesforce API
- [ ] VTEX API
- [ ] Linx API




## 📚 Módulo "Base de Conhecimento"

### Backend
- [ ] Criar tabela `base_conhecimento` no schema
- [ ] API para adicionar informações da empresa
- [ ] API para atualizar base de conhecimento
- [ ] API para buscar base de conhecimento por empresa

### Frontend
- [ ] Criar página Base de Conhecimento
- [ ] Formulário para URL do site
- [ ] Formulário para missão, visão, valores
- [ ] Formulário para produtos/serviços
- [ ] Formulário para público-alvo
- [ ] Formulário para diferenciais
- [ ] Upload de documentos (PDFs, apresentações)
- [ ] Visualização da base de conhecimento salva

## 🤖 Módulo "Análise da IA" - 100% Funcional

### Backend
- [ ] Instalar SDK da OpenAI
- [ ] Criar API para gerar insights com GPT-4
- [ ] Criar prompt inteligente que combina:
  - Dados das fontes conectadas
  - Base de conhecimento da empresa
  - Contexto do setor
- [ ] API para salvar insights gerados
- [ ] API para listar histórico de insights

### Frontend
- [ ] Reescrever página Análise da IA completamente
- [ ] Botão "Gerar Insights" que chama a IA
- [ ] Loading state durante geração
- [ ] Exibição visual dos insights gerados
- [ ] Cards para cada insight com:
  - Título
  - Descrição
  - Impacto estimado
  - Ações sugeridas
- [ ] Histórico de análises anteriores
- [ ] Botão para regenerar análise




## 🐛 Bugs para Correção

- [ ] Login não redireciona para dashboard após autenticação bem-sucedida
- [ ] Verificar fluxo completo de autenticação e persistência de sessão
- [ ] Testar geração de insights com OpenAI GPT-4 no módulo Análise da IA
- [ ] Validar salvamento de dados em todas as tabelas do banco
- [ ] Testar upload de arquivos CSV/Excel no módulo Meus Dados

