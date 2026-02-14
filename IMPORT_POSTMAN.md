# Como Importar a Coleção Postman

## 🚀 Opção 1: Importar Arquivo JSON (Recomendado)

### 1. Abrir Postman

- Desktop: Execute o aplicativo Postman
- Web: Acesse [postman.com](https://web.postman.com)

### 2. Importar Coleção

1. Clique em **Import** (canto superior esquerdo)
2. Selecione **File**
3. Navegue até o arquivo `POSTMAN_COLLECTION.json` neste repositório
4. Clique em **Import**

✅ A coleção "Diário de Craque API" aparecerá na sua biblioteca

### 3. Criar Ambiente (Environment)

1. Clique em **Environments** (lado esquerdo)
2. Clique em **Create Environment**
3. Nome: `Diário de Craque Dev`
4. Adicione as variáveis:
   - `api_url` = `http://localhost:3000`
   - `access_token` = (vazio, será preenchido automaticamente)
   - `user_id` = (vazio, será preenchido automaticamente)
   - `entry_id` = (vazio, será preenchido automaticamente)
5. Clique em **Save**

### 4. Selecionar Ambiente

1. No canto superior direito, escolha o dropdown de ambiente
2. Selecione **Diário de Craque Dev**

---

## 📋 Estrutura da Coleção

```
├── Auth
│   ├── Register (POST)
│   └── Login (POST)
└── Diary
    ├── Create Entry (POST)
    ├── List Entries (GET)
    ├── Get Entry by ID (GET)
    ├── Update Entry (PATCH)
    ├── Last Three Entries (GET)
    ├── Weekly Summary (GET)
    ├── Monthly Summary (GET)
    └── Delete Entry (DELETE)
```

---

## ▶️ Como Usar

### 1. **Começar do Zero**

```
1. Run: Auth → Register
   - Insira email e senha diferentes (ex: novo.usuario@test.com)
   - Token será salvo automaticamente em {{access_token}}
   - User ID será salvo em {{user_id}}

2. Run: Diary → Create Entry
   - Crie algumas entradas com diferentes datas

3. Run: Diary → List Entries
   - Veja todas as suas entradas

4. Run: Diary → Weekly Summary
   - Veja a média das suas atividades da semana
```

### 2. **Com Usuário Existente**

```
1. Run: Auth → Login
   - Use suas credenciais
   - Token será salvo automaticamente

2. Continue com requests de Diary
```

---

## 🤖 Scripts Automáticos

Cada request tem **tests automáticos** que:

- ✅ Validam o status HTTP
- ✅ Salvam tokens/IDs automaticamente
- ✅ Verificam os campos retornados

Veja os resultados na aba **Tests** após executar cada request.

---

## 🔑 Variáveis Disponíveis

| Variável           | Descrição            | Preenchimento                 |
| ------------------ | -------------------- | ----------------------------- |
| `{{api_url}}`      | URL base da API      | Defina no ambiente            |
| `{{access_token}}` | Token JWT            | Preenchido por Register/Login |
| `{{user_id}}`      | ID do usuário logado | Preenchido por Register       |
| `{{entry_id}}`     | ID da entrada criada | Preenchido por Create Entry   |

---

## 🎯 Exemplo: Fluxo Completo em 10 Passos

1. **Auth → Register** com novo email
2. **Diary → Create Entry** (data: 2025-02-14)
3. **Diary → Create Entry** (data: 2025-02-13)
4. **Diary → Create Entry** (data: 2025-02-12)
5. **Diary → List Entries** → veja as 3 entradas
6. **Diary → Last Three Entries** → veja resumo
7. **Diary → Weekly Summary** → veja média da semana
8. **Diary → Monthly Summary** → veja média do mês
9. **Diary → Update Entry** → edite a última
10. **Diary → Delete Entry** → delete uma entrada

---

## 🆘 Troubleshooting

### "401 Unauthorized"

- ❌ Você fez register/login primeiro?
- ✅ Vá em Auth → Register (nova conta) ou Auth → Login (conta existente)

### "Token not found"

- ❌ `{{access_token}}` está vazio?
- ✅ Execute Register ou Login primeiro
- ✅ Verifique se o ambiente está selecionado

### "Entry não encontrada"

- ❌ Você criou uma entrada?
- ✅ Execute Diary → Create Entry primeiro
- ✅ Verifique se `{{entry_id}}` foi preenchido na resposta anterior

### API retorna erro 500

- ❌ Servidor está rodando em http://localhost:3000?
- ✅ Execute `npm run start:dev` na pasta `/api`
- ✅ Verifique se PostgreSQL está rodando: `docker-compose up`

---

## 💡 Dicas Pro

1. **Reutilize tokens**
   - Uma vez logado, o mesmo token funciona para vários requests
   - Não precisa fazer login a cada request

2. **Monitore requisições**
   - Abra DevTools no navegador (F12)
   - Aba Network para ver URLs, headers, respostas

3. **Exporte dados**
   - Clique em **Diary → List Entries**
   - Salve o JSON com Ctrl+A, Ctrl+C
   - Cole em um editor de texto para análise

4. **Teste validações**
   - Tente criar entry com `techniquRating: 6` (deve falhar)
   - Tente com email inválido em Register
   - Observe mensagens de erro

---

## 📚 Recursos Adicionais

- [Documentação Postman](https://learning.postman.com/)
- [Guia de Testes](./POSTMAN_TESTING.md)
- [README do Projeto](./README.md)
- [API Endpoints Reference](./README.md#-endpoints-da-api)

---

**Pronto para testar?** 🎯

1. Selecione o ambiente "Diário de Craque Dev"
2. Clique em Auth → Register
3. Observe o token ser salvo automaticamente ✅
4. Aproveite!
