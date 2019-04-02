const pkg = require('./package')

module.exports = {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  loading: { color: '#fff' },

  css: [
    '@/assets/fonts/stylesheet.css',
    '@/assets/stylesheets/buefy.scss',
    '@/assets/stylesheets/app.scss',
    'quill/dist/quill.snow.css',
    // 'quill/dist/quill.bubble.css',
    'quill/dist/quill.core.css'
  ],

  styleResources: {
    scss: [
      '@/assets/stylesheets/vars.scss',
    ],
  },

  plugins: [
    '~/plugins/api',
    '~/plugins/misc',
    { src: '~plugins/quill', ssr: false },
    '~plugins/vee-validate.js',
  ],

  modules: [
    '@nuxtjs/axios',
    ['nuxt-buefy', { materialDesignIcons: true }],
    '@nuxtjs/moment',
    '@nuxtjs/style-resources',
  ],

  env: {
    uploadUrl: '/uploads/'
  },

  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  /*
  ** Build configuration
  */
  build: {
    postcss: {
      preset: {
        features: {
          customProperties: false
        }
      }
    },
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
