<template>
  <div>
    <div
      class="article-preview"
      v-for="article in articles"
      :key="article.slug"
    >
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
          >
            {{ article.author.username }}
          </nuxt-link>
          <span class="date">
            {{ article.createdAt | date }}
          </span>
        </div>
        <button
          class="btn btn-outline-primary btn-sm pull-xs-right"
          @click="handleFavoriteBtnClick(article)"
          :disabled="article.disabled"
          :class="{ active: article.favorited }"
        >
          <i class="ion-heart"></i>
          {{ article.favoritesCount }}
        </button>
      </div>
      <nuxt-link
        class="preview-link"
        :to="{
          name: 'article-slug',
          params: {
            slug: article.slug,
          },
        }"
      >
        <h1>{{ article.title }}</h1>
        <p>{{ article.description }}</p>
        <span>Read more...</span>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import { favorite } from '~/api/article'
export default {
  props: {
    articles: {
      type: Array,
      required: true,
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
  },
}
</script>
