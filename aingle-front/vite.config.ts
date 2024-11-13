import { defineConfig } from "vite";
import replace from "@rollup/plugin-replace";

export default defineConfig({
  plugins: [
    replace({
      preventAssignment: true,
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
    }),
  ],
});
