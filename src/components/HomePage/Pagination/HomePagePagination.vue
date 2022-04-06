<script setup lang="ts">
import HomePagePaginationItem from '@/components/HomePage/Pagination/HomePagePaginationItem.vue'
import HomePagePaginationButton from '@/components/HomePage/Pagination/HomePagePaginationButton.vue'
import { defineProps } from 'vue'

interface Props {
  totalPage: number
  currentPage: number
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'change-current-page', currentPage: number): void
}>()

const changeCurrentPage = (pageNumber: number, direction?: boolean) => {
  if (direction === true && props.currentPage < props.totalPage) emit('change-current-page', props.currentPage + 1)
  else if (direction === false && props.currentPage > 1) emit('change-current-page', props.currentPage - 1)
  else emit('change-current-page', pageNumber)
}
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
