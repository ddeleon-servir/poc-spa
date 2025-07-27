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
            '/': {
                target: 'http://spa.local',
                changeOrigin: true,
                bypass: (req) => {
                    if (req.url.startsWith('/@vite') || req.url.endsWith('.js')) {
                        return req.url;
                    }
                },
            },
        },
        cors: true
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './assets/js'),
        },
    },
});