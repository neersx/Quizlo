#!/bin/bash

#chmod +x ~/deploy-quizlo.sh
#bash ~/deploy-quizlo.sh

#!/bin/bash

set -e  # Exit immediately on error

echo "🚀 Starting Quizlo Deployment (branch: release)..."

# Define paths
REPO_DIR="/var/www/quizlo/code/Quizlo"
API_DIR="$REPO_DIR/Quizlo.Questionnaire.WebApi"
CLIENT_DIR="$REPO_DIR/quizlo-app"
DEPLOY_DIR="/var/www/quizlo"

# Generate timestamp
DATE_TAG=$(date +"%d%b%Y-%H%M" | tr '[:upper:]' '[:lower:]')
BACKUP_DIR="$DEPLOY_DIR/backup-$DATE_TAG"

# ---- STOP SERVICES ----
echo "📦 Stopping existing services..."
sudo systemctl stop quizlo-api
sudo systemctl stop quizlo-app

# ---- GIT SYNC ----
echo "🔁 Switching to release branch and pulling latest..."
cd "$REPO_DIR"
git fetch origin
git checkout release
git pull origin release

# ---- BACKUP CURRENT DEPLOYMENT ----
echo "🗂️ Creating backup at: $BACKUP_DIR"
mkdir -p "$BACKUP_DIR"

[ -d "$DEPLOY_DIR/api" ] && cp -r "$DEPLOY_DIR/api" "$BACKUP_DIR/"
[ -d "$DEPLOY_DIR/browser" ] && cp -r "$DEPLOY_DIR/browser" "$BACKUP_DIR/"
[ -d "$DEPLOY_DIR/server" ] && cp -r "$DEPLOY_DIR/server" "$BACKUP_DIR/"

echo "✅ Backup complete."

# ---- BUILD .NET API ----
echo "⚙️ Publishing .NET 8 API..."
cd "$API_DIR"
dotnet publish -c Release -o "$DEPLOY_DIR/api"

# ---- BUILD ANGULAR SSR ----
echo "🧱 Installing Angular dependencies..."
cd "$CLIENT_DIR"
npm install

echo "🏗️ Building Angular SSR (browser + server)..."
npm run build:ssr

# ---- COPY ANGULAR BUILD ----
echo "🚚 Copying Angular build to deployment folders..."
rm -rf "$DEPLOY_DIR/browser"
rm -rf "$DEPLOY_DIR/server"

cp -r dist/quizlo-app/browser "$DEPLOY_DIR/browser"
cp -r dist/quizlo-app/server "$DEPLOY_DIR/server"

# ---- PERMISSIONS ----
echo "🔐 Fixing permissions..."
sudo chown -R www-data:www-data "$DEPLOY_DIR"
sudo chmod -R 755 "$DEPLOY_DIR"

# ---- START SERVICES ----
echo "🚀 Restarting services..."
sudo systemctl start quizlo-api
sudo systemctl start quizlo-app

# ---- NGINX ----
echo "🌐 Reloading Nginx config..."
sudo nginx -t && sudo systemctl reload nginx

echo "✅ Deployment complete! Visit: https://quizloai.com"
