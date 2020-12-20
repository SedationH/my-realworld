<template>
  <div>
    <ul class="pagination">
      <li
        class="page-item active"
        v-for="item in totalPage"
        :key="item"
      >
        <nuxt-link
          class="page-link "
          :to="{
            name: 'index',
            query: {
              page: item,
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
  },
}
</script>

<style></style>
