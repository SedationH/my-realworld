<template>
  <div class="article-page">
    <div class="banner">
      <div class="container">
        <h1>{{ article.title }}</h1>
        <ArticleMeta :article="article" />
      </div>
    </div>

    <div class="container page">
      <div class="row article-content">
        <div class="col-md-12">
          <div
            class="col-md-12"
            v-html="$options.filters.md(article.body)"
          ></div>
        </div>
      </div>

      <hr />

      <div class="article-actions">
        <ArticleMeta :article="article" />
      </div>

      <div class="row">
        <div class="col-xs-12 col-md-8 offset-md-2">
          <CommentForm @initComments="initComments" />

          <Card
            v-for="comment in comments"
            :key="comment.id"
            :comment="comment"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getSingleArticle,
  getComments,
} from '~/api/article'

export default {
  data: () => ({
    comments: [],
  }),
  async asyncData({
    route: {
      params: { slug },
    },
  }) {
    const {
      data: { article },
    } = await getSingleArticle(slug)

    return {
      article,
    }
  },
  methods: {
    async initComments() {
      const {
        data: { comments },
      } = await getComments(this.$route.params.slug)
      this.comments = comments
    },
  },
  created() {
    this.initComments()
  },
}
</script>
