<script setup lang="ts">
const props = defineProps({
  bgColor: {
    type: String,
    required: false,
    default: `rgba(255,255,255,1)`,
  },
})

</script>

<template>
  <div class="card">
    <div class="card__header card-header">
      <slot name="header"> </slot>
    </div>

    <div class="card__main px-2">
      <slot name="main"></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
// .nav__card-currency-wrapper

.card {
  box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
  background-color: v-bind(bgColor);
  height: auto;
  padding: 10px;
  // .card__header
  &__header {
    gap: 10px;
  }
}
</style>
