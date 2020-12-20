<template>
  <div class="home-page">
    <div class="banner">
      <div class="container">
        <h1 class="logo-font">conduit</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>

    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <a class="nav-link disabled" href=""
                  >Your Feed</a
                >
              </li>
              <li class="nav-item">
                <a class="nav-link active" href=""
                  >Global Feed</a
                >
              </li>
            </ul>
          </div>

          <ArticlePreview :articles="articles" />
          <Pagination :totalPage="totalPage" :page="page" />
        </div>

        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>

            <div class="tag-list">
              <a href="" class="tag-pill tag-default"
                >programming</a
              >
              <a href="" class="tag-pill tag-default"
                >javascript</a
              >
              <a href="" class="tag-pill tag-default"
                >emberjs</a
              >
              <a href="" class="tag-pill tag-default"
                >angularjs</a
              >
              <a href="" class="tag-pill tag-default"
                >react</a
              >
              <a href="" class="tag-pill tag-default"
                >mean</a
              >
              <a href="" class="tag-pill tag-default"
                >node</a
              >
              <a href="" class="tag-pill tag-default"
                >rails</a
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getArticles } from '~/api/article'

export default {
  async asyncData({ query }) {
    const page = parseInt(query.page) || 1,
      limit = 10,
      offset = (page - 1) * limit
    const [articlesRes] = await Promise.all([
      getArticles({
        limit,
        offset,
      }),
    ])
    const { articles, articlesCount } = articlesRes.data
    return {
      articles,
      articlesCount,
      limit,
      page,
    }
  },
  head() {
    return {
      title: '首页',
    }
  },
  watchQuery: ['page'],
  computed: {
    totalPage() {
      return Math.ceil(this.articlesCount / this.limit)
    },
  },
}
</script>
