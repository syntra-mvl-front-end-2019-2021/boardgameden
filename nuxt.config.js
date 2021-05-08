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
        },
        refreshToken: {
          property: 'data.refresh_token',
          data: 'refresh_token',
        },
        user: {
          property: 'data',
        },
        endpoints: {
          login: { url: '/auth/login', method: 'post' },
          refresh: { url: '/auth/refresh', method: 'post' },
          logout: false,
          user: { url: '/users/me?fields=*.*.*', method: 'get' },
        },
      },
    },
  },
}
