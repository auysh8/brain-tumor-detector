import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // REPLACE 'repo-name' with the exact name of your GitHub repository
  // Example: if your repo is 'brain-tumor-detector', use base: '/brain-tumor-detector/'
  base: "/YOUR_REPO_NAME/", 
  build: {
    chunkSizeWarningLimit: 1600,
    rollupOptions: {
      output: {
        manualChunks(id) {
            if (id.includes('node_modules')) {
                if (id.includes('@tensorflow')) {
                    return 'tensorflow';
                }
                return 'vendor';
            }
        }
      }
    }
  }
})