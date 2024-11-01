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
<<<<<<< HEAD
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
=======
      workbox: {
        runtimeCaching: [
          {
            urlPattern: ({ request }) =>
              request.destination === "document" ||
              request.destination === "script" ||
              request.destination === "style",
            handler: "NetworkFirst",
            options: {
              cacheName: "dynamic-resources",
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24, // 하루 단위로 캐시를 갱신
              },
            },
          },
          {
            urlPattern: ({ request }) => request.destination === "image",
            handler: "CacheFirst",
            options: {
              cacheName: "images-cache",
              expiration: {
                maxEntries: 20,
                maxAgeSeconds: 60 * 60 * 24 * 7, // 일주일 동안 캐시 유지
              },
            },
>>>>>>> front-develop
          },
        ],
      },
    }),
  ],
});
