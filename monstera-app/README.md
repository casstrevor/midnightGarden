# Midnight Garden · Monstera (personal app)

Private mobile care guide for your Monstera deliciosa cutting. Not published to the App Store or Play Store — install it only on your devices.

## Run locally

```bash
cd monstera-app
npm install
npm run dev
```

Open the URL on your phone (same Wi‑Fi), or use the computer preview.

## Install on your phone (just for you)

1. Start the app (`npm run dev` or `npm run build && npm run preview`).
2. On **iPhone (Safari)**: Share → **Add to Home Screen**.
3. On **Android (Chrome)**: Menu → **Install app** / Add to Home screen.

It opens full-screen like a native app, with offline caching via the service worker.

## Production build

```bash
npm run build
npm run preview
```

Serve `dist/` on any private host you control if you want it available away from your laptop — don’t share the link if you want it personal-only.
