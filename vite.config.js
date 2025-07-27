// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import vue from '@vitejs/plugin-vue';
import symfonyPlugin from 'vite-plugin-symfony';

export default defineConfig({
  plugins: [
    react(),
    vue(),
    symfonyPlugin(),
  ],
  build: {
    rollupOptions: {
      input: {
        react: 'assets/react/app.jsx',
        inertiaReact: 'assets/inertia-react/app.jsx',
        vue: 'assets/vue/app.js',
        inertiaVue: 'assets/inertia-vue/app.js',
      },
    },
  },
  server: {
    port: 5173,
    strictPort: true,
  },
});
