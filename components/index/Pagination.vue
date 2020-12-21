<template>
  <div>
    <ul class="pagination">
      <li
        class="page-item"
        v-for="item in totalPage"
        :key="item"
        :class="{
          active: page === item,
        }"
      >
        <nuxt-link
          class="page-link "
          :to="{
            name: 'index',
            query: {
              page: item,
              tag,
              tab,
            },
          }"
        >
          {{ item }}
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    totalPage: {
      type: Number,
      require: true,
    },
    page: {
      type: Number,
      require: true,
    },
    tag: String,
    tab: String,
  },
}
</script>

<style></style>
