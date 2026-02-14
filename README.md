# ⚽ Diário de Craque - MVP

> **Plataforma digital para jogadores de futebol registrarem e acompanharem sua evolução através de diários estruturados.**

[![Status](https://img.shields.io/badge/status-In%20Development-yellow)]()
[![Node.js](https://img.shields.io/badge/Node.js-v22%2B-brightgreen)]()
[![License](https://img.shields.io/badge/license-MIT-blue)]()

## 🎯 Sobre o Projeto

**Diário de Craque** é um Progressive Web App (PWA) que permite jovens jogadores de futebol (10-16 anos) registrar suas percepções sobre cada treino, acompanhar sua evolução técnica, física e mental, e refletir sobre seu desempenho de forma estruturada.

### Visão

Ser a principal ferramenta digital para o desenvolvimento de jovens atletas de futebol, conectando o feedback dos treinos com a percepção de evolução do próprio jogador.

### Público-alvo

- 👨‍👧 Jovens jogadores de futebol (10-16 anos)
- 👪 Pais que querem acompanhar evolução do filho
- 🏆 Treinadores (fase 2+)

---

## ✨ Funcionalidades do MVP

### ✅ Autenticação

- Cadastro com email e senha
- Login seguro com JWT
- Recuperação de senha (fase 2)

### ✅ Dashboard Principal

- Visão geral da semana atual
- Acesso rápido para novo registro
- Últimas 3 entradas do diário

### ✅ Gerenciamento de Diário (CRUD)

- **Criar**: Forma completo com 8 campos estruturados
- **Visualizar**: Leitura de registros passados
- **Editar**: Correção de registros
- **Deletar**: Remover registros

### ✅ Acompanhamento de Evolução

- **Revisão Semanal**: Agrupa últimos 7 registros com médias
- **Revisão Mensal**: Visa com gráficos de notas de autoavaliação

### ✅ PWA Ready

- Instalável como app mobile
- Funciona offline com cache
- Sincronização automática

---

## 🛠️ Stack Tecnológico

### Backend

| Tecnologia     | Versão  | Propósito         |
| -------------- | ------- | ----------------- |
| **Node.js**    | v22 LTS | Runtime           |
| **NestJS**     | 11+     | Framework backend |
| **TypeScript** | 5.7+    | Tipagem           |
| **Prisma**     | 5+      | ORM               |
| **PostgreSQL** | 16      | Banco de dados    |
| **JWT**        | -       | Autenticação      |
| **bcrypt**     | 6+      | Hash de senha     |

### Frontend

| Tecnologia       | Versão | Propósito        |
| ---------------- | ------ | ---------------- |
| **React**        | 19+    | UI Framework     |
| **TypeScript**   | 5.7+   | Tipagem          |
| **Vite**         | 5+     | Build tool       |
| **Tailwind CSS** | 4+     | Styling          |
| **Zustand**      | -      | State management |
| **React Router** | v6     | Roteamento       |

### DevOps

| Tecnologia         | Versão | Propósito       |
| ------------------ | ------ | --------------- |
| **Docker**         | Latest | Containerização |
| **Docker Compose** | Latest | Orquestração    |

---

## 📋 Pré-requisitos

- **Node.js** v22 ou superior
- **npm** ou **yarn**
- **Docker** e **Docker Compose**
- **Git**

### Verificar versões

```bash
node --version      # v22.x.x
npm --version       # 10.x.x
docker --version    # 27.x.x
```

---

## 🚀 Instalação e Setup

### 1. Clone o Repositório

```bash
git clone https://github.com/seu-usuario/diariodeumcraque.git
cd diariodeumcraque
```

### 2. Inicie o Banco de Dados

```bash
# Inicia PostgreSQL via Docker
docker-compose up -d

# Verifica se está rodando
docker-compose ps
```

Output esperado:

```
NAME                COMMAND                  SERVICE      STATUS
diariodeumcraque-postgres-1   "docker-entrypoint.s..."   postgres   Up 2 seconds
```

### 3. Configure o Backend

```bash
cd api

# Instale dependências
npm install

# Configure banco de dados
npx prisma migrate dev --name init

# Gere cliente Prisma
npx prisma generate

# (Opcional) Visualize o banco em GUI
npx prisma studio
```

### 4. Configure o Frontend

```bash
cd ../web

# Instale dependências
npm install
```

---

## 🎮 Executar o Projeto

### Backend (Terminal 1)

```bash
cd api
npm run start:dev
```

Output esperado:

```
...
[Nest] 12345 - 02/14/2026, 10:30:00 AM     LOG [NestFactory] Starting Nest application...
Server is running on port 3000
```

✅ Backend disponível em: **http://localhost:3000**

### Frontend (Terminal 2)

```bash
cd web
npm run dev
```

Output esperado:

```
  ➜  Local:   http://localhost:5173/
```

✅ Frontend disponível em: **http://localhost:5173**

---

## 🧪 Testar a Aplicação

### ⚠️ IMPORTANTE: Ordem de Operações

1. **PRIMEIRO**: Registrar um novo usuário (`/auth/register`)
2. **DEPOIS**: Fazer login (`/auth/login`)
3. **ENTÃO**: Usar o token para acessar rotas protegidas

---

### 1. Registrar novo usuário

**Via cURL:**

```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "jogador@email.com",
    "name": "João Da Silva",
    "pass": "senha123456",
    "birthDate": "2010-05-15"
  }'
```

**Resposta esperada:**

```json
{
	"access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
	"user": {
		"id": "clp123abc...",
		"email": "jogador@email.com",
		"name": "João Da Silva",
		"role": "ATHLETE"
	}
}
```

✅ **Salve o `access_token` para os próximos passos!**

### 2. Fazer login

```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "jogador@email.com",
    "pass": "senha123456"
  }'
```

**Resposta (deve ser igual ao registro):**

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {...}
}
```

### 3. Criar entrada de diário

**Com o token recebido (substitua YOUR_TOKEN_HERE):**

```bash
curl -X POST http://localhost:3000/diary \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "date": "2025-02-14",
    "focus": "Domínio de bola",
    "notes": "Treino de técnica foi muito bom hoje",
    "techniquRating": 4,
    "physicalRating": 3,
    "mentalRating": 5,
    "whatWentWell": "Consegui fazer dribles bons",
    "whatWasDifficult": "Chutes de longa distância ainda fraco",
    "nextGoal": "Melhorar precisão nos passes"
  }'
```

### 4. Acessar no navegador

1. Abra **http://localhost:5173**
2. Clique em "Cadastro"
3. Preencha o formulário com os dados
4. Pronto! ⚽

---

## 📁 Estrutura do Projeto

```
diariodeumcraque/
│
├── api/                              # Backend NestJS
│   ├── src/
│   │   ├── auth/                     # Autenticação
│   │   │   ├── auth.service.ts       # Lógica de auth
│   │   │   ├── auth.controller.ts    # Endpoints de auth
│   │   │   ├── jwt.strategy.ts       # Estratégia JWT
│   │   │   ├── guards/
│   │   │   │   └── jwt-auth.guard.ts
│   │   │   └── dto/
│   │   │       ├── login.dto.ts
│   │   │       └── register.dto.ts
│   │   │
│   │   ├── users/                    # Gestão de usuários
│   │   │   ├── users.service.ts
│   │   │   ├── users.controller.ts
│   │   │   └── dto/
│   │   │
│   │   ├── diary/                    # Lógica de diário
│   │   │   ├── diary.service.ts      # CRUD + resumos
│   │   │   ├── diary.controller.ts   # Endpoints
│   │   │   └── dto/
│   │   │
│   │   ├── prisma/                   # Configuração Prisma
│   │   ├── app.module.ts             # Módulo principal
│   │   └── main.ts                   # Entry point
│   │
│   ├── prisma/
│   │   ├── schema.prisma             # Modelos de dados
│   │   └── migrations/
│   │
│   ├── .env                          # Variáveis de ambiente
│   ├── .env.example                  # Template
│   └── package.json
│
├── web/                              # Frontend React
│   ├── src/
│   │   ├── pages/
│   │   │   ├── LoginPage.tsx
│   │   │   ├── RegisterPage.tsx
│   │   │   ├── DashboardPage.tsx
│   │   │   ├── EntryDetailPage.tsx
│   │   │   ├── EditEntryPage.tsx
│   │   │   ├── WeeklyReviewPage.tsx
│   │   │   └── MonthlyReviewPage.tsx
│   │   │
│   │   ├── components/
│   │   │   └── Layout.tsx             # Navegação principal
│   │   │
│   │   ├── lib/
│   │   │   ├── store.ts              # Zustand stores
│   │   │   └── api.ts                # API client
│   │   │
│   │   ├── App.tsx                   # Router principal
│   │   └── main.tsx
│   │
│   ├── public/
│   │   ├── manifest.json             # PWA manifest
│   │   └── service-worker.js         # Service Worker
│   │
│   ├── .env                          # Variáveis de ambiente
│   └── package.json
│
├── docker-compose.yml                # PostgreSQL config
├── README.md                         # Este arquivo
└── REFACTORING_SUMMARY.md            # Detalhes técnicos
```

---

## 🔐 Autenticação & Segurança

### Fluxo de Autenticação

```
┌─────────────┐                    ┌──────────────┐
│   Frontend  │                    │   Backend    │
└──────┬──────┘                    └──────┬───────┘
       │                                  │
       │  1. POST /auth/register         │
       ├─────────────────────────────────>│
       │     (email, pass, name)         │
       │                                  │ Hash password
       │                                  │ Cria user
       │  2. Retorna token + user        │
       │<─────────────────────────────────┤
       │                                  │
       │  3. Armazena em Zustand        │
       │     (persistido no localStorage) │
       │                                  │
       │  4. GET /diary                  │
       │     + Authorization header      │
       ├─────────────────────────────────>│
       │                                  │ Valida JWT
       │  5. Retorna dados              │
       │<─────────────────────────────────┤
```

### Segurança

- ✅ **Senhas**: Hash com bcrypt (10 rounds)
- ✅ **JWT**: Token com expiração de 24 horas
- ✅ **CORS**: Habilitado apenas para frontend
- ✅ **Input Validation**: Todos os DTOs com class-validator
- ✅ **Proteção de Rotas**: JwtAuthGuard em rotas privadas
- ⏳ **Rate Limiting**: A implementar
- ⏳ **HTTPS**: Obrigatório em produção

---

## 📚 API Reference

### Base URL

```
http://localhost:3000
```

### Headers Obrigatórios (Rotas Protegidas)

```
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

### Endpoints

#### Auth (Público)

| Método | Endpoint         | Descrição              |
| ------ | ---------------- | ---------------------- |
| `POST` | `/auth/register` | Registrar novo usuário |
| `POST` | `/auth/login`    | Fazer login            |

#### Users (Protegido)

| Método | Endpoint         | Descrição               |
| ------ | ---------------- | ----------------------- |
| `GET`  | `/users/profile` | Dados do usuário logado |

#### Diary (Protegido)

| Método   | Endpoint                                   | Descrição                |
| -------- | ------------------------------------------ | ------------------------ |
| `GET`    | `/diary`                                   | Listar todas as entradas |
| `POST`   | `/diary`                                   | Criar nova entrada       |
| `GET`    | `/diary/:id`                               | Detalhes de uma entrada  |
| `PATCH`  | `/diary/:id`                               | Atualizar uma entrada    |
| `DELETE` | `/diary/:id`                               | Deletar uma entrada      |
| `GET`    | `/diary/last-three`                        | Últimas 3 entradas       |
| `GET`    | `/diary/summary/weekly`                    | Resumo semanal           |
| `GET`    | `/diary/summary/monthly?year=2025&month=2` | Resumo mensal            |

### Exemplos de Resposta

#### POST /auth/register

```json
{
	"access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
	"user": {
		"id": "clp123abc456def789",
		"email": "jogador@email.com",
		"name": "João Silva",
		"role": "ATHLETE"
	}
}
```

#### GET /diary

```json
[
	{
		"id": "entry123",
		"date": "2025-02-14T00:00:00Z",
		"focus": "Domínio de bola",
		"notes": "Treino foi bom",
		"techniquRating": 4,
		"physicalRating": 3,
		"mentalRating": 5,
		"whatWentWell": "Dribles",
		"whatWasDifficult": "Passes longos",
		"nextGoal": "Melhorar passes"
	}
]
```

#### GET /diary/summary/weekly

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

## 🌐 Variáveis de Ambiente

### Backend (`api/.env`)

```env
# Database
DATABASE_URL="postgresql://admin:password@localhost:5432/diariodecraque"

# JWT
JWT_SECRET="sua-chave-secreta-muito-segura-mudar-em-producao"

# Server
PORT=3000
NODE_ENV="development"

# CORS
CORS_ORIGIN="http://localhost:5173"
```

### Frontend (`web/.env`)

```env
VITE_API_URL=http://localhost:3000
```

---

## 🛠️ Scripts Disponíveis

### Backend

```bash
cd api

# Desenvolvimento com hot reload
npm run start:dev

# Build para produção
npm run build

# Rodar em produção
npm run start:prod

# Testes unitários
npm run test

# Migrations Prisma
npx prisma migrate dev
npx prisma migrate deploy
npx prisma studio    # GUI do banco
```

### Frontend

```bash
cd web

# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview da build
npm run preview

# Lint
npm run lint
```

---

## 📊 Modelo de Dados

### User

```typescript
{
  id: string;              // CUID único
  email: string;           // Email da conta
  password: string;        // Hash bcrypt
  name: string;            // Nome completo
  birthDate?: DateTime;    // Data de nascimento
  role: 'ATHLETE' | 'PARENT' | 'COACH' | 'ADMIN';
  isActive: boolean;       // Ativo/inativo
  createdAt: DateTime;
  updatedAt: DateTime;
  entries: DiaryEntry[];   // Relação com entradas
}
```

### DiaryEntry

```typescript
{
  id: string;              // CUID único
  authorId: string;        // FK para User
  date: DateTime;          // Data do treino
  focus?: string;          // O que focou (até 500 chars)
  notes?: string;          // Anotações (até 2000 chars)
  techniquRating?: 1-5;    // Nota técnica (1-5)
  physicalRating?: 1-5;    // Nota física (1-5)
  mentalRating?: 1-5;      // Nota mental (1-5)
  whatWentWell?: string;   // Pontos positivos (até 1000 chars)
  whatWasDifficult?: string; // Dificuldades (até 1000 chars)
  nextGoal?: string;       // Próximas metas (até 500 chars)
  isPublished: boolean;    // Visibilidade
  createdAt: DateTime;
  updatedAt: DateTime;
}
```

---

## 📱 PWA - Progressive Web App

### Funcionalidades Planejadas

- ✅ Instalável como app mobile
- ✅ Funciona offline com Service Worker
- ✅ Cache inteligente de assets
- ✅ Sincronização automática quando volta online
- 🔄 Notificações push (fase 2)
- 🔄 Modo escuro (implementado no layout)

### Como Instalar

**Desktop (Chrome/Edge):**

1. Abra http://localhost:5173
2. Clique no ícone de instalação (canto superior direito)
3. Instale

**Mobile (Android/iOS):**

1. Abra no navegador do telefone
2. Menu → "Instalar app" ou "Add to Home Screen"

---

## 🐛 Troubleshooting

### Erro 401 ao fazer Login

**Causa**: Você precisa REGISTRAR primeiro antes de fazer login.

```bash
# 1️⃣ PRIMEIRO: Registrar novo usuário
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "jogador@email.com",
    "name": "João Da Silva",
    "pass": "senha123456",
    "birthDate": "2010-05-15"
  }'

# Você receberá um access_token aqui ✅

# 2️⃣ DEPOIS: Fazer login com as mesmas credenciais
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "jogador@email.com",
    "pass": "senha123456"
  }'
```

### Erro: "Cannot find module '@nestjs/config'"

```bash
cd api

# Instalar dependências faltantes
npm install --legacy-peer-deps @nestjs/config class-validator class-transformer

# Reexecutar migrações
npx prisma migrate dev --name init
```

### Erro: "DATABASE_URL not found"

```bash
# Criar .env baseado no .env.example
cp api/.env.example api/.env

# Certificar que tem a URL do banco
cat api/.env | grep DATABASE_URL
```

### Erro: "Cannot connect to PostgreSQL"

```bash
# Verificar se Docker está rodando
docker-compose ps

# Se não estiver, iniciar
docker-compose up -d

# Testar conexão
docker-compose logs postgres
```

### Erro: "Port 3000 already in use"

```bash
# Verificar qual processo está usando a porta
lsof -i :3000

# Matar o processo
kill -9 <PID>

# Ou usar porta diferente no .env
echo "PORT=3001" >> api/.env
```

### Erro: "Migrations failed"

```bash
cd api

# Resetar banco (⚠️ Deleta todos os dados!)
npx prisma migrate reset

# Ou apenas aplicar migrações pendentes
npx prisma migrate deploy

# Verificar status
npx prisma migrate status
```

### Servidor não inicia após instalar dependências

```bash
cd api

# Limpar cache e reinstalar
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps

# Reexecutar migrações
npx prisma migrate dev

# Reiniciar servidor
npm run start:dev
```

---

## 📚 Documentação Adicional

- **Arquitetura Detalhada**: Ver [REFACTORING_SUMMARY.md](./REFACTORING_SUMMARY.md)
- **Contexto do Projeto**: Ver [contexts/](./contexts/)
- **NestJS Docs**: https://docs.nestjs.com
- **Prisma Docs**: https://www.prisma.io/docs
- **React Docs**: https://react.dev
- **Tailwind CSS**: https://tailwindcss.com

---

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

---

## 📞 Suporte

Dúvidas? Abra uma issue no GitHub ou entre em contato através do email.

---

## 🗺️ Roadmap

### ✅ Sprint 0-1: MVP Base (ATUAL)

- [x] Autenticação
- [x] CRUD de Diário
- [x] Dashboard
- [x] Revisões semanal/mensal

### 🔄 Sprint 2: PWA & Offline

- [ ] Service Worker
- [ ] Cache inteligente
- [ ] Sincronização automática
- [ ] Testes E2E

### 🎯 Sprint 3: Polimento & Deploy

- [ ] Otimização de performance
- [ ] Responsividade 100%
- [ ] Deploy (Vercel + Render)
- [ ] Monitoramento (Sentry)

### 🚀 Fase 2: Expansão

- [ ] Contas para treinadores
- [ ] Gamificação
- [ ] Integração com Stripe
- [ ] App nativo (React Native)

---

**Última atualização**: Fevereiro 14, 2026

Made with ⚽ for young athletes
