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
      '@': path.resolve(__dirname, './src'),
      'pdf-lib': 'pdf-lib/es',
    }
  },
  build: {
    outDir: "dist", // Make sure it's "dist" and not "build"
    rollupOptions: {
        output: {
            manualChunks(id) {
                if (id.includes('node_modules')) {
                    if (id.includes('react')) return 'react-vendor';
                    if (id.includes('mui')) return 'mui-vendor';
                    if (id.includes('pdf-lib')) return 'pdf-lib-vendor';
                    return 'vendor'; // Other node_modules
                  }
              },
        },
      },
  },
//   optimizeDeps: {
//     include: ['@mui/x-date-pickers', 'date-fns'],
//   },
}) 