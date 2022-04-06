<script setup lang="ts">
import { computed } from 'vue'
const props = defineProps<{
  page: number
  currentPage: number
}>()

const getCurrentPage = computed(() => {
  return props.currentPage
})
</script>

<template>
  <li class="pagination-item page-item">
    <a class="pagination-item__link page-link" :class="{ active: getCurrentPage == page }" href="#">{{ page }}</a>
  </li>
</template>

<style lang="scss" scoped>
.active {
  background-color: $paginationActive;
}

</style>
