<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">
            {{ isLogin ? 'Sign in' : 'Sign up' }}
          </h1>
          <p class="text-xs-center">
            <nuxt-link v-if="isLogin" to="register">
              Need an account?
            </nuxt-link>
            <nuxt-link v-else to="login"
              >Have an account?</nuxt-link
            >
          </p>

          <ErrorMessage :errors="errors" />

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
              :disabled="disable"
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
import { login, register } from '~/api/user'

export default {
  middleware: 'notAuth',
  data: () => ({
    user: {
      username: '',
      email: 'sedationh@gmail.com',
      password: '12345678',
    },
    disable: false,
    errors: {},
  }),
  computed: {
    isLogin() {
      return this.$route.name === 'login'
    },
  },
  methods: {
    async handleBtn() {
      // 没必要判断 这个方法只会在client上执行
      // const Cookie = process.client
      //   ? await import('js-cookie')
      //   : undefined
      const Cookie = await import('js-cookie')

      // TODO: 校验
      this.disable = true
      try {
        const { user } = this
        const { data } = this.isLogin
          ? await login({ user })
          : await register({ user })
        // 在vuex中全局保存用户信息
        this.$store.commit('setUser', data.user)
        // 持久化
        Cookie.set('user', data.user)
        this.$router.push('/')
      } catch (e) {
        console.dir(e)
        this.errors = e.response.data.errors
        this.disable = false
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
