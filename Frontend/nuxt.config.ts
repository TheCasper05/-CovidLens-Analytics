// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  ssr: false,

  app: {
    baseURL: '/laboratorio-db/', // 👈 MUY IMPORTANTE
    buildAssetsDir: '/laboratorio-db/_nuxt/' // 👈 Opcionalmente forzado
  },

  router: {
    options: {
      hashMode: true  // 👈 Evita páginas en blanco y rutas rotas
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
