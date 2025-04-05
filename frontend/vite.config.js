import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 9090,
    host: true,
    strictPort: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false
      }
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    assetsDir: 'assets',
    rollupOptions: {
      external: ['@material-ui/core', '@material-ui/icons', '@material-ui/core/styles', 'react', 'react-dom'],
      output: {
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
        globals: {
          'react': 'React',
          'react-dom': 'ReactDOM',
          '@material-ui/core': 'MaterialUI',
          '@material-ui/icons': 'MaterialUIIcons',
          '@material-ui/core/styles': 'MaterialUI'
        }
      }
    }
  },
  base: '/'
})