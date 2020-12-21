<template>
  <div class="card">
    <div class="card-block">
      <p class="card-text">
        {{ comment.body }}
      </p>
    </div>
    <div class="card-footer">
      <nuxt-link
        :to="{
          name: 'profile-username',
          params: {
            username: comment.author.username,
          },
        }"
        class="comment-author"
      >
        <img
          :src="comment.author.image"
          class="comment-author-img"
        />
      </nuxt-link>
      &nbsp;
      <nuxt-link
        :to="{
          name: 'profile-username',
          params: {
            username: comment.author.username,
          },
        }"
        class="comment-author"
      >
        {{ comment.author.username }}
      </nuxt-link>
      <span class="date-posted">{{
        comment.createdAt | date
      }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    comment: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style></style>
