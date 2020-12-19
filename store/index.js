export default {
  state: () => ({
    user: null,
  }),
  mutations: {
    setUser(state, payload) {
      state.user = payload
    },
  },
}