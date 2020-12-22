<template>
  <div class="articles-toggle">
    <ul class="nav nav-pills outline-active">
      <li class="nav-item">
        <nuxt-link
          class="nav-link"
          :class="{ active: !isFavouritesRoute }"
          :to="{
            name: 'profile-username',
            params: {
              username: profile.username,
            },
          }"
          exact
        >
          My Articles
        </nuxt-link>
      </li>
      <li class="nav-item">
        <nuxt-link
          class="nav-link "
          :class="{ active: isFavouritesRoute }"
          :to="{
            name: 'profile-username-favorites',
            params: {
              username: profile.username,
            },
          }"
        >
          Favorited Articles
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ['isFavouritesRoute', 'profile'],
}
</script>

<style></style>
