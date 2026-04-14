$gcloud = "C:\Users\Filipe\AppData\Local\Google\Cloud SDK\google-cloud-sdk\bin\gcloud.cmd"
$PROJECT_ID = "apocalipse-biblico"

Write-Host "==============================================================" -ForegroundColor Cyan
Write-Host " fix-gcp-iam (PowerShell) — Correção de permissões IAM/AR" -ForegroundColor Cyan
Write-Host "==============================================================" -ForegroundColor Cyan
Write-Host "Projeto alvo: $PROJECT_ID" -ForegroundColor Yellow

# Set project
Write-Host "[1/5] Configurando projeto..." -ForegroundColor Yellow
& $gcloud config set project $PROJECT_ID

# Get project number
Write-Host "[2/5] Obtendo número do projeto..." -ForegroundColor Yellow
$PROJECT_NUMBER = (& $gcloud projects describe $PROJECT_ID --format='value(projectNumber)' --quiet | Out-String).Trim()

if (-not $PROJECT_NUMBER) {
    Write-Error "Não foi possível obter o número do projeto. Verifique sua conexão e autenticação."
    return
}

Write-Host "    ✓ Número do projeto: $PROJECT_NUMBER" -ForegroundColor Green

$CLOUDBUILD_SA = "${PROJECT_NUMBER}@cloudbuild.gserviceaccount.com"
$COMPUTE_SA = "${PROJECT_NUMBER}-compute@developer.gserviceaccount.com"

Write-Host "    Cloud Build SA   : $CLOUDBUILD_SA"
Write-Host "    Compute Engine SA: $COMPUTE_SA"

# Enable services
Write-Host "[3/5] Habilitando APIs (Artifact Registry e Cloud Build)..." -ForegroundColor Yellow
& $gcloud services enable artifactregistry.googleapis.com cloudbuild.googleapis.com

# Grant roles
Write-Host "[4/5] Concedendo roles/artifactregistry.writer ao Cloud Build..." -ForegroundColor Yellow
& $gcloud projects add-iam-policy-binding $PROJECT_ID --member="serviceAccount:$CLOUDBUILD_SA" --role="roles/artifactregistry.writer" --condition=None

Write-Host "[5/5] Concedendo roles/artifactregistry.reader ao Compute Engine..." -ForegroundColor Yellow
& $gcloud projects add-iam-policy-binding $PROJECT_ID --member="serviceAccount:$COMPUTE_SA" --role="roles/artifactregistry.reader" --condition=None

Write-Host ""
Write-Host "✅ Configuração de infraestrutura concluída com sucesso!" -ForegroundColor Green
Write-Host "Execute o seu deploy novamente:" -ForegroundColor White
Write-Host "npm run build && firebase deploy --only functions" -ForegroundColor Green
