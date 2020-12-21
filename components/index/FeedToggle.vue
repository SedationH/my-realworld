<template>
  <div class="feed-toggle">
    <ul class="nav nav-pills outline-active">
      <li v-if="user" class="nav-item">
        <nuxt-link
          class="nav-link"
          :class="{ active: tab === 'YF' }"
          :to="{
            name: 'index',
            query: {
              page: 1,
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
              page: 1,
              tab: 'GF',
            },
          }"
          exact
        >
          Global Feed
        </nuxt-link>
      </li>
      <li class="nav-item">
        <nuxt-link
          v-if="tag"
          class="nav-link"
          :class="{ active: tag }"
          :to="{
            name: 'index',
            query: {
              tag,
              tab: 'TF',
              page: 1,
            },
          }"
          exact
        >
          # {{ tag }}
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ['page', 'tag', 'tab', 'user'],
}
</script>

<style></style>
