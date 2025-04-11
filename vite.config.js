import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' 

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Ensure assets are properly handled for Vercel deployment
  base: '/', // Use absolute paths since they work
  build: {
    assetsDir: 'assets',
    // Copy the public directory to the output directory as-is
    copyPublicDir: true
  }
})
