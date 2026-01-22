import { defineConfig } from "vite";

export default defineConfig({
  optimizeDeps: {
    esbuildOptions: {
      supported: {
        "top-level-await": true
      }
    }
  },
  esbuild: {
    target: "es2020"
  },
  server: {
    port: 5173
  }
});
