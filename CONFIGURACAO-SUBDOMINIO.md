# Configuração de Subdomínio - Instituto Sentindo a Dor do Próximo

## 📍 Subdomínio Configurado

```
https://instituto-sentindo.digitaltech.digital
```

**Status:** Temporário (apresentação e validação com administradora da ONG)  
**Domínio definitivo:** A definir pela ONG

---

## 📝 Sumário de Alterações

### Arquivos Alterados

| Arquivo | Alteração | Motivo |
|---------|-----------|--------|
| `vite.config.ts` | Adicionado host à whitelist | Permitir conexões via novo subdomínio |

### Detalhes das Alterações

#### 1. `vite.config.ts` - Linha 85

**Antes:**
```typescript
allowedHosts: [
  "localhost",
  "127.0.0.1",
],
```

**Depois:**
```typescript
allowedHosts: [
  "localhost",
  "127.0.0.1",
  "instituto-sentindo.digitaltech.digital",
],
```

**Razão:** Vite precisa reconhecer o novo host para aceitar conexões durante desenvolvimento ou servidor com live reload.

---

## 🔍 Auditoria Realizada

### ✅ URLs Dinâmicas (Seguras para Migração)

O projeto já utiliza `window.location.origin` para construir URLs dinamicamente:

```typescript
// client/src/const.ts
const redirectUri = `${window.location.origin}/api/oauth/callback`;
```

**Impacto:** Essa prática garante que o projeto funcionará automaticamente em qualquer domínio sem alterações adicionais de código.

### ✅ Variáveis de Ambiente

Variáveis usadas pelo projeto:
- `VITE_ANALYTICS_ENDPOINT` - Ponto final de analytics (externo)
- `VITE_ANALYTICS_WEBSITE_ID` - ID do website (externo)
- `VITE_FRONTEND_FORGE_API_KEY` - Chave de API (externo)
- `VITE_FRONTEND_FORGE_API_URL` - URL de API (externo)
- `VITE_OAUTH_PORTAL_URL` - Portal OAuth (externo)
- `VITE_APP_ID` - ID da aplicação (externo)

**Impacto:** Nenhuma dessas variáveis está relacionada ao domínio do site. Todas são para integrações externas.

### ✅ Configurações de Host

- **Vite dev server:** Agora aceita `instituto-sentindo.digitaltech.digital`
- **CORS:** Não configurado explicitamente (padrão: aceita mesmo origin)
- **Express server:** Usa `window.location.origin` para CORS automático

### ❌ URLs Hardcoded (NÃO relacionadas ao domínio)

As seguintes URLs estão hardcoded, mas não afetam a migração:
- Links de WhatsApp: `https://wa.me/5521971046439`
- Links de redes sociais (Instagram, Facebook, Google Maps)
- Link do parceiro DigitalTech: `https://www.digitaltech.digital/`

Essas URLs referem-se a serviços externos da ONG, não ao seu próprio domínio.

### ✅ manus-storage-proxy

Mantido conforme solicitado. Está funcionando em `/manus-storage`.

---

## 🔧 Configuração DNS/Hospedagem Necessária

### Passo 1: Registro de DNS (via seu provedor)

Você precisa apontar o subdomínio para o servidor de hospedagem:

```
Tipo de registro: CNAME ou A
Subdomínio: instituto-sentindo
Domínio: digitaltech.digital
Valor: [IP do seu servidor ou CNAME do provedor]
```

**Exemplo:**
```
instituto-sentindo.digitaltech.digital. CNAME seu-servidor.com
```

ou

```
instituto-sentindo.digitaltech.digital. A 192.168.1.1
```

### Passo 2: Certificado SSL (HTTPS)

- Se usar **Let's Encrypt:** Gerar certificado para `instituto-sentindo.digitaltech.digital`
- Se usar **provedor de hosting:** Configurar SSL via painel de controle

### Passo 3: Variáveis de Ambiente (no servidor de hospedagem)

Configurar as seguintes variáveis **no ambiente de produção**:

```bash
NODE_ENV=production
PORT=3000
VITE_ANALYTICS_ENDPOINT=https://seu-analytics-endpoint.com
VITE_ANALYTICS_WEBSITE_ID=seu-website-id
VITE_FRONTEND_FORGE_API_KEY=sua-chave-api
VITE_FRONTEND_FORGE_API_URL=https://forge.butterfly-effect.dev
VITE_OAUTH_PORTAL_URL=https://seu-oauth-portal.com
VITE_APP_ID=seu-app-id
```

### Passo 4: Deploy

```bash
# Copiar arquivos buildados para servidor
# Pasta: dist/

# Ou usar seu pipeline CI/CD (GitHub Actions, etc)
```

---

## 🔄 Migração Futura para Domínio Definitivo

Quando a ONG comprar seu domínio (ex: `https://www.dominio-definitivo-da-ong.org.br`), o processo será **extremamente simples**:

### Fase 2 - Alterações Necessárias:

#### 1. Atualizar `vite.config.ts`

Substituir:
```typescript
allowedHosts: [
  "localhost",
  "127.0.0.1",
  "instituto-sentindo.digitaltech.digital",
],
```

Por:
```typescript
allowedHosts: [
  "localhost",
  "127.0.0.1",
  "www.dominio-definitivo-da-ong.org.br",
  "dominio-definitivo-da-ong.org.br",
],
```

#### 2. Variáveis de Ambiente

Nenhuma alteração no código. Apenas atualizar DNS para:
```
www.dominio-definitivo-da-ong.org.br CNAME [seu-servidor]
dominio-definitivo-da-ong.org.br CNAME [seu-servidor]
```

#### 3. Build e Deploy

```bash
pnpm build
# Copiar dist/ para novo servidor
```

**Tempo estimado:** 15-30 minutos

---

## ⚠️ Cuidados Importantes

### 1. URLs Dinâmicas (window.location.origin)

✅ **Seguro:** O projeto já usa URLs dinâmicas, então funcionará em qualquer domínio automaticamente.

```typescript
// Isso funciona em qualquer domínio
const redirectUri = `${window.location.origin}/api/oauth/callback`;
```

### 2. manus-storage-proxy

✅ **Mantido:** O proxy está funcionando normalmente. Se o domínio mudar:
- Se usar o mesmo servidor: Funcionará automaticamente
- Se mudar de servidor: Verificar configurações de `BUILT_IN_FORGE_API_URL` e `BUILT_IN_FORGE_API_KEY`

### 3. Cookies

✅ **Seguro:** Cookie `app_session_id` não tem domínio hardcoded, usa padrão do navegador.

### 4. Imagens e Assets

✅ **Seguro:** Todas as imagens são referências relativas ou de CDN externo, não depende do domínio.

### 5. Formulários

✅ **Seguro:** O formulário de contato usa `window.open()` com WhatsApp dinâmico, não requer alterações de domínio.

---

## 📊 Resumo da Arquitetura de Domínios

```
┌─────────────────────────────────────────┐
│     Projeto do Instituto Sentindo       │
│           a Dor do Próximo              │
└──────────────────┬──────────────────────┘
                   │
                   ├─► FASE 1 (Agora)
                   │   └─► https://instituto-sentindo.digitaltech.digital
                   │       └─► [Validação com administradora]
                   │
                   └─► FASE 2 (Futuro)
                       └─► https://www.dominio-definitivo-da-ong.org.br
                           └─► [Domínio permanente da ONG]
```

**Código da aplicação:** Permanece 100% idêntico em ambas as fases.

---

## 📋 Checklist de Deploy

### Antes de publicar em produção:

- [ ] Domínio `instituto-sentindo.digitaltech.digital` está ativo
- [ ] SSL/HTTPS configurado
- [ ] Variáveis de ambiente definidas no servidor
- [ ] Build testado localmente: `pnpm build`
- [ ] Node.js v18+ instalado no servidor
- [ ] Pasta `dist/` copiada para servidor
- [ ] Servidor Express iniciado: `node dist/index.js`
- [ ] Teste de acesso: https://instituto-sentindo.digitaltech.digital
- [ ] Verificar console do navegador (não deve haver erros CORS)
- [ ] Testar formulário de contato → WhatsApp
- [ ] Testar carrossel de eventos
- [ ] Testar mapa de localização

---

## 🚀 Próximos Passos

1. **Configurar DNS** com seu provedor (apontar para servidor)
2. **Gerar certificado SSL** (Let's Encrypt ou provedor)
3. **Definir variáveis de ambiente** no servidor
4. **Fazer deploy** da pasta `dist/`
5. **Testar site** em https://instituto-sentindo.digitaltech.digital
6. **Compartilhar link** com administradora da ONG para validação

---

## 📞 Suporte e Dúvidas

- **Dúvidas sobre configuração DNS?** Contate seu provedor
- **Erro ao acessar subdomínio?** Verificar propagação DNS (pode levar até 48h)
- **Erro no build?** Executar `pnpm install` e `pnpm build` novamente
- **Erro 403 de CORS?** Verificar configurações de variáveis de ambiente

---

**Documento criado:** 2026-09-13  
**Status:** ✅ Projeto preparado para subdomínio temporário  
**Risco de migração futura:** ✅ Mínimo (alterações estimadas em 10-15 minutos)
