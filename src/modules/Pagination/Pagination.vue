<script setup lang="ts">
import PaginationItem from '@/modules/Pagination/_components/PaginationItem.vue'
import PaginationButton from '@/modules/Pagination/_components/PaginationButton.vue'

import { usePagination } from './hooks/usePagination'

const props = defineProps<{
  totalPage: number
  currentPage: number
}>()

const emit = defineEmits<{
  (e: 'change-current-page', currentPage: number): void
}>()

const { changeCurrentPage } = usePagination(props, emit)
</script>

<template>
  <footer class="footer-pagination">
    <ul class="pagination pagination-lg m-0 d-flex align-items-center">
      <PaginationButton aria-label="Previous" aria-direction="left" @click="changeCurrentPage(currentPage, false)" />

      <PaginationItem v-for="page in 10" @click="changeCurrentPage(page)" :page="page" :currentPage="currentPage"></PaginationItem>

      <PaginationButton aria-label="Next" aria-direction="right" @click="changeCurrentPage(currentPage, true)" />
    </ul>
  </footer>
</template>

<style lang="scss" scoped>
.footer-pagination {
  height: auto;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: $paginationBg;
}
</style>
