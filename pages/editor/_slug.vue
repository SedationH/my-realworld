<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-10 offset-md-1 col-xs-12">
          <ErrorMessage :errors="errors" />

          <fieldset>
            <fieldset class="form-group">
              <input
                v-model="article.title"
                type="text"
                class="form-control form-control-lg"
                placeholder="Article Title"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                v-model="article.description"
                type="text"
                class="form-control"
                placeholder="What's this article about?"
              />
            </fieldset>
            <fieldset class="form-group">
              <textarea
                v-model="article.body"
                class="form-control"
                rows="8"
                placeholder="Write your article (in markdown)"
              ></textarea>
            </fieldset>
            <fieldset class="form-group">
              <input
                type="text"
                class="form-control"
                placeholder="Enter to add tags"
                v-model="tag"
                @keyup.enter="handleEnter"
              />
              <div class="tag-list">
                <span
                  class="tag-default tag-pill ng-binding ng-scope"
                  v-for="(item, index) in article.tagList"
                  :key="index"
                  @click="handleRemoveTag(index)"
                >
                  <i class="ion-close-round"></i>
                  {{ item }}
                </span>
              </div>
            </fieldset>
            <button
              class="btn btn-lg pull-xs-right btn-primary"
              type="button"
              @click="handlePublishBtnClick"
              :disabled="disabled"
            >
              Publish Article
            </button>
          </fieldset>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getSingleArticle,
  updateArticle,
  createArticle,
} from '~/api/article'

export default {
  middleware: 'needAuth',
  async asyncData({ route }) {
    const slug = route.params.slug
    if (slug) {
      const {
        data: { article },
      } = await getSingleArticle(slug)
      return {
        article,
        slug,
      }
    }
    return {
      article: {
        title: '',
        description: '',
        body: '',
        tagList: [],
      },
      slug,
    }
  },
  data: () => ({
    errors: {},
    tag: '',
    disabled: false,
  }),
  methods: {
    handleEnter() {
      this.article.tagList.push(this.tag)
      this.tag = ''
    },
    handleRemoveTag(index) {
      this.article.tagList.splice(index, 1)
    },
    async handlePublishBtnClick() {
      this.disabled = true
      try {
        const { slug, article } = this
        const publish = slug
          ? updateArticle(slug, { article })
          : createArticle({ article })
        const { data } = await publish
        this.$router.push({
          name: 'article-slug',
          params: {
            slug: data.article.slug,
          },
        })
        this.disabled = false
      } catch (e) {
        this.errors = e
        this.disabled = false
      }
    },
  },
  head() {
    return {
      title: this.slug
        ? `编辑文章 - ${this.article.title}`
        : '创建文章',
    }
  },
}
</script>
