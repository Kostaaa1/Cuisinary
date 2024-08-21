import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  const API_URL = `${mode === 'production' ? env.VITE_DEV_SERVER_URL : env.VITE_DEV_SERVER_URL}`;
  return {
    server: {
      proxy: {
        '/api': {
          target: API_URL,
          changeOrigin: true,
        },
      },
    },
    plugins: [react()],
  };
});
