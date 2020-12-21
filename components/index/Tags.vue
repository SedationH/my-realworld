<template>
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
            page: 1,
            tag: item,
            tab: 'TF',
          },
        }"
      >
        {{ item }}
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    tags: {
      type: Array,
      required: true,
    },
  },
}
</script>

<style></style>
