export default defineNuxtConfig({
  runtimeConfig: {
    // 🔒 Secret key - backend only
    paystackSecretKey: process.env.NUXT_SECRET_PAYSTACK_KEY,

    // ✅ Public key - frontend safe
    public: {
    apiUrl: process.env.Nuxt_PUBLIC_API_URL,
      paystackPublicKey: process.env.NUXT_PUBLIC_PAYSTACK_KEY
    }
  },  // ← don't forget this comma

  devtools: { enabled: true },

  compatibilityDate: '2024-04-03',

  modules: [],

  plugins: ['~/plugins/bootstrap.client.ts'],

  app: {
    head: {
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap'
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&family=Roboto:wght@400;700&display=swap'
        }
      ]
    }
  }
})