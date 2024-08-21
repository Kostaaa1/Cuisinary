import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  return {
    build: {
      outDir: 'dist',
    },
    server: {
      proxy:
        mode === 'development'
          ? {
              '/api': {
                target: env.VITE_DEV_SERVER_URL,
                changeOrigin: true,
              },
            }
          : undefined,
    },
    plugins: [react()],
  };
});
