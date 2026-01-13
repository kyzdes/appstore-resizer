
# Screenshot Conversion Service

This is a fully client-side rendition of the Figma concept available at https://www.figma.com/design/q219qlzNP5xmIX3UVS88rk/Screenshot-Conversion-Service.

The app runs entirely in the browser: images are validated locally (JPEG/PNG, ≤20 MB, max 10 files), resized sequentially for every selected App Store target resolution, flattened on a white background, and bundled into a ZIP archive that the browser downloads. No backend or API is required, which makes it easy to deploy on any static host or VPS.

## VPS edition

See `VPS_EDITION.md` for the current VPS deployment notes.

## Local development

```bash
npm install          # install dependencies
npm run dev          # start Vite dev server on http://localhost:3000
```

## Production build

```bash
npm run build        # outputs the static bundle into ./build
npm run preview      # optional: test the production build locally
```

## Deployment tips

1. Build the project (`npm run build`), then copy the contents of the `build/` folder to your VPS (e.g., via `rsync` or `scp`).
2. Serve the folder with any static HTTP server (Nginx/Apache/Caddy or even `npx serve build` behind a reverse proxy). No Node.js runtime is needed on the server.
3. Make sure the server is configured to fall back to `index.html` (a standard single-page-app setting) so that direct URL refreshes keep working.

Once the static files are in place, the browser-based processor will handle all resizing locally according to the App Store requirements described in the spec.

## Docker

A multi-stage `Dockerfile` is included to make hosting on any container-friendly VPS straightforward:

```bash
docker build -t appstore-resizer .
docker run -p 8080:80 appstore-resizer
```

The container builds the static bundle with Node.js and serves it via Nginx on port 80. After running the commands above, open http://localhost:8080 to access the app. For production VPS deployments, map the container port to your preferred public port or put it behind a reverse proxy with TLS.
  
