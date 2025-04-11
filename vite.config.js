import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' 

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Ensure assets are properly handled
  base: '/',
  build: {
    assetsDir: 'assets',
    // Copy the public directory to the output directory as-is
    copyPublicDir: true
  }
})
