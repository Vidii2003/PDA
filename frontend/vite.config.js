import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  optimizeDeps: {
    include: ['@tsparticles/react'],
  },
  plugins: [react()],
  server: {
    proxy: {
      // '/api': 'http://localhost:5000', // Uncomment if you want to use this proxy
      '/api': {
        target: 'http://127.0.0.1:5000',
        changeOrigin: true,
      },
    },
    hmr: {
      overlay: false,
  }
  }
});
