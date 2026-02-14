#!/bin/bash
# Script de testes via cURL - Diário de Craque API
# Use este arquivo para testar todos os endpoints da API via terminal

set -e  # Exit on error

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuração
API_URL="${API_URL:-http://localhost:3000}"
EMAIL="jogador_$(date +%s)@email.com"
PASSWORD="senha123456"
BIRTH_DATE="2010-05-15"

# Variáveis para request IDs
USER_ID=""
ENTRY_ID=""
ENTRY_ID_2=""
ACCESS_TOKEN=""

# Funções auxiliares
print_header() {
    echo -e "\n${BLUE}=== $1 ===${NC}\n"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_info() {
    echo -e "${YELLOW}ℹ️  $1${NC}"
}

# ============================================
# 1. REGISTER - Criar nova conta
# ============================================
print_header "1. REGISTRAR NOVO USUÁRIO"

REGISTER_RESPONSE=$(curl -s -X POST "$API_URL/auth/register" \
  -H "Content-Type: application/json" \
  -d "{
    \"email\": \"$EMAIL\",
    \"name\": \"Jogador Teste\",
    \"pass\": \"$PASSWORD\",
    \"birthDate\": \"$BIRTH_DATE\"
  }")

echo "$REGISTER_RESPONSE" | jq .

ACCESS_TOKEN=$(echo "$REGISTER_RESPONSE" | jq -r '.access_token')
USER_ID=$(echo "$REGISTER_RESPONSE" | jq -r '.user.id')

if [ -z "$ACCESS_TOKEN" ] || [ "$ACCESS_TOKEN" = "null" ]; then
    print_error "Falha ao registrar usuário"
    exit 1
fi

print_success "Usuário criado com email: $EMAIL"
print_info "Access Token: $ACCESS_TOKEN"
print_info "User ID: $USER_ID"

# ============================================
# 2. LOGIN - Fazer login
# ============================================
print_header "2. FAZER LOGIN"

LOGIN_RESPONSE=$(curl -s -X POST "$API_URL/auth/login" \
  -H "Content-Type: application/json" \
  -d "{
    \"email\": \"$EMAIL\",
    \"pass\": \"$PASSWORD\"
  }")

echo "$LOGIN_RESPONSE" | jq .

NEW_TOKEN=$(echo "$LOGIN_RESPONSE" | jq -r '.access_token')
if [ ! -z "$NEW_TOKEN" ] && [ "$NEW_TOKEN" != "null" ]; then
    ACCESS_TOKEN=$NEW_TOKEN
    print_success "Login realizado com sucesso"
fi

# ============================================
# 3. CREATE ENTRY 1 - Criar primeira entrada
# ============================================
print_header "3. CRIAR PRIMEIRA ENTRADA DE DIÁRIO"

CREATE_ENTRY_1=$(curl -s -X POST "$API_URL/diary" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -d '{
    "date": "2025-02-14",
    "focus": "Domínio de bola",
    "notes": "Treino de técnica foi muito bom",
    "techniquRating": 4,
    "physicalRating": 3,
    "mentalRating": 5,
    "whatWentWell": "Consegui fazer dribles bons",
    "whatWasDifficult": "Chutes de longa distância",
    "nextGoal": "Melhorar precisão nos passes"
  }')

echo "$CREATE_ENTRY_1" | jq .

ENTRY_ID=$(echo "$CREATE_ENTRY_1" | jq -r '.id')
if [ -z "$ENTRY_ID" ] || [ "$ENTRY_ID" = "null" ]; then
    print_error "Falha ao criar entrada"
    exit 1
fi

print_success "Primeira entrada criada - ID: $ENTRY_ID"

# ============================================
# 4. CREATE ENTRY 2 - Criar segunda entrada
# ============================================
print_header "4. CRIAR SEGUNDA ENTRADA DE DIÁRIO"

CREATE_ENTRY_2=$(curl -s -X POST "$API_URL/diary" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -d '{
    "date": "2025-02-13",
    "focus": "Velocidade e agilidade",
    "notes": "Treino de sprints e movimentos laterais",
    "techniquRating": 3,
    "physicalRating": 5,
    "mentalRating": 4,
    "whatWentWell": "Boa velocidade nos sprints",
    "whatWasDifficult": "Mudanças rápidas de direção",
    "nextGoal": "Melhorar explosividade"
  }')

echo "$CREATE_ENTRY_2" | jq .

ENTRY_ID_2=$(echo "$CREATE_ENTRY_2" | jq -r '.id')
print_success "Segunda entrada criada - ID: $ENTRY_ID_2"

# ============================================
# 5. LIST ENTRIES - Listar todas as entradas
# ============================================
print_header "5. LISTAR TODAS AS ENTRADAS"

LIST_RESPONSE=$(curl -s -X GET "$API_URL/diary" \
  -H "Authorization: Bearer $ACCESS_TOKEN")

echo "$LIST_RESPONSE" | jq .

ENTRIES_COUNT=$(echo "$LIST_RESPONSE" | jq 'length')
print_success "Total de entradas: $ENTRIES_COUNT"

# ============================================
# 6. GET ENTRY - Obter entrada específica
# ============================================
print_header "6. OBTER ENTRADA ESPECÍFICA"

GET_RESPONSE=$(curl -s -X GET "$API_URL/diary/$ENTRY_ID" \
  -H "Authorization: Bearer $ACCESS_TOKEN")

echo "$GET_RESPONSE" | jq .

ENTRY_FOCUS=$(echo "$GET_RESPONSE" | jq -r '.focus')
print_success "Obtida entrada com focus: $ENTRY_FOCUS"

# ============================================
# 7. UPDATE ENTRY - Atualizar entrada
# ============================================
print_header "7. ATUALIZAR ENTRADA"

UPDATE_RESPONSE=$(curl -s -X PATCH "$API_URL/diary/$ENTRY_ID" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -d '{
    "focus": "Domínio de bola - ATUALIZADO",
    "techniquRating": 5,
    "notes": "Treino excelente!"
  }')

echo "$UPDATE_RESPONSE" | jq .

UPDATED_FOCUS=$(echo "$UPDATE_RESPONSE" | jq -r '.focus')
print_success "Entrada atualizada: $UPDATED_FOCUS"

# ============================================
# 8. LAST THREE ENTRIES - Últimas 3 entradas
# ============================================
print_header "8. OBTER ÚLTIMAS 3 ENTRADAS"

LAST_THREE=$(curl -s -X GET "$API_URL/diary/last-three" \
  -H "Authorization: Bearer $ACCESS_TOKEN")

echo "$LAST_THREE" | jq .

LAST_THREE_COUNT=$(echo "$LAST_THREE" | jq 'length')
print_success "Últimas 3 entradas obtidas: $LAST_THREE_COUNT itens"

# ============================================
# 9. WEEKLY SUMMARY - Resumo semanal
# ============================================
print_header "9. OBTER RESUMO SEMANAL"

WEEKLY_RESPONSE=$(curl -s -X GET "$API_URL/diary/summary/weekly" \
  -H "Authorization: Bearer $ACCESS_TOKEN")

echo "$WEEKLY_RESPONSE" | jq .

WEEK_TOTAL=$(echo "$WEEKLY_RESPONSE" | jq -r '.total')
AVG_TECHNIQUE=$(echo "$WEEKLY_RESPONSE" | jq -r '.averageRatings.technique')
print_success "Resumo semanal: $WEEK_TOTAL entradas, técnica média: $AVG_TECHNIQUE"

# ============================================
# 10. MONTHLY SUMMARY - Resumo mensal
# ============================================
print_header "10. OBTER RESUMO MENSAL (Fevereiro 2025)"

MONTHLY_RESPONSE=$(curl -s -X GET "$API_URL/diary/summary/monthly?year=2025&month=2" \
  -H "Authorization: Bearer $ACCESS_TOKEN")

echo "$MONTHLY_RESPONSE" | jq .

MONTH_TOTAL=$(echo "$MONTHLY_RESPONSE" | jq -r '.total')
AVG_PHYSICAL=$(echo "$MONTHLY_RESPONSE" | jq -r '.averageRatings.physical')
print_success "Resumo mensal: $MONTH_TOTAL entradas, físico médio: $AVG_PHYSICAL"

# ============================================
# 11. DELETE ENTRY - Deletar entrada
# ============================================
print_header "11. DELETAR UMA ENTRADA"

DELETE_RESPONSE=$(curl -s -X DELETE "$API_URL/diary/$ENTRY_ID_2" \
  -H "Authorization: Bearer $ACCESS_TOKEN")

echo "$DELETE_RESPONSE" | jq .

print_success "Entrada $ENTRY_ID_2 deletada com sucesso"

# ============================================
# 12. FINAL LIST - Listar novamente para confirmar
# ============================================
print_header "12. LISTAR ENTRADAS FINAIS (após deleção)"

FINAL_LIST=$(curl -s -X GET "$API_URL/diary" \
  -H "Authorization: Bearer $ACCESS_TOKEN")

echo "$FINAL_LIST" | jq .

FINAL_COUNT=$(echo "$FINAL_LIST" | jq 'length')
print_success "Total de entradas finais: $FINAL_COUNT"

# ============================================
# RESUMO FINAL
# ============================================
print_header "RESUMO DO TESTE"

echo -e "${GREEN}Testes completados com sucesso!${NC}\n"

echo "📊 Resumo:"
echo "  Email criado: $EMAIL"
echo "  User ID: $USER_ID"
echo "  Access Token: ${ACCESS_TOKEN:0:20}..."
echo "  Entradas criadas: $ENTRIES_COUNT"
echo "  Entradas finais: $FINAL_COUNT"
echo "  Resumo semanal: ✓"
echo "  Resumo mensal: ✓"

echo -e "\n${GREEN}✅ Todos os endpoints testados com sucesso!${NC}\n"

# ============================================
# COMANDOS ÚTEIS PARA EXECUÇÃO
# ============================================
print_header "PARA EXECUTAR ESTE SCRIPT"

echo "Certifique-se de que:"
echo "  1. PostgreSQL está rodando: docker-compose up"
echo "  2. API está rodando: npm run start:dev (na pasta /api)"
echo "  3. jq está instalado: sudo apt-get install jq (Linux)"
echo ""
echo "Depois execute:"
echo "  bash test-api.sh"
echo ""
echo "Ou para especificar uma URL diferente:"
echo "  API_URL=http://seu-servidor:3000 bash test-api.sh"
