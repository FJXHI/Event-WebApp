import { fileURLToPath, URL } from 'node:url'

import { VitePWA } from 'vite-plugin-pwa';
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/Event-WebApp/',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  plugins: [vue(), VitePWA({
    strategies: 'injectManifest',
    srcDir: 'src',
    filename: 'sw.ts',
    registerType: 'autoUpdate',
    injectRegister: false,

    pwaAssets: {
      disabled: false,
      config: true,
    },

    manifest: {
      name: 'Kosmos 2025',
      short_name: 'Kosmos',
      description: 'Inoffizielle WebApp für Kosmos 2025',
      theme_color: '#ffffff',
    },

    injectManifest: {
      globPatterns: ['**/*.{js,css,html,svg,png,ico}'],
    },

    devOptions: {
      enabled: false,
      navigateFallback: 'index.html',
      suppressWarnings: true,
      type: 'module',
    },
  })],
  define: {
    __BUILD_DATE__: JSON.stringify(new Date().toISOString()),
  },
})