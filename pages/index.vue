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
              <li v-if="user" class="nav-item">
                <nuxt-link
                  class="nav-link"
                  :class="{ active: tab === 'YF' }"
                  :to="{
                    name: 'index',
                    query: {
                      page,
                      tag,
                      tab: 'YF',
                    },
                  }"
                  exact
                >
                  Your Feed
                </nuxt-link>
              </li>
              <li class="nav-item">
                <nuxt-link
                  class="nav-link"
                  :class="{ active: tab === 'GF' }"
                  :to="{
                    name: 'index',
                    query: {
                      page,
                      tag,
                      tab: 'GF',
                    },
                  }"
                  exact
                >
                  Global Feed
                </nuxt-link>
              </li>
            </ul>
          </div>

          <ArticlePreview :articles="articles" />
          <Pagination
            :totalPage="totalPage"
            :page="page"
            :tag="tag"
          />
        </div>

        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>

            <div class="tag-list">
              <nuxt-link
                class="tag-pill tag-default"
                v-for="(item, index) in tags"
                :key="index"
                :to="{
                  name: 'index',
                  query: {
                    page,
                    tag: item,
                  },
                }"
              >
                {{ item }}
              </nuxt-link>
            </div>
          </div>
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
