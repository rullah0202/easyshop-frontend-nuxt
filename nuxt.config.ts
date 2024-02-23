// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  pages: true,
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: [
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    'nuxt-lodash',
    '@vite-pwa/nuxt',
    'nuxt-icon',
    'nuxt-lodash'
  ],
  runtimeConfig: {
    public: {
      stripePK: process.env.STRIPE_PK_KEY,
    }
  },
  pwa: {
    manifest: {
      name: 'Easy Shop',
      short_name: 'Easy Shop',
      description: 'This is Easy Shop',
      theme_color: '#FD374F',
      icons: [
        {
          src: "pwa-192x192.png",
          sizes: "192x192",
          type: "image/png"
        },
        {
          src: "pwa-512x512.png",
          sizes: "512x512",
          type: "image/png"
        },
      ]
    },
    devOptions: {
      enabled: true,
      type: "module"
    }
  },
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
      script: [
        { src: 'https://js.stripe.com/v3/', defer:true }
      ]
    },
  }
})
