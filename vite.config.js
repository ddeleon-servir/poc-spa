import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
    plugins: [react()], // Enables React/JSX support
    root: './assets',
    build: {
        outDir: '../public/build',
        manifest: true,
        rollupOptions: {
            input: './js/app.js', // Relative path to app.js
        },
    },
    server: {
        host: '0.0.0.0',
        port: 5173,
        strictPort: true,
        cors: true,
        watch: {
            usePolling: true,
        },
        proxy: {
            // Proxy non-asset requests to Apache2
            '^/(?!(@vite|@fs|js/|node_modules/)).*': {
                target: 'http://poc-spa.local', // Apache2 virtual host
                changeOrigin: true,
            },
        },
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './assets/js'),
        },
    },
    esbuild: {
        loader: { '.js': 'jsx' }, // Treat .js files as JSX
    },
});