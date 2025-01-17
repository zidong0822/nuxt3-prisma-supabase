// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  nitro: {
    experimental: {
      openAPI: true
    }
  },
  runtimeConfig: {
    DATABASE_URL: process.env.DATABASE_URL
  }
})
