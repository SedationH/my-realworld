const cookieParser = process.server
  ? require('cookieparser')
  : undefined

export default {
  state: () => ({
    user: null,
  }),
  mutations: {
    setUser(state, payload) {
      state.user = payload
    },
  },
  actions: {
    // If the action nuxtServerInit is defined in the store
    // and the mode is universal,
    // Nuxt.js will call it with the context
    // (only from the server-side).
    // It's useful when we have some data on the
    // server we want to give directly to the client-side.
    nuxtServerInit({ commit }, { req }) {
      let user = null
      if (req.headers.cookie) {
        const parsed = cookieParser.parse(
          req.headers.cookie
        )
        try {
          user = JSON.parse(parsed.user)
        } catch (err) {
          // No valid cookie found
        }
      }
      commit('setUser', user)
    },
  },
}
