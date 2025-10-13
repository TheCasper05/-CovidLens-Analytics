export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  ssr: false,

  app: {
    baseURL: '/laboratorio-db/',  // 👈 obligatorio
  },

  router: {
    options: {
      hashMode: true               // 👈 evita pantalla en blanco en GitHub Pages
    }
  },

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
