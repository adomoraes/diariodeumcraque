import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import postcss from './postcss.config.js'; // Import postcss config

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    postcss, // Explicitly tell Vite to use this postcss config
  },
});