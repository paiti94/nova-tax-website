import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [react(), 
    visualizer({ open: true }),
  ],
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
    rollupOptions: {
        output: {
          manualChunks(id) {
            // Split vendor libraries into their own chunks
            if (id.includes('node_modules')) {
              return id.toString().split('node_modules/')[1].split('/')[0].toString();
            }
          },
        },
      },
  },
  optimizeDeps: {
    include: ['@mui/x-date-pickers', 'date-fns'],
  },
}) 