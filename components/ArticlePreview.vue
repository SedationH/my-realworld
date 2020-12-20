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
                username: article.author.use,
              },
            }"
          >
            {{ article.author.username }}
          </nuxt-link>
          <span class="date"> {{ article.createdAt }}</span>
        </div>
        <button
          class="btn btn-outline-primary btn-sm pull-xs-right"
        >
          <i class="ion-heart"></i> 29
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
export default {
  props: {
    articles: {
      type: Array,
      required: true,
    },
  },
}
</script>
