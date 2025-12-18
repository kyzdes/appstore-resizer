#!/bin/bash
set -e

echo "🚀 Deploying App Store Screenshot Converter to VPS..."

VPS_HOST="5.129.234.17"
VPS_USER="root"
DOMAIN="appstore.moone.dev"
APP_DIR="/opt/appstore-converter"

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}📦 Creating deployment directory on VPS...${NC}"
ssh $VPS_USER@$VPS_HOST "mkdir -p $APP_DIR"

echo -e "${BLUE}📤 Uploading files to VPS...${NC}"
rsync -avz --exclude 'node_modules' --exclude 'dist' --exclude '.git' \
  ./ $VPS_USER@$VPS_HOST:$APP_DIR/

echo -e "${BLUE}🔨 Building Docker image on VPS...${NC}"
ssh $VPS_USER@$VPS_HOST << ENDSSH
cd $APP_DIR

# Stop and remove old container if exists
docker stop appstore-converter 2>/dev/null || true
docker rm appstore-converter 2>/dev/null || true

# Build new image
docker build -t appstore-converter:latest .

# Run new container
docker run -d \
  --name appstore-converter \
  --restart unless-stopped \
  -p 3020:80 \
  appstore-converter:latest

echo "✅ Container started"
docker ps | grep appstore-converter
ENDSSH

echo -e "${GREEN}✅ Deployment complete!${NC}"
echo -e "${GREEN}🌐 Application available at: http://$DOMAIN${NC}"
echo -e "${BLUE}ℹ️  Make sure your reverse proxy (Caddy/Nginx) is configured to forward $DOMAIN to port 3020${NC}"
