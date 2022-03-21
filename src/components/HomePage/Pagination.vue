computed, , watch<template>
  <nav
    class="footer-nav container-fluid d-flex justify-content-center align-items-stretch"
    aria-label="Page navigation example"
  >
    <ul class="pagination pagination-lg my-1">
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
<script lang='ts'>
import { computed, defineComponent, watch } from 'vue';
export default defineComponent({
  props: ['totalPage', 'currentPage'],

  setup(props, ctx) {


    const getCurrentPage = computed(() => {
      return props.currentPage;
    })

    const changeCurrentPage = (pageNumber: number, direction?: boolean) => {
      if (direction === true && props.currentPage < props.totalPage) {
        ctx.emit('change-current-page', props.currentPage + 1)
      }
      else if (direction === false && props.currentPage > 1) {
        ctx.emit('change-current-page', props.currentPage - 1)
      } else {
        ctx.emit('change-current-page', pageNumber)
      }
    }


    return { changeCurrentPage, getCurrentPage, currentPage: props.currentPage }
  }
})
</script>
<style lang='scss' scoped>
.footer-nav {
  position: fixed;
  bottom: 0%;
  background-color: #f0e6ef;
  left: 50%;
  transform: translateX(-50%);
}
.pagination {
}
.active {
  background-color: #e8a598;
}
.page-item {
}
.page-link {
  box-shadow: none;
}
</style>