import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Base must match the GitHub Pages repo path
export default defineConfig({
  base: '/react101/',
  plugins: [react()]
})
