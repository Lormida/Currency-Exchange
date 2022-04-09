<script setup lang="ts">
const props = defineProps<{
  title: string
}>()
</script>

<template>
  <p class="row__text my-1">
    <span class="row__small-title">{{ title }}</span>
    <slot name="default"> </slot>
  </p>
</template>

<style lang="scss" scoped>
.row {
  // .row__text
  &__text {
    display: flex;
    justify-content: space-between;
    font-size: 11px;
  }
  // .row__small-title
  &__small-title {
    font-size: 10 px;
    font-weight: bold;
  }
}
</style>
