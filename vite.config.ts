import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  build: {
    outDir: "dist", // Ensure Vercel picks up the correct build folder
    sourcemap: true, // Helpful for debugging
  },

  server: {
    host: true, // Ensures Vercel can bind to the correct host
    port: 3000, // Default Vite port (can be changed if needed)
    strictPort: true, // Prevents port conflicts
    open: false, // Prevents browser auto-opening on local dev
  },

  resolve: {
    alias: {
      "@": "/src", // Helps with cleaner imports like "@/components/Button"
    },
  },

  define: {
    "process.env": {}, // Ensures process.env is handled correctly
  },
});
