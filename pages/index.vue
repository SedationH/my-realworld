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
          <FeedToggle
            :page="page"
            :tag="tag"
            :tab="tab"
            :user="user"
          />

          <ArticlePreview :articles="articles" />
          <Pagination
            :totalPage="totalPage"
            :page="page"
            :tag="tag"
            :tab="tab"
          />
        </div>

        <div class="col-md-3">
          <Tags :tags="tags" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getArticles, getFeedArticles } from '~/api/article'
import { getTags } from '~/api/tags'
import { mapState } from 'vuex'
export default {
  // tab:
  //   YF -> Your Feed;
  //   GF -> Global Feed
  //   TF -> Tag Feed
  async asyncData({ query }) {
    const page = parseInt(query.page) || 1,
      limit = 10,
      offset = (page - 1) * limit,
      tag = query.tag,
      tab = query.tab || 'GF',
      loadArticles =
        tab === 'YF' ? getFeedArticles : getArticles

    const [
      {
        data: { articles, articlesCount },
      },
      {
        data: { tags },
      },
    ] = await Promise.all([
      loadArticles({
        limit,
        offset,
        tag,
      }),
      getTags(),
    ])
    return {
      articles,
      articlesCount,
      limit,
      page,
      tags,
      tag,
      tab,
    }
  },
  head() {
    return {
      title: '首页',
    }
  },
  watchQuery: ['page', 'tag', 'tab'],
  computed: {
    ...mapState(['user']),
    totalPage() {
      return Math.ceil(this.articlesCount / this.limit)
    },
  },
}
</script>
