import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePluginFonts } from 'vite-plugin-fonts'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [vue(),
    VitePluginFonts({
      google: {
        families: [
          "Kaushan Script",
          {
            name: "Londrina Solid",
            styles: "wght@300;400",
            defer: true,
          }
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
