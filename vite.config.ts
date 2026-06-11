import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ mode }) => ({
  // GitHub Pages serves from /Demand-model-demo/
  base: mode === 'production' ? '/Demand-model-demo/' : '/',
  plugins: [react(), tailwindcss()],
}))
