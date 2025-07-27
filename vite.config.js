import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
    plugins: [react()],
    root: './assets',
    build: {
        outDir: '../public/build',
        manifest: true,
        rollupOptions: {
            input: '/js/app.js',
        },
    },
    server: {
        watch: {
            usePolling: true,
        },
        proxy: {
            // Proxy all non-Vite requests to Apache2
            '/': {
                target: 'http://localhost', // Apache2 on port 80
                changeOrigin: true,
                bypass: (req) => {
                    // Skip proxy for Vite-specific assets
                    if (req.url.startsWith('/@vite') || req.url.endsWith('.js')) {
                        return req.url;
                    }
                },
            },
        },
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './assets/js'),
        },
    },
});