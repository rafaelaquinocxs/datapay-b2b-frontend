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

