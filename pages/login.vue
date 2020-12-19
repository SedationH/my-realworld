<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Sign up</h1>
          <p class="text-xs-center">
            <nuxt-link v-if="isLogin" to="register">
              Need an account?
            </nuxt-link>
            <nuxt-link v-else to="login"
              >Have an account?</nuxt-link
            >
          </p>

          <ul class="error-messages">
            <li>That email is already taken</li>
          </ul>

          <form>
            <fieldset v-if="!isLogin" class="form-group">
              <input
                v-model="user.username"
                class="form-control form-control-lg"
                type="text"
                placeholder="Your Name"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                v-model="user.email"
                class="form-control form-control-lg"
                type="text"
                placeholder="Email"
              />
            </fieldset>
            <fieldset lass="form-group">
              <input
                v-model="user.password"
                class="form-control form-control-lg"
                type="password"
                placeholder="Password"
              />
            </fieldset>
            <button
              class="btn btn-lg btn-primary pull-xs-right"
              @click.prevent="handleBtn"
            >
              {{ isLogin ? 'Sign in' : 'Sign up' }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { login } from '~/api/user'
import { login } from '~/api/user'

export default {
  data: () => ({
    user: {
      username: '',
      email: 'sedationh@gmail.com',
      password: '12345678',
    },
  }),
  computed: {
    isLogin() {
      return this.$route.name === 'login'
    },
  },
  methods: {
    async handleBtn() {
      try {
        const { user } = this
        const { data } = await login({ user })
        // 在vuex中全局保存用户信息
        this.$store.commit('setUser', data.user)
      } catch (error) {
        console.log(error)
      }
    },
  },
  head() {
    return {
      title: this.isLogin ? '登录' : '注册',
    }
  },
}
</script>
