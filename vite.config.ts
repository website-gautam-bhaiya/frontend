import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/", // Ensures correct base path for routing
  server: {
    host: true,
    port: 3000,
    strictPort: true
  },
  build: {
    outDir: "dist", // Ensure Vercel picks the correct folder
    sourcemap: true
  },
  resolve: {
    alias: {
      "@": "/src" // Clean import paths
    }
  }
});
