import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            '/api': {
                target: 'https://tendayapp-f0a0drg2b6avh8g3.koreacentral-01.azurewebsites.net/',
                changeOrigin: true,
                rewrite: (path) =>
                    path.replace(/^\/api/, ''),
            },
        },
    },
});
