import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  base: '/MoneyTracker/',
  plugins: [
    preact(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'MoniKu',
        short_name: 'MoniKu',
        start_url: '/MoneyTracker/',
        display: 'standalone',
        theme_color: '#10b981',
        background_color: '#ffffff',
        icons: [
          {
            src: '/MoneyTracker/icon-192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/MoneyTracker/icon-512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ]
});
