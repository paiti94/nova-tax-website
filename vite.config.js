import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5174,
    host: true
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  build: {
    outDir: "dist", // Make sure it's "dist" and not "build"
  },
  optimizeDeps: {
    include: ['@mui/x-date-pickers', 'date-fns'],
  },
}) 