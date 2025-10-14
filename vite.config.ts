import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/wilayah': {
        target: 'https://wilayah.id',
        changeOrigin: true,
        secure: false,                 
        rewrite: (path) => path.replace(/^\/wilayah/, ''), 
      },
    },
  },
})
