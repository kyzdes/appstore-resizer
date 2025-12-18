#!/bin/bash
set -e

VPS_HOST="5.129.234.17"
VPS_USER="root"
DOMAIN="appstore.moone.dev"

echo "🔧 Setting up Caddy reverse proxy on VPS..."
echo ""

# Create Caddyfile content
CADDYFILE_CONTENT="$DOMAIN {
    reverse_proxy localhost:8080
    encode gzip

    # Security headers
    header {
        Strict-Transport-Security \"max-age=31536000; includeSubDomains; preload\"
        X-Content-Type-Options \"nosniff\"
        X-Frame-Options \"SAMEORIGIN\"
        X-XSS-Protection \"1; mode=block\"
        Referrer-Policy \"strict-origin-when-cross-origin\"
    }

    # Logging
    log {
        output file /var/log/caddy/appstore.log
        format json
    }
}"

# Deploy Caddy configuration
ssh $VPS_USER@$VPS_HOST << EOF
set -e

echo "📦 Installing Caddy (if not installed)..."
if ! command -v caddy &> /dev/null; then
    apt update
    apt install -y debian-keyring debian-archive-keyring apt-transport-https curl
    curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
    curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' | tee /etc/apt/sources.list.d/caddy-stable.list
    apt update
    apt install -y caddy
fi

echo "✅ Caddy is installed"

echo "📝 Creating Caddyfile..."
cat > /etc/caddy/Caddyfile << 'CADDYFILE'
$CADDYFILE_CONTENT
CADDYFILE

echo "🔄 Reloading Caddy..."
systemctl enable caddy
systemctl reload caddy

echo "✅ Caddy configured successfully"
echo ""
echo "📊 Caddy status:"
systemctl status caddy --no-pager | head -10
EOF

echo ""
echo "✅ Caddy setup complete!"
echo "🌐 Your site should now be available at: https://$DOMAIN"
echo "🔒 HTTPS certificate will be automatically obtained by Caddy"
echo ""
echo "📝 Check Caddy logs: ssh $VPS_USER@$VPS_HOST 'journalctl -u caddy -f'"
