import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' 
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
  // Add a base configuration that works with most deployment platforms
  base: './',
})
