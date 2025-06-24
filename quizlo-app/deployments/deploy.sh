#!/usr/bin/env bash
set -euo pipefail

# CONFIGURATION
REPO_URL="https://github.com/neersx/Quizlo.git"
BRANCH="release"
WORKDIR="/home/ubuntu/quizlo-repo"
DEPLOY_DIR="/var/www/quizlo"
API_SUBDIR="api"
UI_SUBDIR="ui"

# 1. Ensure working directory exists
mkdir -p "$WORKDIR"
cd "$WORKDIR"

# 2. Clone or fetch latest
if [ ! -d .git ]; then
  echo "Cloning repository..."
  git clone --branch "$BRANCH" "$REPO_URL" .
else
  echo "Fetching latest changes..."
  git fetch origin "$BRANCH"
  git reset --hard "origin/$BRANCH"
fi

# 3. Build .NET API
echo "Building .NET 8 Web API..."
cd "$WORKDIR/$API_SUBDIR"
dotnet restore
dotnet publish -c Release -o publish

# 4. Build Angular 19
echo "Building Angular 19 front-end..."
cd "$WORKDIR/$UI_SUBDIR"
npm install
ng build --configuration production

# 5. Copy to deploy directory
echo "Copying builds to $DEPLOY_DIR..."
sudo rm -rf "$DEPLOY_DIR/api" "$DEPLOY_DIR/ui"
sudo mkdir -p "$DEPLOY_DIR/api" "$DEPLOY_DIR/ui"
sudo cp -r "$WORKDIR/$API_SUBDIR/publish/"* "$DEPLOY_DIR/api/"
sudo cp -r "$WORKDIR/$UI_SUBDIR/dist/"* "$DEPLOY_DIR/ui/"

# 6. Restart the .NET service
echo "Restarting quizlo-api.service..."
sudo systemctl restart quizlo-api.service

# 7. Restart nginx
echo "Restarting nginx..."
sudo systemctl restart nginx

# 8. Smoke-test
echo -n "Testing web response... "
if curl -sSf http://localhost/ >/dev/null; then
  echo "OK"
else
  echo "FAILED" >&2
  exit 1
fi

echo "Deployment completed successfully."
