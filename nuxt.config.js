export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'boardgameden',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      {
        charset: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        hid: 'description',
        name: 'description',
        content: '',
      },
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico',
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['./assets/styles/global.scss'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    '@nuxtjs/style-resources',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ['@nuxtjs/style-resources', '@nuxtjs/axios', '@nuxtjs/auth-next'],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
  styleResources: {
    // your settings here
    scss: ['./assets/styles/resources.scss'],
  },

  axios: {
    baseUrl: 'http://206.81.26.160',
  },

  auth: {
    redirect: {
      login: '/login',
      logout: '/',
      callback: '/login',
      home: '/profile',
    },
    strategies: {
      local: {
        token: {
          property: 'data.access_token',
          // required: true,
          // type: 'Bearer'
        },
        user: {
          property: 'data',
          // autoFetch: true
        },
        endpoints: {
          login: { url: '/auth/login', method: 'post' },
          logout: false,
          user: { url: '/users/me?fields=*.*.*', method: 'get' },
        },
      },
    },
  },
}
