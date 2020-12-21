<template>
  <div class="article-meta">
    <nuxt-link
      :to="{
        name: 'profile-username',
        params: {
          username: article.author.username,
        },
      }"
    >
      <img :src="article.author.image" />
    </nuxt-link>
    <div class="info">
      <nuxt-link
        :to="{
          name: 'profile-username',
          params: {
            username: article.author.username,
          },
        }"
        class="author"
      >
        {{ article.author.username }}
      </nuxt-link>
      <span class="date">{{
        article.createdAt | date
      }}</span>
    </div>
    <template v-if="!isAuthor">
      <button
        class="btn btn-sm btn-outline-secondary"
        :disabled="article.disabled"
        :class="{ active: article.author.following }"
        @click="handleFollowBtnClick(article)"
      >
        <i class="ion-plus-round"></i>
        &nbsp;
        {{
          article.author.following ? 'Unfollow' : 'Follow'
        }}
        {{ article.author.username }}
      </button>
      &nbsp;&nbsp;
      <button
        class="btn btn-sm btn-outline-primary"
        @click="handleFavoriteBtnClick(article)"
        :disabled="article.disabled"
        :class="{ active: article.favorited }"
      >
        <i class="ion-heart"></i>
        &nbsp;{{
          !article.favorited ? ' Favorite' : 'Unfavorite'
        }}
        Post
        <span class="counter"
          >({{ article.favoritesCount }})
        </span>
      </button>
    </template>
    <template v-else>
      <nuxt-link
        class="btn btn-outline-secondary btn-sm"
        :to="{
          name: 'editor-slug',
          params: {
            slug: article.slug,
          },
        }"
      >
        <i class="ion-edit"></i> Edit Article
      </nuxt-link>
      <button
        :disabled="article.disabled"
        @click="handleDeleteBtnClick(article)"
        class="btn btn-outline-danger btn-sm"
      >
        <i class="ion-trash-a"></i>
        Delete Article
      </button>
    </template>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { favorite, deleteArticle } from '~/api/article'
import { follow } from '~/api/profile'

export default {
  props: ['article'],
  computed: {
    ...mapState(['user']),
    isAuthor() {
      return (
        this.article.author.username === this.user.username
      )
    },
  },
  methods: {
    async handleFavoriteBtnClick(article) {
      // 临时整活 ❤️了❤️了
      // 没想到能这么写 响应化处理
      this.$set(article, 'disabled', true)
      try {
        await favorite(article.slug, article.favorited)
        article.favorited = !article.favorited
        article.favorited
          ? (article.favoritesCount += 1)
          : (article.favoritesCount -= 1)
        article.disabled = false
      } catch (e) {
        article.disabled = false
      }
    },
    async handleFollowBtnClick(article) {
      this.$set(article, 'disabled', true)
      try {
        await follow(
          article.author.username,
          article.author.following
        )
        article.author.following = !article.author.following
        article.disabled = false
      } catch (e) {
        article.disabled = false
      }
    },
    async handleDeleteBtnClick(article) {
      this.$set(article, 'disabled', true)
      try {
        await deleteArticle(article.slug)
        article.disabled = false
        this.$router.push({
          name: 'profile-username',
          params: {
            username: article.author.username,
          },
        })
      } catch (e) {
        article.disabled = false
      }
    },
  },
}
</script>

<style></style>
