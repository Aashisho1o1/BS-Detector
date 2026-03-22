import { defineConfig, loadEnv } from 'vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const apiTarget = (env.VITE_API_TARGET || 'http://localhost:8000').replace(/\/+$/, '')

  return {
    server: {
      port: 5173,
      open: true,
      proxy: {
        '/api': {
          target: apiTarget,
          changeOrigin: true,
          secure: false, // Required for ngrok self-signed certs during dev
          headers: {
            'ngrok-skip-browser-warning': 'true'
          },
          ...(env.VITE_DEBUG_PROXY === 'true' ? {
            configure: (proxy) => {
              proxy.on('error', (err) => {
                console.log('Proxy error:', err.message);
              });
              proxy.on('proxyReq', (proxyReq, req) => {
                console.log('Proxying:', req.url, '→', proxyReq.path);
              });
              proxy.on('proxyRes', (proxyRes, req) => {
                console.log('Response:', req.url, proxyRes.statusCode);
              });
            }
          } : {}),
        }
      }
    }
  }
})
