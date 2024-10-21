import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
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
    }),
  ],
});
