# 📮 Postman Testing Guide - Diário de Craque API

> Documentação completa para testar a API do Diário de Craque usando Postman

## 📦 Índice

1. [Instalação do Postman](#instalação-do-postman)
2. [Importar Coleção](#importar-coleção)
3. [Configurar Ambiente](#configurar-ambiente)
4. [Fluxo Completo de Testes](#fluxo-completo-de-testes)
5. [Referência de Endpoints](#referência-de-endpoints)
6. [Problemas Comuns](#problemas-comuns)

---

## 🔧 Instalação do Postman

### Opção 1: Desktop (Recomendado)

1. Acesse [postman.com](https://www.postman.com/downloads/)
2. Baixe versão para seu SO (Windows, Mac, Linux)
3. Instale e crie uma conta (free tier é suficiente)
4. Abra o Postman

### Opção 2: Web

1. Acesse [web.postman.co](https://web.postman.co)
2. Crie conta ou faça login
3. Pronto para usar!

---

## 📥 Importar Coleção

### Método 1: Importar JSON (Recomendado)

1. **Baixe a coleção**:

   ```bash
   # A coleção está no arquivo POSTMAN_COLLECTION.json na raiz do projeto
   # Ou copie o JSON abaixo
   ```

2. **No Postman**:
   - Clique em **Import** (canto superior esquerdo)
   - Selecione **Upload Files**
   - Escolha o arquivo `POSTMAN_COLLECTION.json`
   - Clique em **Import**

3. **Pronto!** A coleção deve aparecer na sidebar esquerda

### Método 2: Criar Manualmente

Se preferir criar do zero:

1. Clique em **+** para criar nova request
2. Nomeie como `API Diário de Craque`
3. Salve em uma collection nova

---

## 🌍 Configurar Ambiente

### Criar Novo Environment

1. Clique em **Environments** (canto inferior esquerdo)
2. Clique em **Create**
3. Nomeie: `Diário de Craque - Dev`
4. Adicione estas variáveis:

| Variable       | Initial Value         | Current Value         |
| -------------- | --------------------- | --------------------- |
| `api_url`      | http://localhost:3000 | http://localhost:3000 |
| `access_token` | (deixe vazio)         | (deixe vazio)         |
| `user_id`      | (deixe vazio)         | (deixe vazio)         |
| `entry_id`     | (deixe vazio)         | (deixe vazio)         |

5. Clique em **Save** (Ctrl+S)

### Ativar o Environment

1. Canto superior direito, selecione seu environment na dropdown
2. Você verá: `Diário de Craque - Dev`

---

## 🎬 Fluxo Completo de Testes

### Passo 1: Registrar Novo Usuário ✅

**Request**: `POST {{api_url}}/auth/register`

**Body** (JSON):

```json
{
	"email": "jogador_teste@email.com",
	"name": "João Teste Silva",
	"pass": "senha123456",
	"birthDate": "2010-05-15"
}
```

**Headers** (automático):

- `Content-Type: application/json`

**Esperado**: Status `201` ou `200`

**Resposta**:

```json
{
	"access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
	"user": {
		"id": "clp123abc456def789",
		"email": "jogador_teste@email.com",
		"name": "João Teste Silva",
		"role": "ATHLETE"
	}
}
```

**🔧 Salvar token em variável**:

1. Abra a aba **Tests** no Postman
2. Cole este script:

```javascript
if (pm.response.code === 200 || pm.response.code === 201) {
	const data = pm.response.json()
	pm.environment.set("access_token", data.access_token)
	pm.environment.set("user_id", data.user.id)
	pm.test("Token salvo em access_token", () => {
		pm.expect(data.access_token).to.exist
	})
}
```

3. Clique em **Send**
4. Abra **Environments** e verá `access_token` preenchido! ✅

---

### Passo 2: Login 🔑

**Request**: `POST {{api_url}}/auth/login`

**Body** (JSON):

```json
{
	"email": "jogador_teste@email.com",
	"pass": "senha123456"
}
```

**Headers**:

- `Content-Type: application/json`

**Esperado**: Status `200`

**Resposta**: Mesmo formato do registro

**Tests**:

```javascript
pm.test("Login bem-sucedido", () => {
	pm.expect(pm.response.code).to.equal(200)
	pm.expect(pm.response.json().access_token).to.exist
})
```

---

### Passo 3: Criar Entrada de Diário 📝

**Request**: `POST {{api_url}}/diary`

**Headers**:

- `Content-Type: application/json`
- `Authorization: Bearer {{access_token}}`

**Body** (JSON):

```json
{
	"date": "2025-02-14",
	"focus": "Domínio de bola e passe",
	"notes": "Treino foi muito bom hoje, consegui melhorar meu domínio",
	"techniquRating": 4,
	"physicalRating": 3,
	"mentalRating": 5,
	"whatWentWell": "Consegui fazer passes perfeitos",
	"whatWasDifficult": "Chutes de longa distância",
	"nextGoal": "Melhorar força nos chutes"
}
```

**Esperado**: Status `201`

**Response**:

```json
{
	"id": "entry123abc",
	"authorId": "clp123abc456def789",
	"date": "2025-02-14T00:00:00Z",
	"focus": "Domínio de bola e passe",
	"notes": "Treino foi muito bom hoje...",
	"techniquRating": 4,
	"physicalRating": 3,
	"mentalRating": 5,
	"whatWentWell": "Consegui fazer passes perfeitos",
	"whatWasDifficult": "Chutes de longa distância",
	"nextGoal": "Melhorar força nos chutes",
	"isPublished": true,
	"createdAt": "2026-02-14T13:15:18.123Z",
	"updatedAt": "2026-02-14T13:15:18.123Z"
}
```

**Tests**:

```javascript
if (pm.response.code === 201) {
	const data = pm.response.json()
	pm.environment.set("entry_id", data.id)
	pm.test("Entrada criada com sucesso", () => {
		pm.expect(data.id).to.exist
		pm.expect(data.focus).to.equal("Domínio de bola e passe")
	})
}
```

---

### Passo 4: Listar Todas as Entradas 📋

**Request**: `GET {{api_url}}/diary`

**Headers**:

- `Authorization: Bearer {{access_token}}`

**Body**: Deixe vazio

**Esperado**: Status `200`

**Response**: Array de entradas

```json
[
  {
    "id": "entry123abc",
    "authorId": "clp123abc456def789",
    "date": "2025-02-14T00:00:00Z",
    "focus": "Domínio de bola",
    ...
  }
]
```

---

### Passo 5: Obter Entrada Específica 🔍

**Request**: `GET {{api_url}}/diary/{{entry_id}}`

**Headers**:

- `Authorization: Bearer {{access_token}}`

**Esperado**: Status `200`

**Response**: Objeto de entrada única

---

### Passo 6: Atualizar Entrada de Diário ✏️

**Request**: `PATCH {{api_url}}/diary/{{entry_id}}`

**Headers**:

- `Content-Type: application/json`
- `Authorization: Bearer {{access_token}}`

**Body** (envie apenas campos a atualizar):

```json
{
	"focus": "Domínio de bola - ATUALIZADO",
	"techniquRating": 5,
	"notes": "Treino excelente com melhorias significativas"
}
```

**Esperado**: Status `200`

**Response**: Entrada atualizada

---

### Passo 7: Últimas 3 Entradas ⏰

**Request**: `GET {{api_url}}/diary/last-three`

**Headers**:

- `Authorization: Bearer {{access_token}}`

**Esperado**: Status `200`

**Response**: Array com até 3 entradas mais recentes

---

### Passo 8: Resumo Semanal 📊

**Request**: `GET {{api_url}}/diary/summary/weekly`

**Headers**:

- `Authorization: Bearer {{access_token}}`

**Esperado**: Status `200`

**Response**:

```json
{
  "total": 5,
  "entries": [...],
  "averageRatings": {
    "technique": 4.2,
    "physical": 3.8,
    "mental": 4.6
  }
}
```

---

### Passo 9: Resumo Mensal 📈

**Request**: `GET {{api_url}}/diary/summary/monthly?year=2025&month=2`

**Headers**:

- `Authorization: Bearer {{access_token}}`

**Esperado**: Status `200`

**Response**:

```json
{
  "year": 2025,
  "month": 2,
  "total": 12,
  "entries": [...],
  "averageRatings": {
    "technique": 4.1,
    "physical": 3.7,
    "mental": 4.5
  }
}
```

---

### Passo 10: Deletar Entrada ❌

**Request**: `DELETE {{api_url}}/diary/{{entry_id}}`

**Headers**:

- `Authorization: Bearer {{access_token}}`

**Body**: Deixe vazio

**Esperado**: Status `200`

**Response**:

```json
{
	"id": "entry123abc",
	"message": "Entrada deletada com sucesso"
}
```

---

## 📚 Referência de Endpoints

### Auth (Público)

#### 1. Registrar

```
POST /auth/register
Content-Type: application/json

{
  "email": "user@email.com",
  "name": "Full Name",
  "pass": "password123456",
  "birthDate": "2010-01-15" (opcional)
}

✅ Resposta 200/201:
{
  "access_token": "...",
  "user": {...}
}

❌ Erro 400:
{
  "message": "Email já está cadastrado"
}
```

#### 2. Login

```
POST /auth/login
Content-Type: application/json

{
  "email": "user@email.com",
  "pass": "password123456"
}

✅ Resposta 200:
{
  "access_token": "...",
  "user": {...}
}

❌ Erro 401:
{
  "message": "Email ou senha inválidos"
}
```

---

### Diary (Protegido - Requer Authorization Bearer)

#### 3. Listar Entradas

```
GET /diary
Authorization: Bearer <token>

✅ Resposta 200:
[
  {...},
  {...}
]

❌ Erro 401:
{
  "message": "Unauthorized"
}
```

#### 4. Criar Entrada

```
POST /diary
Content-Type: application/json
Authorization: Bearer <token>

{
  "date": "2025-02-14",
  "focus": "...",
  "notes": "...",
  "techniquRating": 1-5,
  "physicalRating": 1-5,
  "mentalRating": 1-5,
  "whatWentWell": "...",
  "whatWasDifficult": "...",
  "nextGoal": "..."
}

✅ Resposta 201:
{...}

❌ Erro 400:
{
  "message": "Validação falhou"
}
```

#### 5. Obter Uma Entrada

```
GET /diary/:id
Authorization: Bearer <token>

✅ Resposta 200:
{...}

❌ Erro 404:
{
  "message": "Registro não encontrado"
}
```

#### 6. Atualizar Entrada

```
PATCH /diary/:id
Content-Type: application/json
Authorization: Bearer <token>

{
  "focus": "...",
  "techniquRating": 5
}

✅ Resposta 200:
{...}
```

#### 7. Deletar Entrada

```
DELETE /diary/:id
Authorization: Bearer <token>

✅ Resposta 200:
{...}
```

#### 8. Últimas 3 Entradas

```
GET /diary/last-three
Authorization: Bearer <token>

✅ Resposta 200:
[...]
```

#### 9. Resumo Semanal

```
GET /diary/summary/weekly
Authorization: Bearer <token>

✅ Resposta 200:
{
  "total": 5,
  "entries": [...],
  "averageRatings": {
    "technique": 4.2,
    "physical": 3.8,
    "mental": 4.6
  }
}
```

#### 10. Resumo Mensal

```
GET /diary/summary/monthly?year=2025&month=2
Authorization: Bearer <token>

✅ Resposta 200:
{
  "year": 2025,
  "month": 2,
  "total": 12,
  "entries": [...],
  "averageRatings": {...}
}
```

---

## 🧪 Testes Automatizados

### Pre-request Script (Antes de cada request)

Adicione este script na aba **Pre-request Script** para validar token:

```javascript
// Validar se variável existe
const token = pm.environment.get("access_token")
if (!token && pm.request.url.path.includes("diary")) {
	console.warn(
		"⚠️ AVISO: Nenhum token encontrado. Execute /auth/register primeiro!",
	)
}
```

### Tests (Após cada request)

Exemplo completo:

```javascript
// Validação básica
pm.test("Status correto", () => {
	pm.expect(pm.response.code).to.be.oneOf([200, 201, 204])
})

// Validação de resposta JSON
pm.test("Response é JSON válido", () => {
	pm.response.to.be.ok
	pm.response.to.have.jsonBody()
})

// Salvando dados para próximas requests
if (pm.response.code === 201) {
	const data = pm.response.json()
	pm.environment.set("entry_id", data.id)
	pm.test("ID salvo para próximo teste", () => {
		pm.expect(data.id).to.exist
	})
}

// Validação específica
pm.test("Email correspond corretamente", () => {
	pm.expect(pm.response.json().user.email).to.equal("jogador@email.com")
})
```

---

## 🔄 Fluxo de Teste Completo (Copy & Paste)

Para testar tudo de uma vez, execute nessa ordem:

1. **POST /auth/register** → Obtenha token
2. **POST /auth/login** → Confirme login
3. **POST /diary** → Crie entrada (salve entry_id)
4. **GET /diary** → Liste todas
5. **GET /diary/{{entry_id}}** → Obtenha uma
6. **PATCH /diary/{{entry_id}}** → Atualize
7. **GET /diary/last-three** → Últimas 3
8. **GET /diary/summary/weekly** → Resumo semanal
9. **GET /diary/summary/monthly** → Resumo mensal
10. **DELETE /diary/{{entry_id}}** → Delete

---

## 🐛 Problemas Comuns

### Erro 401 - Unauthorized

**Causa**: Token inválido ou expirado

**Solução**:

1. Registre novamente com `/auth/register`
2. Copie o token e salve em `access_token`
3. Teste novamente

### Erro 400 - Bad Request

**Causa**: Dados inválidos

**Solução**:

1. Verifique se `date` está no formato `YYYY-MM-DD`
2. `techniquRating` deve ser 1-5, não 0 ou 6
3. `email` deve ser um email válido

### Erro 404 - Not Found

**Causa**: Entry ID incorreto

**Solução**:

1. Liste com `GET /diary`
2. Copie um ID válido
3. Use em `GET /diary/:id`

### Erro 422 - Unprocessable Entity

**Causa**: Validação falhou

**Solução**:

1. Verifique tipos de campos
2. `password` mínimo 8 caracteres
3. `email` deve ser único (não reutilize)

### Postman não salva variáveis

**Solução**:

1. Verifique se environment está ativo
2. Clique em **Save** (Ctrl+S) após adicionar
3. Verifique aba **Tests** da request (script correto?)

---

## 💡 Dicas Pro

### 1. Usar Exemplos (Examples)

1. Clique em **Examples** (abaixo de Body)
2. Clique em **Add Example**
3. Nomeie e salve
4. Reutilize depois com um clique!

### 2. Criar Pasta Organizando Requests

```
📁 Diário de Craque
  📁 Auth
    POST Register
    POST Login
  📁 Diary
    GET List
    POST Create
    GET Detail
    PATCH Update
    DELETE
  📁 Summaries
    GET Weekly
    GET Monthly
```

### 3. Usar Collections com Description

1. Clique na collection
2. Clique em **Edit**
3. Adicione **Description**:

```markdown
# Diário de Craque API Tests

Testes para validar todos os endpoints da API:

- Auth (Register, Login)
- Diary CRUD
- Summaries

**Sequência recomendada**:

1. Register
2. Create Entry
3. Get Details
4. Summary
5. Delete
```

### 4. Monitorar Requests

1. Clique em **Monitor** (sidebar esquerdo)
2. Selecione sua collection
3. Rode um test agora
4. Veja histórico de execuções

---

## 📊 Exemplo de Relatório

Após rodar os testes, Postman gera um resumo:

```
✅ Status correto: PASSED
✅ Response é JSON válido: PASSED
✅ Email corresponde corretamente: PASSED
✅ Token salvo: PASSED
⚠️ Resposta em menos de 200ms: FAILED

Total: 5 testes | Passed: 4 | Failed: 1
```

---

## 🔗 Links Úteis

- [Documentação Postman](https://learning.postman.com/)
- [Variáveis e Ambientes](https://learning.postman.com/docs/sending-requests/managing-environments/)
- [Testes em Postman](https://learning.postman.com/docs/writing-scripts/test-scripts/)
- [Collections](https://learning.postman.com/docs/collections/collections-overview/)

---

**Última atualização**: Fevereiro 14, 2026

Made with 📮 for API Testing
