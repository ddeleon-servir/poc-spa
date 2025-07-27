// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import symfonyPlugin from 'vite-plugin-symfony';

const mode = process.env.MODE || 'inertia-react'; // Fallback to inertia-react

export default defineConfig({
  plugins: [
    // mode === 'inertia-react' ? react() : null,
    react(),
    symfonyPlugin({
      viteDevServerHostname: 'localhost',
      viteDevServerPort: 5173,
    }),
  ].filter(Boolean),
  build: {
    rollupOptions: {
      input: {
        inertiaReact: 'assets/inertia-react/app.jsx',
      },
    },
  },
  resolve: {
    alias: {
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
  optimizeDeps: {
    include: ['@inertiajs/inertia-react', 'react', 'react-dom'],
    esbuildOptions: {
      jsx: 'automatic', // Ensure JSX transformation
    },
  },
  esbuild: {
    loader: 'jsx',
    include: /src\/.*\.jsx?$/, // ajusta si tu ruta es distinta
  },
});