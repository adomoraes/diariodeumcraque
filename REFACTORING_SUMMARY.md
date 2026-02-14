# 🚀 Diário de Craque - Refatoração Completa

## 📋 Resumo das Mudanças

Este documento descreve a refatoração completa do projeto Diário de Craque, alinhado com os requisitos do MVP conforme definido em `/contexts`.

### ✅ Refatorações Implementadas

#### **Backend (NestJS)**

- ✅ Schema Prisma refatorado com todos os campos necessários para o MVP
- ✅ Auth Service completo com JWT, hash de senha e validações
- ✅ Todos os DTOs com class-validator para validação automática
- ✅ Diary Service com CRUD completo + cálculo de médias
- ✅ Users Service melhorado com segurança de senha
- ✅ Configuração global de ValidationPipe
- ✅ ConfigService para variáveis de ambiente
- ✅ CORS habilitado
- ✅ Endpoints para resumos semanal e mensal

#### **Frontend (React + Vite)**

- ✅ Store Zustand completo com Auth e Diary
- ✅ API Client centralizado com tratamento de erro
- ✅ Roteamento público/privado com ProtectedRoute
- ✅ Layout melhorado com navegação
- ✅ Variáveis de ambiente (.env)
- ✅ Tailwind CSS configurado

#### **Configuração**

- ✅ `.env` configurado para Development (Backend)
- ✅ `.env` configurado para Frontend (Vite)
- ✅ Docker Compose com PostgreSQL 16
- ✅ Dependências atualizadas (class-validator, class-transformer, @nestjs/config)

---

## 🚀 Como Executar o Projeto

### Pré-requisitos

- Node.js v22+
- Docker e Docker Compose
- PostgreSQL 16

### 1. Setup Inicial

```bash
# Clone o repositório (se necessário)
cd /home/adomoraes/projects/diariodeumcraque

# Inicie o PostgreSQL via Docker
docker-compose up -d

# Aguarde 5 segundos para o banco iniciar

# Instale dependências do backend
cd api
npm install

# Instale dependências do frontend
cd ../web
npm install

cd ..
```

### 2. Backend - Inicializar Banco de Dados

```bash
cd api

# Crie as migrações baseado no schema refatorado
npx prisma migrate dev --name init

# Gere o cliente Prisma
npx prisma generate

# Teste a conexão (opcional)
npx prisma db seed 2>/dev/null || echo "Seed opcional - ignora se falhar"
```

### 3. Backend - Executar

```bash
cd api

# Desenvolvimento (com hot reload)
npm run start:dev

# Produção
npm run build
npm run start:prod
```

Servidor estará em: `http://localhost:3000`

### 4. Frontend - Executar

```bash
cd web

# Desenvolvimento (com hot reload)
npm run dev

# Build para produção
npm run build

# Preview da build
npm run preview
```

Aplicação estará em: `http://localhost:5173`

---

## 🔐 Autenticação & Segurança

### Credenciais de Teste

**Backend:**

- JWT_SECRET: `sua-chave-secreta-muito-segura-aqui-mude-em-producao` (mudar em produção)
- Tokens expiram em 24 horas

**Banco de Dados:**

- User: `admin`
- Password: `password`
- Database: `diariodecraque`

### Fluxo de Autenticação

1. Usuário se registra ou faz login via `/auth/register` ou `/auth/login`
2. Backend retorna `access_token` e dados do `user`
3. Frontend armazena token em Zustand com persistência
4. Token é enviado em todas as requisições via header `Authorization: Bearer <token>`
5. Rotas protegidas validam JWT via `JwtAuthGuard`

---

## 📚 Estrutura de Dados

### User Model

```typescript
{
  id: string;           // CUID
  email: string;        // Único
  password: string;     // Hash com bcrypt
  name: string;
  birthDate?: DateTime;
  role: UserRole;       // ATHLETE, PARENT, COACH, ADMIN
  isActive: boolean;
}
```

### DiaryEntry Model

```typescript
{
  id: string;              // CUID
  authorId: string;        // FK para User
  date: DateTime;          // Data do registro
  focus?: string;          // O que focou no treino
  notes?: string;          // Anotações gerais
  techniquRating?: 1-5;    // Autoavaliação técnica
  physicalRating?: 1-5;    // Autoavaliação física
  mentalRating?: 1-5;      // Autoavaliação mental
  whatWentWell?: string;   // O que foi bem
  whatWasDifficult?: string; // O que foi difícil
  nextGoal?: string;       // Meta próxima
  isPublished: boolean;
}
```

---

## 🔌 API Endpoints

### Auth

- `POST /auth/register` - Cadastro de novo usuário
- `POST /auth/login` - Login (retorna token + user)

### Users (Protegido)

- `GET /users/profile` - Dados do usuário logado

### Diary (Protegido)

- `GET /diary` - Lista todas as entradas do usuário
- `POST /diary` - Cria nova entrada
- `GET /diary/:id` - Detalhes de uma entrada
- `PATCH /diary/:id` - Atualiza uma entrada
- `DELETE /diary/:id` - Deleta uma entrada
- `GET /diary/last-three` - Últimas 3 entradas
- `GET /diary/summary/weekly` - Resumo semanal
- `GET /diary/summary/monthly?year=2025&month=2` - Resumo mensal

---

## 🛠️ Variáveis de Ambiente

### Backend (`api/.env`)

```env
DATABASE_URL="postgresql://admin:password@localhost:5432/diariodecraque"
JWT_SECRET="sua-chave-secreta-muito-segura-aqui-mude-em-producao"
PORT=3000
NODE_ENV="development"
CORS_ORIGIN="http://localhost:5173"
```

### Frontend (`web/.env`)

```env
VITE_API_URL=http://localhost:3000
```

---

## 📦 Dependências Principais Adicionadas

### Backend

- `class-validator`: Validação automática de DTOs
- `class-transformer`: Transformação de dados
- `@nestjs/config`: Gerenciar variáveis de ambiente

### Frontend

- _(Já estava configurado com Zustand)_

---

## ✅ Checklist do MVP

- [x] Autenticação (Cadastro, Login, Logout)
- [x] CRUD de Diário Completo
- [x] Validação em DTOs
- [x] Dashboard com últimas entradas
- [x] Revisão Semanal (com cálculo de médias)
- [x] Revisão Mensal (com cálculo de médias)
- [x] Roteamento público/privado
- [x] Store global (Zustand)
- [x] API Client centralizado
- [ ] PWA (Service Worker) - Próxima etapa
- [ ] Testes E2E - Próxima etapa

---

## 🐛 Próximas Etapas

1. **PWA - Sprint 4**
   - Implementar Service Worker
   - Configurar manifest.json
   - Cache de assets e dados
   - Sincronização offline

2. **Testes**
   - Testes unitários (Jest)
   - Testes E2E (Cypress/Playwright)

3. **Polimento & Deploy**
   - Otimização de performance
   - Responsividade mobile
   - Deploy no Vercel (frontend) e Render (backend)

---

## 📖 Recursos

- [NestJS Docs](https://docs.nestjs.com)
- [Prisma Docs](https://www.prisma.io/docs/)
- [React Docs](https://react.dev)
- [Zustand Docs](https://github.com/pmndrs/zustand)
- [Tailwind CSS](https://tailwindcss.com)

---

**Última atualização:** Fevereiro 14, 2026
