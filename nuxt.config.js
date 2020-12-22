// nuxt配置文件
export default {
  components: true,
  router: {
    linkActiveClass: 'active',
    extendRoutes(routes, resolve) {
      routes.push(
        {
          name: 'register',
          path: '/register',
          component: resolve(__dirname, 'pages/login'),
        },
        {
          name: 'profile-username-favorites',
          path: '/profile/:username?/favorites',
          component: resolve(
            __dirname,
            'pages/profile/_username/index.vue'
          ),
        }
      )
    },
  },
  plugins: [
    '~/plugins/request.js',
    '~/plugins/vue-tools.js',
  ],
}
