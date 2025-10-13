// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  // 🛑 Desactivar SSR para GitHub Pages (solo frontend)
  ssr: false,

  // 🌐 Base URL para GitHub Pages (usa el nombre exacto del repo)
  app: {
    baseURL: '/laboratorio-db/', // 👈 IMPORTANTE
  },

  // ⚙️ Necesario para generar archivos estáticos para GitHub Pages
  nitro: {
    preset: 'github-pages'
  },

  css: [
    'primeicons/primeicons.css'
  ],

  build: {
    transpile: ['primevue', 'chart.js']
  },

  runtimeConfig: {
    public: {
      apiBase: process.env.API_BASE_URL || 'http://localhost:5001'
    }
  }
})
