import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: {
        enabled: true,
      },
      manifest: {
        name: "Aingle",
        short_name: "Aingle",
        description: "A Progressive Web App example with React and Vite",
        theme_color: "#ffffff",
        icons: [
          {
            src: "/src/assets/192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/src/assets/512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
      // 캐시를 비활성화하려면 아래 설정을 추가합니다.
      workbox: {
        // precache를 비활성화하여 초기 캐싱을 하지 않음
        skipWaiting: true,
        clientsClaim: true,
        cleanupOutdatedCaches: true,
        runtimeCaching: [
          {
            urlPattern: /.\*/,
            handler: "NetworkOnly", // 항상 네트워크에서 데이터를 가져옴
          },
        ],
      },
    }),
  ],
});
