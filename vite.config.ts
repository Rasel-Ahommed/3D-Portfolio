import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    target: 'es2022',
    cssCodeSplit: true,
    chunkSizeWarningLimit: 1200,
    rollupOptions: {
      output: {
        // three.js / R3F are only reachable through the lazily-imported 3D scene,
        // so they are split automatically and never block first paint.
        manualChunks(id) {
          if (id.includes('vite/preload-helper') || id.includes('commonjsHelpers')) return 'react';
          if (!id.includes('node_modules')) return;
          if (/[\\/](three|@react-three|postprocessing|three-stdlib|troika|camera-controls|maath|meshline|stats)/.test(id)) return 'webgl';
          if (/[\\/](react|react-dom|react-router|scheduler)[\\/]/.test(id)) return 'react';
          if (/[\\/](gsap|motion|framer-motion|motion-dom|motion-utils|lenis)[\\/]/.test(id)) return 'motion';
        },
      },
    },
  },
});
