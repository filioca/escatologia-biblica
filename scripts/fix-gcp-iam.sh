#!/usr/bin/env bash
# =============================================================================
# fix-gcp-iam.sh
#
# Corrige as permissões IAM necessárias para que o Cloud Build consiga fazer
# push/pull de imagens no Artifact Registry durante o deploy de Firebase
# Functions v2.
#
# Erro corrigido:
#   "Permission 'artifactregistry.repositories.downloadArtifacts' denied on
#    resource us-central1-docker.pkg.dev/PROJECT/gcf-artifacts/..."
#
# Causa:
#   O Cloud Build executa com a conta de serviço padrão do projeto. Essa SA
#   não tem, por padrão, as roles do Artifact Registry — necessárias para
#   ler e gravar o cache de imagens que o Functions v2 usa internamente.
#
# Uso:
#   bash scripts/fix-gcp-iam.sh
#   PROJECT_ID=outro-projeto bash scripts/fix-gcp-iam.sh
#
# Pré-requisito:
#   gcloud CLI autenticado com conta que tenha roles/resourcemanager.projectIamAdmin
#   no projeto alvo. Veja o guia de instalação no final deste arquivo.
# =============================================================================

set -euo pipefail

# ---------------------------------------------------------------------------
# Variáveis — sobrescrevíveis via ambiente
# ---------------------------------------------------------------------------

PROJECT_ID="${PROJECT_ID:-apocalipse-biblico}"
REGION="${REGION:-us-central1}"

# ---------------------------------------------------------------------------
# Cores para output legível
# ---------------------------------------------------------------------------

BOLD='\033[1m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
RESET='\033[0m'

step()  { echo -e "\n${BOLD}[${1}/${TOTAL_STEPS}]${RESET} ${2}"; }
ok()    { echo -e "    ${GREEN}✓${RESET} ${1}"; }
warn()  { echo -e "    ${YELLOW}⚠${RESET}  ${1}"; }
fatal() { echo -e "\n${RED}ERRO FATAL:${RESET} ${1}" >&2; exit 1; }

TOTAL_STEPS=5

# ---------------------------------------------------------------------------
# Verificar pré-requisitos
# ---------------------------------------------------------------------------

echo -e "${BOLD}==============================================================${RESET}"
echo -e "${BOLD} fix-gcp-iam — Correção de permissões IAM / Artifact Registry${RESET}"
echo -e "${BOLD}==============================================================${RESET}"

command -v gcloud >/dev/null 2>&1 || fatal \
  "gcloud CLI não encontrado. Instale em: https://cloud.google.com/sdk/docs/install"

# Confirma que existe uma conta autenticada
ACTIVE_ACCOUNT=$(gcloud auth list --filter="status=ACTIVE" --format="value(account)" 2>/dev/null | head -1)
[[ -n "$ACTIVE_ACCOUNT" ]] || fatal \
  "Nenhuma conta gcloud ativa. Execute: gcloud auth login"

echo ""
echo -e "  Projeto alvo : ${BOLD}${PROJECT_ID}${RESET}"
echo -e "  Região       : ${BOLD}${REGION}${RESET}"
echo -e "  Conta ativa  : ${BOLD}${ACTIVE_ACCOUNT}${RESET}"

# ---------------------------------------------------------------------------
# Passo 1 — Confirmar que o projeto existe e obter o número
# ---------------------------------------------------------------------------

step 1 "Obtendo número do projeto..."

PROJECT_NUMBER=$(gcloud projects describe "$PROJECT_ID" \
  --format="value(projectNumber)" 2>/dev/null) || fatal \
  "Projeto '$PROJECT_ID' não encontrado ou sem acesso. Verifique PROJECT_ID e permissões."

ok "Número do projeto: ${PROJECT_NUMBER}"

# Contas de serviço padrão derivadas do número do projeto
CLOUDBUILD_SA="${PROJECT_NUMBER}@cloudbuild.gserviceaccount.com"
COMPUTE_SA="${PROJECT_NUMBER}-compute@developer.gserviceaccount.com"

echo "    Cloud Build SA  : ${CLOUDBUILD_SA}"
echo "    Compute Engine SA: ${COMPUTE_SA}"

# ---------------------------------------------------------------------------
# Passo 2 — Habilitar APIs necessárias (idempotente)
# ---------------------------------------------------------------------------

step 2 "Habilitando APIs necessárias (pode levar alguns segundos)..."

for API in artifactregistry.googleapis.com cloudbuild.googleapis.com; do
  CURRENT=$(gcloud services list --project="$PROJECT_ID" \
    --filter="name:${API}" --format="value(name)" 2>/dev/null)
  if [[ -n "$CURRENT" ]]; then
    ok "${API} já está habilitada"
  else
    gcloud services enable "$API" --project="$PROJECT_ID" --quiet
    ok "${API} habilitada"
  fi
done

# ---------------------------------------------------------------------------
# Passo 3 — Cloud Build SA → Artifact Registry Writer
#
# Necessário para: push de imagens de build + leitura/escrita do cache
# ("artifactregistry.repositories.uploadArtifacts" e
#  "artifactregistry.repositories.downloadArtifacts")
#
# Escopo: nível de projeto (o repositório gcf-artifacts é criado
# automaticamente pelo Functions deploy, então não existe antes do
# primeiro build — impossível escopar ao repositório antecipadamente).
# ---------------------------------------------------------------------------

step 3 "Concedendo roles/artifactregistry.writer ao Cloud Build SA..."

gcloud projects add-iam-policy-binding "$PROJECT_ID" \
  --member="serviceAccount:${CLOUDBUILD_SA}" \
  --role="roles/artifactregistry.writer" \
  --condition=None \
  --quiet >/dev/null

ok "roles/artifactregistry.writer → ${CLOUDBUILD_SA}"

# ---------------------------------------------------------------------------
# Passo 4 — Compute Engine SA → Artifact Registry Reader
#
# Necessário para: o runtime do Cloud Run/Functions v2 precisa fazer pull
# da imagem do container gerada pelo build.
# ---------------------------------------------------------------------------

step 4 "Concedendo roles/artifactregistry.reader ao Compute Engine SA..."

gcloud projects add-iam-policy-binding "$PROJECT_ID" \
  --member="serviceAccount:${COMPUTE_SA}" \
  --role="roles/artifactregistry.reader" \
  --condition=None \
  --quiet >/dev/null

ok "roles/artifactregistry.reader → ${COMPUTE_SA}"

# ---------------------------------------------------------------------------
# Passo 5 — Verificação: listar bindings aplicados
# ---------------------------------------------------------------------------

step 5 "Verificando bindings aplicados..."

echo ""
echo "  Bindings da Cloud Build SA (${CLOUDBUILD_SA}):"
gcloud projects get-iam-policy "$PROJECT_ID" \
  --flatten="bindings[].members" \
  --filter="bindings.members:${CLOUDBUILD_SA} AND \
            (bindings.role:roles/artifactregistry OR \
             bindings.role:roles/cloudbuild OR \
             bindings.role:roles/logging)" \
  --format="table[box](bindings.role)" 2>/dev/null \
  | sed 's/^/    /'

echo ""
echo "  Bindings da Compute Engine SA (${COMPUTE_SA}):"
gcloud projects get-iam-policy "$PROJECT_ID" \
  --flatten="bindings[].members" \
  --filter="bindings.members:${COMPUTE_SA} AND \
            bindings.role:roles/artifactregistry" \
  --format="table[box](bindings.role)" 2>/dev/null \
  | sed 's/^/    /'

# ---------------------------------------------------------------------------
# Resumo final
# ---------------------------------------------------------------------------

echo ""
echo -e "${GREEN}${BOLD}✅  Permissões aplicadas com sucesso.${RESET}"
echo ""
echo "  Próximos passos:"
echo "    1. Aguarde ~30s para propagação das políticas IAM."
echo "    2. Execute o deploy novamente:"
echo "       firebase deploy --only functions"
echo ""
echo "  Se o erro persistir, verifique se a API do Artifact Registry"
echo "  está ativa no console: https://console.cloud.google.com/apis/library"
echo "  Projeto: ${PROJECT_ID}"
echo ""

# =============================================================================
# GUIA DE INSTALAÇÃO DO gcloud CLI (referência rápida)
# =============================================================================
#
# Windows (PowerShell):
#   (New-Object Net.WebClient).DownloadFile(
#     "https://dl.google.com/dl/cloudsdk/channels/rapid/GoogleCloudSDKInstaller.exe",
#     "$env:Temp\GoogleCloudSDKInstaller.exe"
#   ); & "$env:Temp\GoogleCloudSDKInstaller.exe"
#
# macOS (Homebrew):
#   brew install --cask google-cloud-sdk
#
# Linux (apt / curl):
#   curl https://sdk.cloud.google.com | bash
#   exec -l $SHELL
#
# Após instalar, autentique:
#   gcloud auth login
#   gcloud config set project apocalipse-biblico
# =============================================================================
