# AgriCo · Demand Planning Dashboard

Interactive demand planning demo built with React, Vite, Tailwind CSS, Recharts, and react-simple-maps. Mock AgriCo forecast data with India accuracy heatmap, explainability views, and McKinsey-themed UI.

## Live demo

**https://nihal-bhatt.github.io/Demand-model-demo/**

Deploys automatically from `main` to the `gh-pages` branch via GitHub Actions.

### One-time GitHub Pages setup

1. Open [Settings → Pages](https://github.com/Nihal-Bhatt/Demand-model-demo/settings/pages)
2. Under **Build and deployment → Source**, choose **Deploy from a branch**
3. Set **Branch** to `gh-pages` and folder to **`/ (root)`**
4. Save — the site goes live after the next workflow run completes

## Local development

```bash
npm install --legacy-peer-deps
npm run dev
```

Open http://127.0.0.1:5173/

## Build

```bash
npm run build
npm run preview
```

## Stack

- React 19 + TypeScript + Vite 8
- Tailwind CSS v4
- Recharts, Framer Motion, react-simple-maps
