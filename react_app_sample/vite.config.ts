import { defineConfig } from "vite";
import { viteExternalsPlugin } from 'vite-plugin-externals';
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        viteExternalsPlugin({
            GFN: 'GFN'
        }),
    ],
    optimizeDeps: {
        include: ['@nvidia/omniverse-webrtc-streaming-library'],
    },
    build: {
        commonjsOptions: {
            include: [/web-streaming-library/],
        },
    },
    server: {
        host: '0.0.0.0',
        port: 5173,
        allowedHosts: ['63fa-175-195-49-211.ngrok-free.app'] // ngrok URL 허용
        // 
    },
});
