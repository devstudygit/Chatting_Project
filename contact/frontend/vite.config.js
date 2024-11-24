import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const proxyTargets = ['/users', '/token', '/static', '/chat-box', '/mes'];

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  server: {
    port: 3000,
    proxy: {
      ...Object.fromEntries(proxyTargets.map(target => [
        target,
        {
          target: 'http://127.0.0.1:8080',
          changeOrigin: true,
          secure: false,
        }
      ])),
      '/ws': {
        target: 'ws://127.0.0.1:8080', // Backend WebSocket server URL
        ws: true,  // Enable WebSocket proxying
        changeOrigin: true,
        secure: false,
      },
    },
  }
})