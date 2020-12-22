<template>
  <div class="settings-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Your Settings</h1>
          <ErrorMessage :errors="errors" />
          <fieldset>
            <fieldset class="form-group">
              <input
                v-model="params.image"
                class="form-control"
                type="text"
                placeholder="URL of profile picture"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                v-model="params.username"
                class="form-control form-control-lg"
                type="text"
                placeholder="Your Name"
              />
            </fieldset>
            <fieldset class="form-group">
              <textarea
                v-model="params.bio"
                class="form-control form-control-lg"
                rows="8"
                placeholder="Short bio about you"
              ></textarea>
            </fieldset>
            <fieldset class="form-group">
              <input
                v-model="params.email"
                class="form-control form-control-lg"
                type="text"
                placeholder="Email"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                v-model="params.password"
                class="form-control
                    form-control-lg"
                type="password"
                placeholder="Password"
              />
            </fieldset>
            <button
              @click="onUpdate"
              :disabled="disabled"
              class="btn btn-lg btn-primary pull-xs-right"
            >
              Update Settings
            </button>
          </fieldset>
          <hr />
          <button
            @click="onLogout"
            class="btn btn-outline-danger"
          >
            Or click here to logout.
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { updateUser } from '~/api/user'
const Cookie = process.client
  ? require('js-cookie')
  : undefined

export default {
  middleware: 'needAuth',
  data() {
    return {
      params: {
        password: '',
      },
      disabled: false,
      errors: {},
    }
  },
  head() {
    return {
      title: `设置 - ${this.user.username}`,
    }
  },
  methods: {
    async onUpdate() {
      this.disabled = true
      try {
        const { data } = await updateUser({
          user: this.params,
        })
        this.$store.commit('setUser', data.user)
        Cookie.set('user', data.user)
        this.disabled = false
        this.$router.push({
          name: 'profile-username',
          params: {
            username: data.user.username,
          },
        })
      } catch (e) {
        this.disabled = false
        this.errors = e
      }
    },
    onLogout() {
      this.$store.commit('setUser', null)
      Cookie.remove('user')
      this.$router.push('/')
    },
  },
  created() {
    const { image, username, bio, email } = this.user
    this.params = Object.assign(
      {},
      { image, username, bio, email },
      this.params
    )
  },
  computed: {
    ...mapState(['user']),
  },
}
</script>
