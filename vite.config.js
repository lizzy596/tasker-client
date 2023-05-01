import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import config from './config.json'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        charset: false,
      },
    },
  },
  server: {
    proxy: {
      '/v1': {
        target: config.env === "production" ? config.apiServerUrlProduction : config.apiServerUrlDevelopment,
        changeOrigin: true,
      }
    }
  }

})
