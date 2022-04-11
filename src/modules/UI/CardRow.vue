<script setup lang="ts">
const props = defineProps<{
  title: string
}>()
</script>

<template>
  <p class="row__text my-1">
    <span class="row__small-title">{{ title }}</span>

    <span class="row__value">
      <slot name="default"> </slot>
    </span>
  </p>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/adaptive-value-mixin';
.row {
  // .row__text
  &__text {
    display: flex;
    justify-content: space-between;
    @include adaptive-value('font-size', 11, 8);
  }
  // .row__small-title
  &__small-title {
    @include adaptive-value('font-size', 11, 8);
    font-weight: bold;
  }
  // .row__small-title
  &__value {
    text-align: right;
  }
}
</style>
