<template>
  <div class="profile-page">
    <div class="user-info">
      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-md-10 offset-md-1">
            <ProfileMeta
              :profile="profile"
              :isAuthor="isAuthor"
              @handleFollowBtnClick="handleFollowBtnClick"
              :disabled="disabled"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-md-10 offset-md-1">
          <ArticlesToggle
            :isFavouritesRoute="isFavouritesRoute"
            :profile="profile"
          />

          <ArticlePreview :articles="articles" />

          Tip: 没有处理分页效果
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { getProfile, follow } from '~/api/profile.js'
import { getArticles } from '~/api/article'

export default {
  middleware: 'needAuth',
  async asyncData({ route, query }) {
    const username = route.params.username,
      page = query.page || 1
    const params = {
      page,
      limit: 10,
      offset: (page - 1) * 10,
    }
    route.name === 'profile-username-favorites'
      ? (params.favorited = username)
      : (params.author = username)
    console.log(params)
    const [
      {
        data: { profile },
      },
      {
        data: { articles, articlesCount },
      },
    ] = await Promise.all([
      getProfile(username),
      getArticles(params),
    ])

    return {
      username,
      profile,
      articles,
      articlesCount,
    }
  },
  data: () => ({
    disabled: false,
  }),
  computed: {
    ...mapState(['user']),
    isAuthor() {
      return this.user.username === this.profile.username
    },
    isFavouritesRoute() {
      return (
        this.$route.name === 'profile-username-favorites'
      )
    },
  },
  methods: {
    async handleFollowBtnClick() {
      this.disabled = true
      try {
        await follow(
          this.user.username,
          this.profile.following
        )
        this.profile.following = !this.profile.following
        this.disabled = false
      } catch (e) {
        this.disabled = false
      }
    },
  },
}
</script>
