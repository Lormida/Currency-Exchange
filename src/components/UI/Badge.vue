<script setup lang="ts">


</script>

<template>
  <span class="card__badge w-auto badge rounded-pill bg-success">
    <slot name="default"></slot>
  </span>


</template>

<style lang="scss" scoped>
.card__badge  {
  font-size: 11px;
}
</style>
