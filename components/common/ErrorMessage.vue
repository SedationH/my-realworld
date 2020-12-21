<template>
  <ul class="error-messages">
    <template v-for="(val, key) in errors">
      <li v-for="(item, index) in val" :key="key + index">
        {{ key }} {{ item }}
      </li>
    </template>
  </ul>
</template>

<script>
export default {
  props: {
    errors: {
      type: Object,
      require: true,
    },
  },
}
</script>
