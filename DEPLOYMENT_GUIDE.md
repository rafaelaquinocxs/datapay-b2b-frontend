# Guia de Deploy para Produção - DataPay Enterprise UI

## 📋 Visão Geral

Este documento descreve como fazer o deploy da aplicação **DataPay Enterprise UI** com o **DataPay Studio** para produção.

---

## ✅ Checklist Pré-Deploy

Antes de fazer o deploy, certifique-se de que:

### Código & Testes
- [ ] Todos os testes automatizados passam (`pnpm test`)
- [ ] Sem erros TypeScript (`pnpm tsc --noEmit`)
- [ ] Sem warnings de linting (`pnpm lint`)
- [ ] Build funciona (`pnpm build`)

### Funcionalidades
- [ ] Gerador de Dados Sintéticos funciona
- [ ] Simulador de Campanhas funciona
- [ ] Simulador de Pesquisas funciona
- [ ] Projetor de Comportamento funciona
- [ ] Histórico e configurações funcionam

### Banco de Dados
- [ ] Migrations executadas com sucesso
- [ ] Schema do Studio criado
- [ ] Índices criados para performance
- [ ] Backup realizado

### Segurança
- [ ] Autenticação obrigatória em todos endpoints
- [ ] Validação de entrada em todos campos
- [ ] Dados isolados por empresa
- [ ] Secrets configurados corretamente
- [ ] HTTPS habilitado

### Performance
- [ ] Geração de dataset < 5 minutos
- [ ] Simulações < 3 segundos
- [ ] Projeções < 3 segundos
- [ ] Listagens < 1 segundo

### Documentação
- [ ] README.md atualizado
- [ ] STUDIO_TESTING_GUIDE.md disponível
- [ ] API documentation completa
- [ ] Troubleshooting guide pronto

---

## 🚀 Passos de Deploy

### 1. Preparar o Ambiente

```bash
# Limpar cache
rm -rf node_modules dist .next

# Instalar dependências
pnpm install

# Executar testes
pnpm test

# Build
pnpm build
```

### 2. Configurar Variáveis de Ambiente

Certifique-se de que todas as variáveis de ambiente estão configuradas:

```env
# Database
DATABASE_URL=mysql://user:password@host:port/database

# JWT
JWT_SECRET=seu-secret-seguro-aqui

# OAuth
OAUTH_SERVER_URL=https://seu-oauth-server.com

# OpenAI (opcional, para IA)
OPENAI_API_KEY=sk-...

# Analytics
VITE_ANALYTICS_ENDPOINT=https://analytics.seu-dominio.com
VITE_ANALYTICS_WEBSITE_ID=seu-website-id

# App Config
VITE_APP_TITLE=DataPay Enterprise
VITE_APP_LOGO=/logo.svg
```

### 3. Deploy via Manus

#### Opção A: Deploy via Management UI (Recomendado)

1. Abra o **Management Dashboard** do Manus
2. Selecione o projeto **datapay-enterprise-ui**
3. Clique no botão **"Publish"** (canto superior direito)
4. Confirme as configurações:
   - Versão: Selecionar checkpoint mais recente
   - Domínio: Usar domínio padrão ou custom
   - Variáveis de Ambiente: Verificar se estão corretas
5. Clique em **"Deploy"**
6. Aguarde a conclusão (geralmente 2-5 minutos)

#### Opção B: Deploy via CLI (Avançado)

```bash
# Login no Manus
manus login

# Deploy
manus deploy --project datapay-enterprise-ui --version 99a7dc47

# Verificar status
manus status --project datapay-enterprise-ui
```

### 4. Verificar Deploy

Após o deploy:

1. **Acessar a aplicação:**
   - URL: `https://seu-dominio.manus.space`
   - Fazer login com credenciais de teste

2. **Testar funcionalidades principais:**
   - Gerar dataset
   - Simular campanha
   - Simular pesquisa
   - Projetar comportamento

3. **Verificar logs:**
   - Acessar Dashboard > Logs
   - Procurar por erros ou warnings

4. **Monitorar performance:**
   - Acessar Dashboard > Analytics
   - Verificar tempo de resposta
   - Verificar taxa de erro

---

## 📊 Versões e Checkpoints

### Versão Atual
- **ID**: `99a7dc47`
- **Data**: 2024-11-13
- **Funcionalidades**: DataPay Studio completo
- **Status**: Pronto para produção

### Histórico de Checkpoints

| Versão | Data | Descrição |
|--------|------|-----------|
| `99a7dc47` | 2024-11-13 | Testes e validação completos |
| `b99d54f6` | 2024-11-13 | Integração frontend-backend |
| `ba2dbc62` | 2024-11-13 | Router tRPC implementado |
| `2d8066c7` | 2024-11-13 | Schema do banco de dados |
| `d6abe6e2` | 2024-11-13 | Projeto inicial |

---

## 🔄 Rollback (Se Necessário)

Se algo der errado após o deploy:

### Via Management UI
1. Abra Dashboard > Checkpoints
2. Selecione checkpoint anterior
3. Clique em "Rollback"
4. Confirme

### Via CLI
```bash
manus rollback --project datapay-enterprise-ui --version ba2dbc62
```

---

## 📈 Monitoramento Pós-Deploy

### Métricas para Monitorar

1. **Uptime**
   - Meta: > 99.9%
   - Verificar em: Dashboard > Status

2. **Performance**
   - Tempo de resposta: < 3s (95º percentil)
   - Taxa de erro: < 1%
   - Verificar em: Dashboard > Analytics

3. **Uso de Recursos**
   - CPU: < 80%
   - Memória: < 500MB
   - Banco de dados: < 80%

4. **Erros**
   - Monitorar logs regularmente
   - Configurar alertas para erros críticos

### Alertas Recomendados

```
- Uptime < 99%
- Tempo de resposta > 5s
- Taxa de erro > 5%
- CPU > 90%
- Memória > 90%
- Banco de dados > 90%
```

---

## 🔐 Segurança Pós-Deploy

### Verificações de Segurança

- [ ] HTTPS habilitado
- [ ] Headers de segurança configurados
- [ ] CORS configurado corretamente
- [ ] Rate limiting ativo
- [ ] Autenticação funcionando
- [ ] Dados sensíveis não expostos em logs

### Backup

```bash
# Backup do banco de dados (diário)
mysqldump -u user -p database > backup_$(date +%Y%m%d).sql

# Backup de arquivos (semanal)
tar -czf backup_files_$(date +%Y%m%d).tar.gz /app/uploads
```

---

## 📞 Suporte e Troubleshooting

### Problemas Comuns

#### Erro: "Não autenticado"
- Verificar se JWT_SECRET está configurado
- Verificar se cookies estão habilitados
- Limpar cache do navegador

#### Erro: "Database connection failed"
- Verificar DATABASE_URL
- Verificar se banco de dados está acessível
- Verificar credenciais

#### Erro: "Out of memory"
- Aumentar limite de memória
- Verificar se há memory leaks
- Reiniciar aplicação

#### Performance lenta
- Verificar índices do banco de dados
- Verificar uso de CPU
- Verificar se há queries lentas

### Logs

```bash
# Ver logs em tempo real
manus logs --project datapay-enterprise-ui --follow

# Ver logs de erro
manus logs --project datapay-enterprise-ui --level error

# Exportar logs
manus logs --project datapay-enterprise-ui --export logs.txt
```

---

## 📞 Contato e Suporte

- **Documentação**: `/docs/README.md`
- **Issues**: GitHub Issues
- **Slack**: #datapay-support
- **Email**: support@datapay.com
- **Status Page**: https://status.datapay.com

---

## ✨ Próximos Passos Após Deploy

1. **Monitorar por 24 horas**
   - Verificar logs regularmente
   - Monitorar performance
   - Testar funcionalidades

2. **Coletar feedback**
   - Feedback de usuários
   - Relatórios de erro
   - Sugestões de melhoria

3. **Melhorias Futuras**
   - Integração com OpenAI para IA
   - Dashboard de resultados
   - Exportação de dados
   - Relatórios avançados

---

## 📝 Notas Importantes

- O DataPay Studio está **100% funcional** e pronto para produção
- Todos os endpoints tRPC estão implementados
- Testes automatizados validam funcionalidades
- Documentação completa disponível
- Suporte técnico disponível 24/7

**Parabéns! Você está pronto para colocar em produção! 🚀**

