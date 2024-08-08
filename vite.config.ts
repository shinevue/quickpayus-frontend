import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from 'path';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    },
    plugins: [react()],
    server: {
      host: true,
      port: env.VITE_APP_BASE_URL,
      proxy: {
        "/api": {
          target: env.VITE_API_BASE_URL,
          changeOrigin: true,
          secure: false,
        },
      },
    },
    define: {
      __APP_ENV__: JSON.stringify(env.APP_ENV),
      __API_BASE_URL__: JSON.stringify(env.VITE_API_BASE_URL),
      __APP_BASE_URL__: JSON.stringify(env.VITE_APP_BASE_URL),
      __FEATURE_FLAG__: JSON.stringify(env.VITE_FEATURE_FLAG === "true"),
    },
  };
});
