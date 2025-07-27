// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import vue from '@vitejs/plugin-vue';
import symfonyPlugin from 'vite-plugin-symfony';

const mode = process.env.MODE;

export default defineConfig({
  plugins: [
    mode === 'inertia-react' ? react() : null,
    // mode === 'inertia-vue' ? vue() : null,
    symfonyPlugin(),
  ].filter(Boolean),
  build: {
    rollupOptions: {
      input: {
        inertiaReact: 'assets/inertia-react/app.jsx',
        // react: 'assets/react/app.jsx',
        // vue: 'assets/vue/app.js',
        // inertiaVue: 'assets/inertia-vue/app.js',
      },
    },
  },
  resolve: {
    alias: {
      // Ensure Vite resolves ./Pages correctly
      './Pages': '/assets/inertia-react/Pages',
    },
  },
  server: {
    port: 5173,
    strictPort: true,
    origin: 'http://localhost:5173',
    cors: true,
    hmr: {
      host: 'localhost',
    },
  },
});
