// nuxt配置文件
export default {
  router: {
    extendRoutes(routes, resolve) {
      routes.push({
        name: 'register',
        path: '/register',
        component: resolve(__dirname, 'pages/login'),
      })
    },
  },
}
