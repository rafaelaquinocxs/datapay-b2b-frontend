# Guia de Teste e Validação - DataPay Studio

## 📋 Visão Geral

Este documento descreve como testar e validar todas as funcionalidades do **DataPay Studio** (Laboratório) antes de colocar em produção.

---

## 🧪 Testes Automatizados

### Executar Testes

```bash
# Executar todos os testes
pnpm test

# Executar testes do Studio especificamente
pnpm test studio

# Executar testes com cobertura
pnpm test --coverage
```

### Testes Disponíveis

- ✅ **Datasets Sintéticos**: Validação de geração, tipos e quantidades
- ✅ **Simulações de Campanhas**: Cálculo de ROI, cenários e tipos
- ✅ **Simulações de Pesquisas**: Qualidade, anomalias e recomendações
- ✅ **Projeções de Comportamento**: Projeções, confiança e cenários
- ✅ **Validações de Entrada**: Nomes, percentuais, valores monetários
- ✅ **Integração**: Fluxo completo de geração

---

## 🎯 Testes Manuais

### 1. Teste de Geração de Dataset

**Pré-requisitos:**
- Estar autenticado na aplicação
- Acessar página "Studio > Gerador de Dados"

**Passos:**
1. Preencher formulário:
   - Nome: "Dataset Teste Produção"
   - Tipo: "Clientes"
   - Quantidade: 100.000 registros
   - Região: "Brasil"
   - Sazonalidade: "Sazonal"

2. Clicar em "Gerar Dataset"

3. **Validar:**
   - ✅ Dataset aparece na lista com status "processando"
   - ✅ Após 2-3 minutos, status muda para "concluído"
   - ✅ Dados aparecem no banco de dados
   - ✅ Toast notification de sucesso aparece

**Resultado Esperado:**
```json
{
  "success": true,
  "datasetId": 1,
  "message": "Dataset gerado com sucesso"
}
```

---

### 2. Teste de Simulação de Campanha

**Pré-requisitos:**
- Ter pelo menos 1 dataset gerado
- Acessar página "Studio > Simulador de Campanhas"

**Passos:**
1. Preencher formulário:
   - Nome: "Campanha Email Teste"
   - Tipo: "Email"
   - Dataset: Selecionar dataset gerado
   - Audiência: 10.000
   - Taxa Abertura: 25%
   - Taxa Clique: 10%
   - Taxa Conversão: 5%
   - Ticket Médio: R$ 500
   - Custo por Contato: R$ 2

2. Clicar em "Simular Campanha"

3. **Validar:**
   - ✅ Cálculos aparecem corretamente:
     - Contatos Abertos: 2.500
     - Contatos Clicados: 250
     - Conversões: 12
     - ROI: Calculado corretamente
   - ✅ Cenários (Otimista/Pessimista) aparecem
   - ✅ Simulação salva no banco de dados

**Resultado Esperado:**
```json
{
  "success": true,
  "simulationId": 1,
  "resultados": {
    "contatosAbertos": 2500,
    "contatosClicados": 250,
    "conversoes": 12,
    "receita": 6000,
    "custoTotal": 20000,
    "roi": -70,
    "paybackDias": 100
  }
}
```

---

### 3. Teste de Simulação de Pesquisa

**Pré-requisitos:**
- Acessar página "Studio > Simulador de Pesquisas"

**Passos:**
1. Preencher formulário:
   - Nome: "Pesquisa Satisfação Clientes"
   - Audiência: 5.000
   - Taxa Resposta: 40%
   - Tempo Médio: 5 minutos
   - Taxa Abandono: 20%

2. Clicar em "Simular Pesquisa"

3. **Validar:**
   - ✅ Cálculos aparecem:
     - Respostas Esperadas: 2.000
     - Respostas Completas: 1.600
     - Score Qualidade: 90
   - ✅ Anomalias e duplicatas detectadas
   - ✅ Recomendações geradas

**Resultado Esperado:**
```json
{
  "success": true,
  "simulationId": 1,
  "resultados": {
    "respostasEsperadas": 2000,
    "respostasCompletas": 1600,
    "scoreQualidade": 90,
    "anomaliasDetectadas": 32,
    "duplicatasDetectadas": 16,
    "recomendacoes": ["Alta taxa de abandono - considere simplificar"]
  }
}
```

---

### 4. Teste de Projeção de Comportamento

**Pré-requisitos:**
- Acessar página "Studio > Projetor de Comportamento"

**Passos:**
1. Preencher formulário:
   - Nome: "Projeção Churn 2024"
   - Métrica: "churn"
   - Período Histórico: 12 meses
   - Data Início: 01/01/2024
   - Data Fim: 31/12/2024

2. Clicar em "Projetar"

3. **Validar:**
   - ✅ Projeções em 4 períodos aparecem:
     - 30 dias
     - 90 dias
     - 180 dias
     - 365 dias
   - ✅ Confiança diminui com o tempo
   - ✅ 3 cenários aparecem (Otimista, Pessimista, Provável)
   - ✅ Ações recomendadas aparecem

**Resultado Esperado:**
```json
{
  "success": true,
  "projectionId": 1,
  "resultados": {
    "projecao30dias": 1025,
    "projecao90dias": 1075,
    "projecao180dias": 1150,
    "projecao365dias": 1300,
    "confianca30dias": 85,
    "confianca90dias": 75,
    "confianca180dias": 65,
    "confianca365dias": 55,
    "acoesRecomendadas": [
      {
        "acao": "Aumentar investimento em marketing",
        "impacto": "Alto",
        "esforço": "Médio"
      }
    ]
  }
}
```

---

## 🔍 Testes de API (cURL)

### Gerar Dataset

```bash
curl -X POST http://localhost:3000/api/trpc/studio.generateDataset \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Dataset Teste",
    "tipo": "clientes",
    "quantidade": 100000,
    "regiao": "Brasil"
  }'
```

### Listar Datasets

```bash
curl http://localhost:3000/api/trpc/studio.listDatasets
```

### Simular Campanha

```bash
curl -X POST http://localhost:3000/api/trpc/studio.simulateCampaign \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Campanha Teste",
    "tipo": "email",
    "audiencia": 10000,
    "taxaAbertura": 25,
    "taxaClique": 10,
    "taxaConversao": 5,
    "ticketMedio": 500,
    "custoPorContato": 2
  }'
```

---

## ✅ Checklist de Validação

### Antes de Deploy

- [ ] Todos os testes automatizados passam
- [ ] Todos os testes manuais validados
- [ ] Banco de dados migrado corretamente
- [ ] Hooks customizados funcionando
- [ ] Componentes renderizando sem erros
- [ ] Loading states funcionando
- [ ] Toast notifications aparecendo
- [ ] Validações de entrada funcionando
- [ ] Dados persistindo no banco de dados
- [ ] Histórico sendo registrado corretamente

### Performance

- [ ] Geração de dataset < 5 minutos para 1M registros
- [ ] Simulação de campanha < 2 segundos
- [ ] Simulação de pesquisa < 2 segundos
- [ ] Projeção de comportamento < 3 segundos
- [ ] Listagem de datasets < 1 segundo

### Segurança

- [ ] Autenticação obrigatória para todos os endpoints
- [ ] Validação de entrada em todos os campos
- [ ] Dados isolados por empresa
- [ ] Sem acesso a dados de outras empresas
- [ ] Logs de auditoria funcionando

---

## 🐛 Troubleshooting

### Erro: "Não autenticado"

**Causa:** Usuário não está autenticado
**Solução:** Fazer login antes de usar Studio

### Erro: "Dataset não encontrado"

**Causa:** Dataset foi deletado ou ID inválido
**Solução:** Verificar se dataset existe na lista

### Erro: "Erro ao gerar dataset"

**Causa:** Limite de arquivos abertos ou banco de dados indisponível
**Solução:** Reiniciar servidor ou verificar conexão com banco

### Simulação muito lenta

**Causa:** Muitos registros no dataset
**Solução:** Usar dataset menor para testes

---

## 📊 Métricas de Sucesso

Após deploy em produção, monitorar:

- **Taxa de Sucesso:** > 99% de requisições bem-sucedidas
- **Tempo de Resposta:** < 3 segundos para 95% das requisições
- **Taxa de Erro:** < 1% de erros
- **Uptime:** > 99.9%
- **Uso de Memória:** < 500MB por instância
- **Taxa de Utilização do Banco:** < 80%

---

## 📞 Suporte

Para problemas ou dúvidas, consulte:
- Documentação: `/docs/STUDIO_README.md`
- Logs: `/logs/studio.log`
- Issues: GitHub Issues
- Slack: #datapay-studio

