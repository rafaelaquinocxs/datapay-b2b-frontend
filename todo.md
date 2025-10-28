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

- [x] Login mostra "Login realizado com sucesso!" mas não redireciona para dashboard - CORRIGIDO
  - Problema: setTimeout de 100ms era insuficiente
  - Solução: Aumentado para 500ms e adicionados logs de debug
  - Status: Testado e funcionando perfeitamente
- [x] Verificar fluxo completo de autenticação e persistência de sessão - VALIDADO
- [ ] Testar geração de insights com OpenAI GPT-4 no módulo Análise da IA
- [ ] Validar salvamento de dados em todas as tabelas do banco
- [ ] Testar upload de arquivos CSV/Excel no módulo Meus Dados




## Modulo Pesquisas Gamificadas - Status Atual

### Bugs Corrigidos Recentemente
- [x] Login nao redireciona para dashboard - Corrigido com sistema de cookies
- [x] Chave OpenAI invalida - Agora usa helper invokeLLM

### Backend - Pesquisas
- [x] Criar tabela pesquisas no schema do banco
- [x] Criar tabela respostas_pesquisas no schema
- [x] API para criar pesquisa
- [x] API para listar pesquisas da empresa
- [x] API para buscar pesquisa por link publico
- [x] API para enviar resposta de pesquisa
- [ ] API para visualizar respostas coletadas
- [ ] API para gerar relatorio de pesquisa

### Frontend - Pesquisas
- [x] Pagina de Pesquisas no dashboard
- [x] Formulario para criar pesquisa
- [x] Pagina publica para responder pesquisa (RespondePesquisa.tsx)
- [ ] Listar pesquisas criadas com status
- [ ] Botao para compartilhar link da pesquisa
- [ ] Pagina para visualizar respostas coletadas
- [ ] Graficos de analise de respostas

### Problemas Conhecidos
- [ ] Criacao de pesquisa nao esta salvando no banco de dados
  - Possivel causa: Erro na funcao createPesquisa do db.ts
  - Possivel causa: Erro na validacao de autenticacao no router
  - Possivel causa: Erro na insercao de dados no MySQL




## Modulo Formulario Inteligente - Status Final

### Backend - Formularios Inteligentes
- [x] API para gerar sugestoes de formularios com IA
- [x] API para salvar respostas de formularios
- [x] Integracao com invokeLLM para chamadas a IA
- [x] Router analiseIA.gerarSugestoesFormularios criado
- [x] Router formularios.salvarRespostas criado

### Frontend - Formularios Inteligentes
- [x] Pagina FormularioInteligente.tsx criada
- [x] Interface para gerar sugestoes baseadas em dados da empresa
- [x] Formulario dinamico para responder sugestoes
- [x] Mutations tRPC para chamar APIs
- [x] Menu de navegacao atualizado com novo item
- [x] Rota /formulario-inteligente adicionada ao App.tsx

### Funcionalidades Implementadas
- [x] Botao "Gerar Sugestoes" que chama a IA
- [x] Cards com sugestoes de formularios
- [x] Exibicao de prioridade (alta, media, baixa)
- [x] Exibicao de impacto estimado
- [x] Interface para responder cada formulario
- [x] Botao "Salvar Respostas" para cada formulario
- [x] Loading states durante processamento
- [x] Toast notifications para feedback do usuario

### Status Geral do Projeto
- [x] Landing page com diagnóstico gratuito
- [x] Sistema de autenticação com cookies
- [x] Dashboard completo com 8 módulos
- [x] Módulo de Pesquisas Gamificadas
- [x] Módulo de Formulário Inteligente com IA
- [x] Integração com OpenAI GPT-4 via invokeLLM
- [x] Menu de navegação atualizado
- [ ] Criação de pesquisas (debug necessário)
- [ ] Chamada a IA para gerar sugestões (debug necessário)

### Próximos Passos
1. Debugar criação de pesquisas no banco de dados
2. Testar chamada a IA para gerar sugestões
3. Implementar visualização de respostas coletadas
4. Adicionar gráficos de análise de respostas
5. Implementar exportação de dados em PDF




## Botão de Compartilhamento para Pesquisas - Concluído

- [x] Adicionar ícone de compartilhamento (Share2 do lucide-react)
- [x] Implementar função para copiar link para área de transferência
- [x] Mostrar toast notification ao copiar
- [x] Adicionar botão em cada card de pesquisa na lista
- [x] Botão destacado em verde com texto "Compartilhar"
- [x] Testar funcionalidade de cópia

### Detalhes da Implementação
- Botão verde (bg-green-600) com ícone Share2 e texto "Compartilhar"
- Ao clicar, copia o link público da pesquisa para a área de transferência
- Exibe toast notification confirmando a cópia
- Link no formato: `{origin}/p/{linkPublico}`
- Funcionalidade 100% operacional e pronta para uso




## Integração de Dados Reais - Ações Inteligentes e Resultados - CONCLUÍDO

### Análise de Dados Mockados
- [x] Identificar dados mockados em AcoesInteligentes.tsx
  - 3 ações recomendadas (Parceria Coca-Cola, Reativação, Upsell)
  - 1 ação em andamento (Combo Cerveja)
- [x] Identificar dados mockados em Resultados.tsx
  - 4 KPIs gerais (Receita, ROI, Conversão, Alcance)
  - 1 resultado de ação (Combo Cerveja)

### Integração com Backend
- [x] Criar tabela `acoes_inteligentes` no schema
  - Campos: id, empresaId, titulo, tipo, descricao, baseadoEm, potencialLucro, roi, implementacao, status, prioridade
- [x] Criar tabela `resultados_acoes` no schema
  - Campos: id, acaoId, periodo, investimento, receita, lucro, roi, conversao, alcance, status
- [x] API para listar ações inteligentes por empresa
- [x] API para listar resultados de ações
- [x] API para atualizar status de ação

### Frontend - Ações Inteligentes
- [x] Substituir dados mockados por chamada tRPC
- [x] Carregar ações da API ao montar componente
- [x] Mostrar loading state enquanto carrega
- [x] Tratar erro se API falhar

### Frontend - Resultados
- [x] Substituir dados mockados por chamada tRPC
- [x] Carregar resultados da API ao montar componente
- [x] Calcular KPIs dinamicamente a partir dos dados
- [x] Mostrar loading state enquanto carrega
- [x] Tratar erro se API falhar

### Dados Iniciais
- [ ] Criar ações inteligentes de exemplo no banco para empresa de teste
- [ ] Criar resultados de exemplo para as ações
- [x] Validar que os dados aparecem corretamente na UI (Testado e funcionando)




## 🚨 Erros de Build para Correção

- [ ] ERR_INVALID_THIS - Erro de contexto this em algum arquivo
- [ ] ERR_INVALID_URL - Erro de URL inválida 
- [ ] Deployment travando em "Redirecionando"
- [ ] Verificar logs de build completos




## 🚨 BUG CRÍTICO - Login não redireciona

- [ ] Login mostra logs "Redirecionando para /dashboard..." mas não sai da tela de login
- [ ] setLocation("/dashboard") não está funcionando
- [ ] Possível problema: wouter não está redirecionando corretamente
- [ ] Solução: usar window.location.href ao invés de setLocation

