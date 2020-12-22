<template>
  <div>
    <img :src="profile.image" class="user-img" />
    <h4>{{ profile.username }}</h4>
    <p>
      {{ profile.bio }}
    </p>
    <button
      v-if="!isAuthor"
      class="btn btn-sm btn-outline-secondary action-btn"
      :disabled="disabled"
      @click="$emit('handleFollowBtnClick')"
    >
      <i class="ion-plus-round"></i>
      &nbsp;
      {{ !profile.following ? 'Follow' : 'Unfollow' }}
      Eric Simons
    </button>
    <button
      v-else
      class="btn btn-sm btn-outline-secondary action-btn"
      @click="handleEditBtnClick"
    >
      <i class="ion-gear-a"></i> Edit Profile Settings
    </button>
  </div>
</template>

<script>
export default {
  props: ['profile', 'isAuthor', 'disabled'],
  methods: {
    handleEditBtnClick() {
      this.$router.push({
        name: 'settings',
      })
    },
  },
}
</script>

<style></style>
