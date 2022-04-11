<script setup lang="ts"></script>

<template>
  <h3 class="text-center fw-bold p-4 m-0">
    <slot name="default"></slot>
  </h3>
</template>

<style lang="scss" scoped>
h3 {
  @include adaptive-value('font-size', 23, 16);
}
</style>
