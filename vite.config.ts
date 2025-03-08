import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    rollupOptions: {
      input: 'index.html' // Ensure index.html is correctly used
    }
  },
  server: {
    host: true, // Allows external access (useful in some cases)
    port: 3000, // You can change this if needed
  },
  preview: {
    port: 4173, // Default Vite preview port
  }
});
