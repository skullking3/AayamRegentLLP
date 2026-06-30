import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  
  // 👇 Bas itna chahiye SPA routing ke liye
  server: {
    historyApiFallback: true
  }
})