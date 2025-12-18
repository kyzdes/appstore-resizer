#!/bin/bash
set -e

VPS_HOST="5.129.234.17"
VPS_USER="root"
DOMAIN="appstore.moone.dev"
DEPLOY_PATH="/opt/appstore-converter"

echo "🚀 Deploying to VPS: $VPS_HOST"
echo "🌐 Domain: $DOMAIN"
echo ""

# Check if we can connect to VPS
echo "🔍 Checking VPS connection..."
if ! ssh -o ConnectTimeout=5 $VPS_USER@$VPS_HOST "echo 'Connected successfully'" 2>/dev/null; then
    echo "❌ Cannot connect to VPS. Please check:"
    echo "   - VPS is running"
    echo "   - IP address is correct: $VPS_HOST"
    echo "   - SSH key is configured"
    exit 1
fi
echo "✅ VPS connection successful"
echo ""

# Create deployment directory on VPS
echo "📁 Creating deployment directory..."
ssh $VPS_USER@$VPS_HOST "mkdir -p $DEPLOY_PATH"
echo ""

# Copy files to VPS
echo "📤 Uploading files to VPS..."
rsync -avz --progress \
  --exclude 'node_modules' \
  --exclude 'dist' \
  --exclude '.git' \
  --exclude '*.md' \
  --exclude 'design-system' \
  ./ $VPS_USER@$VPS_HOST:$DEPLOY_PATH/
echo "✅ Files uploaded"
echo ""

# Build and deploy on VPS
echo "🔨 Building and deploying on VPS..."
ssh $VPS_USER@$VPS_HOST << EOF
set -e
cd $DEPLOY_PATH

echo "📦 Building Docker image..."
docker build -t appstore-converter:latest .

echo "🛑 Stopping old container..."
docker stop appstore-converter 2>/dev/null || true
docker rm appstore-converter 2>/dev/null || true

echo "▶️  Starting new container..."
docker run -d \
  --name appstore-converter \
  --restart unless-stopped \
  -p 8080:80 \
  appstore-converter:latest

echo ""
echo "✅ Container started successfully"
echo "📊 Container status:"
docker ps | grep appstore-converter

echo ""
echo "🧹 Cleaning up old images..."
docker image prune -f
EOF

echo ""
echo "✅ Deployment to VPS complete!"
echo ""
echo "🌐 Application should be available at:"
echo "   - http://$VPS_HOST:8080 (direct)"
echo "   - http://$DOMAIN (after configuring reverse proxy)"
echo ""
echo "📝 Next steps:"
echo "   1. Configure Caddy reverse proxy on VPS"
echo "   2. Ensure DNS A record points to $VPS_HOST"
echo "   3. Test: https://$DOMAIN"
echo ""
echo "📊 View logs with: ssh $VPS_USER@$VPS_HOST 'docker logs -f appstore-converter'"
