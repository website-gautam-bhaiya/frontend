import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react' 

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist", // Ensures output is placed in "dist"
  },
  server: {
    https: {
      key: './../ssl--certificates/decrypted-key.pem',
      cert: './../ssl--certificates/cert.pem'
    },
    historyApiFallback: true, // 👈 Ensures React Router handles routing correctly
  }
})
