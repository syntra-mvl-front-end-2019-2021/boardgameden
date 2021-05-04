export default {
  publicRuntimeConfig: {
    baseURL: process.env.BASE_URL,
    gbURL: process.env.GB_URL,
    gbClientId: process.env.GB_CLIENT_ID,
  },
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
    script: [
      { src: 'gsap/TweenMax.min.js' },
      { src: 'gsap/MorphSVGPlugin.min.js' },
      { src: 'gsap/SplitText.min.js' },
      { src: 'gsap/DrawSVGPlugin.min.js' },
      { src: 'gsap/GSDevTools.min.js' },
      {
        src: '~/plugins/debug.addIndicators.js',
        ssr: false,
      },
      { src: '~/plugins/scrollmagic.js', ssr: false },
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
    '@braid/vue-formulate/nuxt',
    '@nuxtjs/eslint-module',
    '@nuxtjs/style-resources',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ['@nuxtjs/style-resources', '@nuxtjs/axios', '@nuxtjs/auth-next'],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: { vendor: ['scrollmagic'] },
  styleResources: {
    // your settings here
    scss: ['./assets/styles/resources.scss'],
  },

  axios: {
    baseUrl: process.env.BASE_URL,
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
        },
        user: {
          property: 'data',
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
