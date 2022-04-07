<script setup lang="ts">
import HomePagePaginationItem from '@/components/HomePage/Pagination/HomePagePaginationItem.vue'
import HomePagePaginationButton from '@/components/HomePage/Pagination/HomePagePaginationButton.vue'

import { useHomePagePagination } from '@/hooks/useHomePagePagination'

const props = defineProps<{
  totalPage: number
  currentPage: number
}>()

const emit = defineEmits<{
  (e: 'change-current-page', currentPage: number): void
}>()

const { changeCurrentPage } = useHomePagePagination(props, emit)
</script>

<template>
  <footer class="footer-pagination">
    <ul class="pagination pagination-lg m-0 d-flex align-items-center">
      <HomePagePaginationButton aria-label="Previous" aria-direction="left" @click="changeCurrentPage(currentPage, false)" />

      <HomePagePaginationItem
        v-for="page in 10"
        @click="changeCurrentPage(page)"
        :page="page"
        :currentPage="currentPage"
      ></HomePagePaginationItem>

      <HomePagePaginationButton aria-label="Next" aria-direction="right" @click="changeCurrentPage(currentPage, true)" />
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
