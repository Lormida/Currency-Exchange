<script setup lang="ts">
const props = defineProps<{
  title: string
  subtitle: string
}>()
</script>

<template>
  <h3 class="form-currency__title mb-3">
    {{ title }}
    <br />
    <span class="form-currency__label">[{{ subtitle }}]</span>
  </h3>
</template>

<style lang="scss" scoped>
.form-currency {
  // .form-currency__title

  &__title {
    color: white;
    text-align: center;
  }

  // .form-currency__label

  &__label {
    font-size: 15px;
    font-weight: 800;
    color: lighten($green, 20%);
  }
}
</style>
