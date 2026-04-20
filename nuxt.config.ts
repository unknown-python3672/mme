export default defineNuxtConfig({
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