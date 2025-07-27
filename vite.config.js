// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import symfonyPlugin from 'vite-plugin-symfony';

export default defineConfig({
  plugins: [
    react(),
    symfonyPlugin({
      viteDevServerHostname: 'localhost',
      viteDevServerPort: 5173,
    }),
  ],
  build: {
    rollupOptions: {
      input: {
        inertiaReact: 'assets/inertia-react/app.jsx',
      },
    },
  },
  resolve: {
    alias: {
      '@pages': '/assets/inertia-react/Pages',
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
  optimizeDeps: {
    include: [
      '@inertiajs/inertia',
      '@inertiajs/inertia-react',
      'react',
      'react-dom',
    ],
    esbuildOptions: {
      jsx: 'automatic',
    },
  },
  esbuild: {
    loader: 'jsx',
    include: /\.jsx?$/,
  },
});
