<script setup lang="ts"></script>

<template>
  <header class="market__header">
    <h3 class="market__header-title">Market stats</h3>
  </header>
</template>

<style lang="scss" scoped>
.market {
  // .market__header

  &__header {
  }

  // market__header-title
  &__header-title {
    @include adaptive-value('font-size', 20, 14);
    width: fit-content;
    padding: 4px;
    font-weight: bold;
    border: 2px solid $darkGrey;
    border-radius: 10px;
    margin: 0;
  }
}
</style>
