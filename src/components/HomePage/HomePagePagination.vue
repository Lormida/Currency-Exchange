<script setup lang='ts'>
import { computed, defineProps } from 'vue';

interface Props {
  totalPage: number,
  currentPage: number,
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'change-current-page', currentPage: number): void,
}>()

const getCurrentPage = computed(() => {
  return props.currentPage;
})

const changeCurrentPage = (pageNumber: number, direction?: boolean) => {
  if (direction === true && props.currentPage < props.totalPage) {
    emit('change-current-page', props.currentPage + 1)
  }
  else if (direction === false && props.currentPage > 1) {
    emit('change-current-page', props.currentPage - 1)
  } else {
    emit('change-current-page', pageNumber)
  }
}
</script>

<template>
  <nav
    class="footer-nav container-fluid d-flex justify-content-center align-items-stretch"
    aria-label="Page navigation example"
  >
    <ul class="pagination pagination-lg m-0 d-flex align-items-center">
      <li class="page-item">
        <a
          class="page-link"
          href="#"
          aria-label="Previous"
          @click="changeCurrentPage(currentPage, false)"
        >
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li v-for="page in totalPage" class="page-item" @click="changeCurrentPage(page)">
        <a class="page-link" :class="{ 'active': getCurrentPage == page }" href="#">{{ page }}</a>
      </li>
      <li class="page-item">
        <a
          class="page-link"
          href="#"
          aria-label="Next"
          @click="changeCurrentPage(currentPage, true)"
        >
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<style lang='scss' scoped>
span {
  display: block;
}
.footer-nav {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f0e6ef;
}
.pagination {
}
.active {
  background-color: #bcd4e6;
}
.page-item {
}
.page-link {
  box-shadow: none;
}
</style>