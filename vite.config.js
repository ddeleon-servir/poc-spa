
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import symfonyPlugin from 'vite-plugin-symfony';

export default defineConfig({
  plugins: [react(), symfonyPlugin()],
  build: {
    outDir: '../public/build',
    emptyOutDir: true,
  },
  server: {
    origin: 'http://localhost:5173',
    port: 5173,
    strictPort: true,
  },
});
