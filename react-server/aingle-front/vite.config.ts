import { defineConfig } from "vite";

export default defineConfig({
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom", "@tanstack/react-query"],
        },
      },
    },
  },
  optimizeDeps: {
    include: ["@tanstack/react-query"],
  },
  define: {
    "process.env.VITE_REACT_APP_API_KEY": JSON.stringify(
      process.env.VITE_REACT_APP_API_KEY
    ),
    "process.env.VITE_REACT_APP_AUTH_DOMAIN": JSON.stringify(
      process.env.VITE_REACT_APP_AUTH_DOMAIN
    ),
    "process.env.VITE_REACT_APP_PROJECT_ID": JSON.stringify(
      process.env.VITE_REACT_APP_PROJECT_ID
    ),
    "process.env.VITE_REACT_APP_STORAGE_BUCKET": JSON.stringify(
      process.env.VITE_REACT_APP_STORAGE_BUCKET
    ),
    "process.env.VITE_REACT_APP_MESSAGING_SENDER_ID": JSON.stringify(
      process.env.VITE_REACT_APP_MESSAGING_SENDER_ID
    ),
    "process.env.VITE_REACT_APP_APP_ID": JSON.stringify(
      process.env.VITE_REACT_APP_APP_ID
    ),
    "process.env.VITE_REACT_APP_MEASUREMENT_ID": JSON.stringify(
      process.env.VITE_REACT_APP_MEASUREMENT_ID
    ),
  },
});
