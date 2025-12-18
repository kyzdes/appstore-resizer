# App Store Screenshot Converter - Deployment Guide

## Build Complete! ✅

Your production-ready App Store Screenshot Converter is built and ready to deploy.

## Build Stats

- **Total bundle size**: ~363.5 KB (uncompressed)
- **Gzipped size**: ~107.6 KB
- **Code splitting**: Optimized with 3 chunks (React vendor, Utils, Main app)
- **Build time**: ~2.5 seconds

## Quick Deployment to VPS

### Option 1: Automated Deployment (Recommended)

Deploy everything with one command:

\`\`\`bash
./deploy-vps.sh
\`\`\`

This script will:
1. Upload files to VPS (5.129.234.17)
2. Build Docker image on VPS
3. Start the container
4. Clean up old images

After deployment, configure Caddy:

\`\`\`bash
./caddy-setup.sh
\`\`\`

### Option 2: Manual Deployment

#### Step 1: Deploy Docker Container

\`\`\`bash
# On your local machine
rsync -avz --exclude 'node_modules' --exclude 'dist' --exclude '.git' \
  ./ root@5.129.234.17:/opt/appstore-converter/

# SSH into VPS
ssh root@5.129.234.17

# Build and run
cd /opt/appstore-converter
docker build -t appstore-converter:latest .
docker stop appstore-converter || true
docker rm appstore-converter || true
docker run -d \
  --name appstore-converter \
  --restart unless-stopped \
  -p 8080:80 \
  appstore-converter:latest
\`\`\`

#### Step 2: Configure Caddy Reverse Proxy

On VPS, create `/etc/caddy/Caddyfile`:

\`\`\`
appstore.moone.dev {
    reverse_proxy localhost:8080
    encode gzip
}
\`\`\`

Reload Caddy:

\`\`\`bash
systemctl reload caddy
\`\`\`

## DNS Configuration

Ensure your DNS A record is set:

\`\`\`
A    appstore.moone.dev    5.129.234.17
\`\`\`

## Verification

1. **Direct access**: http://5.129.234.17:8080
2. **Via domain**: https://appstore.moone.dev (after Caddy setup)

## Testing the Application

1. Upload 1-10 images (JPEG/PNG)
2. Select target resolutions (iPhone/iPad/Apple Watch)
3. Click "Process Images"
4. Download the ZIP file with resized images

## Monitoring

View container logs:

\`\`\`bash
docker logs -f appstore-converter
\`\`\`

Check container status:

\`\`\`bash
docker ps | grep appstore-converter
\`\`\`

## Troubleshooting

### Container won't start

\`\`\`bash
docker logs appstore-converter
\`\`\`

### Site not accessible

1. Check container is running: \`docker ps\`
2. Check Caddy status: \`systemctl status caddy\`
3. Check DNS: \`dig appstore.moone.dev\`
4. Check firewall: \`ufw status\` (ports 80, 443, 8080 should be open)

### Update the application

\`\`\`bash
# Pull latest code, rebuild, redeploy
./deploy-vps.sh
\`\`\`

## Features

- ✅ Client-side image processing (no uploads to server)
- ✅ Supports up to 10 images
- ✅ All Apple App Store resolutions (iPhone, iPad, Apple Watch)
- ✅ Maintains aspect ratio with cover cropping
- ✅ ZIP download with organized folder structure
- ✅ Dark/Light theme support
- ✅ English/Russian localization
- ✅ Fully responsive mobile design
- ✅ WCAG AA accessibility compliance
- ✅ Production optimized (gzip, caching, code splitting)

## Architecture

- **Frontend**: React 18 + Vite + TypeScript
- **UI**: Tailwind CSS + shadcn/ui components
- **Image Processing**: HTML5 Canvas API (client-side)
- **Archiving**: JSZip library
- **Deployment**: Docker + Nginx + Caddy
- **Hosting**: VPS Ubuntu with SSL

## Security

- No file uploads to server (100% client-side processing)
- HTTPS enforced (via Caddy)
- Security headers configured
- No sensitive data stored
- No backend API required

---

**Ready to deploy!** Run `./deploy-vps.sh` to get started.
