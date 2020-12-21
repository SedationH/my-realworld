<template>
  <div>
    <ErrorMessage :errors="errors" />
    <form class="card comment-form">
      <div class="card-block">
        <textarea
          class="form-control"
          placeholder="Write a comment..."
          rows="3"
          v-model="commentContent"
        ></textarea>
      </div>
      <div class="card-footer">
        <img :src="user.image" class="comment-author-img" />
        <button
          @click="handlePostComment"
          class="btn btn-sm btn-primary"
          :disabled="disablePostCommentBtn"
        >
          Post Comment
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { addComment } from '~/api/article'
export default {
  computed: {
    ...mapState(['user']),
  },
  data: () => ({
    commentContent: '',
    disablePostCommentBtn: false,
    errors: {},
  }),
  methods: {
    handlePostComment() {
      this.disablePostCommentBtn = true
      addComment(this.$route.params.slug, {
        comment: { body: this.commentContent },
      })
        .then(res => {
          this.disablePostCommentBtn = false
          this.errors = {}
          this.$emit('initComments')
        })
        .catch(reason => {
          this.disablePostCommentBtn = false
          this.errors = reason.response
            ? reason.message
            : reason.response.data.errors
        })
    },
  },
}
</script>

<style></style>
