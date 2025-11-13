# 🚀 PLANO DE PRODUÇÃO - DataPay Enterprise UI

**Objetivo:** Levar a aplicação **100% pronta para produção** com todas as funcionalidades do frontend funcionando perfeitamente.

**Data:** 13 de Novembro de 2025  
**Status:** EM EXECUÇÃO

---

## 📊 VISÃO GERAL DAS FUNCIONALIDADES

### ✅ MÓDULOS IMPLEMENTADOS NO FRONTEND (51 páginas)

| Módulo | Páginas | Status |
|--------|---------|--------|
| **Autenticação** | Login, Registro, Landing | ✅ Frontend pronto |
| **Dashboard** | Dashboard, Início, Visão Geral | ✅ Frontend pronto |
| **Meus Dados** | Meus Dados, Compilato de Dados, Adicionar Fonte, Mapeamento de Fontes | ✅ Frontend pronto |
| **Pesquisas** | Pesquisas, Responde Pesquisa, Insights de Pesquisas, Distribuição de Pesquisas | ✅ Frontend pronto |
| **Formulários** | Formulário Inteligente, Formulários Inteligentes, Agendamento de Formulários | ✅ Frontend pronto |
| **Análise IA** | Análise IA, Base de Conhecimento, Inteligência, Visão 360 | ✅ Frontend pronto |
| **Ações** | Ações Inteligentes, Plano de Ação, Playbooks | ✅ Frontend pronto |
| **Resultados** | Resultados, Resultados ROI, Simulador de Impacto | ✅ Frontend pronto |
| **Relatórios** | Relatórios, Relatórios de Formulários, Benchmarks | ✅ Frontend pronto |
| **Laboratório** | Laboratório, Studio (Gerador, Simulador, Projetor) | ✅ Frontend pronto |
| **Configurações** | Configurações, Conectores, Sincronização | ✅ Frontend pronto |
| **Outros** | Diagnóstico, Chatbot, Segmentação, Sobre Empresa, Resumo Perfil | ✅ Frontend pronto |

---

## 🔴 BLOQUEADORES CRÍTICOS PARA PRODUÇÃO

Conforme relatório do especialista, os seguintes itens **DEVEM** ser resolvidos antes do deploy:

### 1️⃣ FORMULÁRIO "PEÇA UMA DEMO" (Bloqueador #1)
**Impacto:** Principal call-to-action para captação de leads  
**Status:** EM PROGRESSO

- [ ] Criar tabela `demo_requests` no banco de dados
- [ ] Implementar router tRPC `demo.create`
- [ ] Implementar router tRPC `demo.list` (admin)
- [ ] Criar modal de "Peça uma Demo" na Landing Page
- [ ] Integrar envio de e-mail de confirmação (Nodemailer)
- [ ] Testar fluxo completo (frontend → backend → banco → email)

### 2️⃣ BUG DA IA - CHAMADAS À OPENAI (Bloqueador #2)
**Impacto:** Funcionalidades de análise e geração de insights  
**Status:** DEBUG NECESSÁRIO

- [ ] Investigar chamadas à OpenAI em `server/_core/llm.ts`
- [ ] Verificar configuração de API key
- [ ] Testar geração de sugestões
- [ ] Implementar tratamento de erros
- [ ] Adicionar logs para debug
- [ ] Testar em produção

### 3️⃣ MÓDULO LABORATÓRIO - MVP (Bloqueador #3)
**Impacto:** Valor central do produto (Gerador, Simulador, Projetor)  
**Status:** BACKEND PENDENTE

- [ ] Criar tabelas:
  - [ ] `synthetic_datasets` (datasets gerados)
  - [ ] `campaign_simulations` (simulações de campanhas)
  - [ ] `behavior_projections` (projeções de comportamento)
- [ ] Implementar routers tRPC:
  - [ ] `studio.generateDataset` (gerar dados sintéticos)
  - [ ] `studio.listDatasets` (listar datasets)
  - [ ] `studio.simulateCampaign` (simular campanha)
  - [ ] `studio.projectBehavior` (projetar comportamento)
- [ ] Conectar botões do frontend com APIs
- [ ] Integrar com OpenAI para geração de dados realistas
- [ ] Testar fluxo completo

---

## 📋 ETAPAS DE IMPLEMENTAÇÃO

### ETAPA 1: PREPARAÇÃO DO AMBIENTE (1-2 dias)
**Objetivo:** Ter o servidor rodando e banco de dados sincronizado

- [ ] Resolver problema EMFILE do servidor
- [ ] Instalar dependências
- [ ] Configurar variáveis de ambiente
- [ ] Executar migrações do banco de dados
- [ ] Verificar conectividade com OpenAI
- [ ] Verificar conectividade com Nodemailer

**Saída esperada:** Servidor rodando em http://localhost:3000

---

### ETAPA 2: FORMULÁRIO "PEÇA UMA DEMO" (2-3 dias)
**Objetivo:** Implementar captação de leads via formulário

**Tarefas:**

1. **Criar tabela `demo_requests`**
   ```sql
   CREATE TABLE demo_requests (
     id INT PRIMARY KEY AUTO_INCREMENT,
     nome VARCHAR(255) NOT NULL,
     email VARCHAR(320) NOT NULL,
     telefone VARCHAR(50),
     empresa VARCHAR(255),
     mensagem TEXT,
     status ENUM('novo', 'respondido', 'agendado') DEFAULT 'novo',
     criadoEm TIMESTAMP DEFAULT NOW(),
     respondidoEm TIMESTAMP NULL
   );
   ```

2. **Implementar router tRPC**
   - Criar `server/routers/demo.ts`
   - Implementar `create` (POST)
   - Implementar `list` (GET - admin only)
   - Implementar `update` (PUT - admin only)

3. **Integrar com Nodemailer**
   - Enviar e-mail de confirmação ao usuário
   - Enviar notificação ao admin

4. **Criar modal no Landing Page**
   - Formulário com campos: nome, email, telefone, empresa, mensagem
   - Validação com Zod
   - Feedback de sucesso/erro

5. **Testes**
   - Testar submissão do formulário
   - Verificar e-mail de confirmação
   - Verificar dados no banco

---

### ETAPA 3: RESOLVER BUG DA IA (2-3 dias)
**Objetivo:** Corrigir chamadas à OpenAI

**Tarefas:**

1. **Investigar erro atual**
   - Verificar logs em `server/_core/llm.ts`
   - Testar chamada direta à API OpenAI
   - Verificar limite de requisições

2. **Implementar tratamento de erros**
   - Try-catch em todas as chamadas
   - Retry automático com backoff
   - Fallback para sugestões padrão

3. **Adicionar logs**
   - Log de cada chamada à IA
   - Log de erros e respostas
   - Monitoramento de latência

4. **Testar**
   - Testar geração de insights
   - Testar geração de sugestões
   - Testar em caso de erro da API

---

### ETAPA 4: MÓDULO LABORATÓRIO - MVP (5-7 dias)
**Objetivo:** Implementar Gerador, Simulador e Projetor de Comportamento

**Tarefas:**

1. **Criar tabelas do banco**
   ```sql
   CREATE TABLE synthetic_datasets (
     id INT PRIMARY KEY AUTO_INCREMENT,
     empresaId INT NOT NULL,
     nome VARCHAR(255) NOT NULL,
     descricao TEXT,
     tipo ENUM('clientes', 'vendas', 'comportamento') NOT NULL,
     quantidade INT NOT NULL,
     dados JSON NOT NULL,
     criadoEm TIMESTAMP DEFAULT NOW(),
     FOREIGN KEY (empresaId) REFERENCES empresas(id)
   );

   CREATE TABLE campaign_simulations (
     id INT PRIMARY KEY AUTO_INCREMENT,
     empresaId INT NOT NULL,
     nome VARCHAR(255) NOT NULL,
     tipo ENUM('email', 'sms', 'push') NOT NULL,
     audiencia INT NOT NULL,
     taxaConversao DECIMAL(5,2),
     receita DECIMAL(15,2),
     roi DECIMAL(5,2),
     criadoEm TIMESTAMP DEFAULT NOW(),
     FOREIGN KEY (empresaId) REFERENCES empresas(id)
   );

   CREATE TABLE behavior_projections (
     id INT PRIMARY KEY AUTO_INCREMENT,
     empresaId INT NOT NULL,
     metrica VARCHAR(255) NOT NULL,
     projecao30dias INT,
     projecao90dias INT,
     projecao180dias INT,
     confianca DECIMAL(5,2),
     criadoEm TIMESTAMP DEFAULT NOW(),
     FOREIGN KEY (empresaId) REFERENCES empresas(id)
   );
   ```

2. **Implementar routers tRPC**
   - `studio.generateDataset` - Gerar dados sintéticos
   - `studio.listDatasets` - Listar datasets
   - `studio.deleteDataset` - Deletar dataset
   - `studio.simulateCampaign` - Simular campanha
   - `studio.projectBehavior` - Projetar comportamento

3. **Integrar com OpenAI**
   - Usar GPT para gerar dados realistas
   - Usar GPT para simular campanhas
   - Usar GPT para fazer projeções

4. **Conectar frontend com backend**
   - Atualizar componentes do Studio
   - Adicionar loading states
   - Adicionar error handling

5. **Testes**
   - Testar geração de dados
   - Testar simulação de campanhas
   - Testar projeções

---

### ETAPA 5: OUTRAS FUNCIONALIDADES CRÍTICAS (3-5 dias)
**Objetivo:** Implementar funcionalidades que faltam para completar o MVP

- [ ] **Autenticação e Autorização**
  - [ ] Verificar se login/registro estão funcionando
  - [ ] Verificar se JWT está sendo gerado corretamente
  - [ ] Testar permissões por role

- [ ] **Pesquisas**
  - [ ] Criar router tRPC para CRUD de pesquisas
  - [ ] Testar criação de pesquisa
  - [ ] Testar resposta de pesquisa
  - [ ] Testar listagem de respostas

- [ ] **Formulários**
  - [ ] Criar router tRPC para CRUD de formulários
  - [ ] Testar criação de formulário
  - [ ] Testar submissão de formulário
  - [ ] Testar listagem de submissões

- [ ] **Análise IA**
  - [ ] Implementar router para análise de dados
  - [ ] Testar geração de insights
  - [ ] Testar recomendações

- [ ] **Relatórios**
  - [ ] Implementar router para gerar relatórios
  - [ ] Testar exportação em PDF
  - [ ] Testar exportação em Excel

---

### ETAPA 6: TESTES E VALIDAÇÃO (2-3 dias)
**Objetivo:** Garantir que tudo funciona antes do deploy

- [ ] **Testes Unitários**
  - [ ] Testar routers tRPC
  - [ ] Testar validações Zod
  - [ ] Testar lógica de negócio

- [ ] **Testes de Integração**
  - [ ] Testar fluxo completo de login
  - [ ] Testar fluxo completo de criação de pesquisa
  - [ ] Testar fluxo completo de simulação

- [ ] **Testes de Performance**
  - [ ] Testar latência das APIs
  - [ ] Testar com múltiplos usuários
  - [ ] Testar com grande volume de dados

- [ ] **Testes de Segurança**
  - [ ] Testar autenticação
  - [ ] Testar autorização
  - [ ] Testar SQL injection
  - [ ] Testar XSS

---

### ETAPA 7: DEPLOY PARA PRODUÇÃO (1-2 dias)
**Objetivo:** Publicar a aplicação

- [ ] Criar checkpoint final
- [ ] Configurar variáveis de ambiente em produção
- [ ] Executar migrações em produção
- [ ] Deploy do frontend
- [ ] Deploy do backend
- [ ] Configurar domínio customizado
- [ ] Configurar SSL/TLS
- [ ] Configurar CDN
- [ ] Configurar backup automático
- [ ] Configurar monitoramento

---

## 📈 TIMELINE ESTIMADA

| Etapa | Duração | Data Início | Data Fim |
|-------|---------|-------------|----------|
| 1. Preparação | 1-2 dias | 13/11 | 14/11 |
| 2. Formulário Demo | 2-3 dias | 14/11 | 17/11 |
| 3. Bug IA | 2-3 dias | 17/11 | 20/11 |
| 4. Laboratório MVP | 5-7 dias | 20/11 | 27/11 |
| 5. Outras Funcionalidades | 3-5 dias | 27/11 | 02/12 |
| 6. Testes | 2-3 dias | 02/12 | 05/12 |
| 7. Deploy | 1-2 dias | 05/12 | 07/12 |
| **TOTAL** | **~16-25 dias** | **13/11** | **07/12** |

---

## 🎯 CRITÉRIOS DE SUCESSO

Antes de colocar em produção, todos os itens abaixo devem estar ✅:

- [ ] Servidor rodando sem erros
- [ ] Banco de dados sincronizado
- [ ] Autenticação funcionando
- [ ] Formulário "Peça uma Demo" funcionando
- [ ] Chamadas à IA funcionando
- [ ] Laboratório gerando dados
- [ ] Laboratório simulando campanhas
- [ ] Laboratório projetando comportamento
- [ ] Pesquisas funcionando
- [ ] Formulários funcionando
- [ ] Relatórios funcionando
- [ ] Testes passando
- [ ] Sem erros no console
- [ ] Performance aceitável
- [ ] Segurança validada

---

## 📞 PRÓXIMOS PASSOS

1. **Agora:** Iniciar ETAPA 1 - Preparação do Ambiente
2. **Depois:** Seguir o plano etapa por etapa
3. **Final:** Deploy em produção

**Vamos começar! 🚀**

