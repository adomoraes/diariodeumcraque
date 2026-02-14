# Postman Collection - Diário de Craque API

Coleção pronta para importar no Postman com todos os endpoints da API.

## 📦 Arquivo: `POSTMAN_COLLECTION.json`

### Como usar:

1. Abra Postman (desktop ou web)
2. Clique em **Import**
3. Selecione `POSTMAN_COLLECTION.json`
4. ✅ A coleção será importada automaticamente

### Estrutura:

- **Auth** - Register e Login
- **Diary** - Create, Read, Update, Delete, Summaries

### Variáveis Automáticas:

- `{{api_url}}` - URL da API
- `{{access_token}}` - Token JWT salvo automaticamente
- `{{user_id}}` - ID do usuário
- `{{entry_id}}` - ID da entrada

### Scripts Automáticos:

Cada request tem testes que validam:

- ✅ Status HTTP correto
- ✅ Campos obrigatórios na resposta
- ✅ Salvamento automático de tokens/IDs

---

## 🚀 Quick Start

```bash
# 1. Registrar novo usuário
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "jogador@email.com",
    "name": "João Silva",
    "pass": "senha123456",
    "birthDate": "2010-05-15"
  }'

# 2. Fazer login
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "jogador@email.com",
    "pass": "senha123456"
  }'

# 3. Criar entrada (use o token do login)
curl -X POST http://localhost:3000/diary \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer seu_token_aqui" \
  -d '{
    "date": "2025-02-14",
    "focus": "Domínio de bola",
    "notes": "Treino excellente",
    "techniquRating": 4,
    "physicalRating": 3,
    "mentalRating": 5,
    "whatWentWell": "Bom controle",
    "whatWasDifficult": "Passes longos",
    "nextGoal": "Melhorar precisão"
  }'
```

---

## 📝 Referência Rápida

| Método | Endpoint                 | Descrição          |
| ------ | ------------------------ | ------------------ |
| POST   | `/auth/register`         | Criar conta        |
| POST   | `/auth/login`            | Fazer login        |
| GET    | `/diary`                 | Listar entradas    |
| POST   | `/diary`                 | Criar entrada      |
| GET    | `/diary/{id}`            | Obter entrada      |
| PATCH  | `/diary/{id}`            | Atualizar entrada  |
| DELETE | `/diary/{id}`            | Deletar entrada    |
| GET    | `/diary/last-three`      | Últimas 3 entradas |
| GET    | `/diary/summary/weekly`  | Resumo semanal     |
| GET    | `/diary/summary/monthly` | Resumo mensal      |

---

Ver [IMPORT_POSTMAN.md](./IMPORT_POSTMAN.md) para instruções detalhadas de configuração.
