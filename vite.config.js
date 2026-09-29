import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Tailwind v4 usa configuración CSS-first: el tema MotoCenter vive en
// `src/tailwind-theme.css` (@theme) y se importa desde `src/index.css`.
// Aquí solo se conecta el plugin; no hay tailwind.config.js.
export default defineConfig({
  plugins: [react(), tailwindcss()],
})
