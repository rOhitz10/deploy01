import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
 plugins: [react()],
  server: {
    proxy: {
      '/api': {
        // target: 'https://helpgrow.onrender.com', // Your backend API URL
        target: 'https://deploy01-api.vercel.app/',
        changeOrigin: true,
        secure: false, // If you are using HTTPS with a self-signed cert
      },
    },
  },
})
