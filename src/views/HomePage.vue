<script setup lang='ts'>
import ApiService from '@/utils/ApiService'
import { useStore } from '@/store'
import HomePageTableCurrencies from '@/components/HomePage/HomePageTableCurrencies.vue'
import HomePageNavbar from '@/components/HomePage/HomePageNavbar.vue'
import HomePagePagination from '@/components/HomePage/HomePagePagination.vue';
import { computed, onMounted, Ref, ref } from 'vue';
import SpinnerLoader from '../components/UI/SpinnerLoader.vue';

//* Initialization
const store = useStore()
const limit = 7
const currentPage = ref(1)
const totalPage = Math.ceil(100 / limit)


const setNewPage = async (pageNumber: number) => {
  currentPage.value = pageNumber
  await fetchData(currentPage, limit)
}

const fetchData = async (currentPage: Ref<number>, limit: number) => {
  ApiService.setLoading(true)

  ApiService.getAllCurrencies({ currentPage: currentPage.value, limit })
    .then(() => {
      ApiService.setLoading(false)
    })
}

const getCurrentPage = computed(() => currentPage.value)
const getCurrencies = computed(() => store.getters.getCurrencies)
const getIsLoading = computed(() => store.getters.getIsLoading)

onMounted(async () => {
  await fetchData(currentPage, limit)
})

</script>

<template>
  <div class="home-container d-flex flex-column">
    <header class="header mw-100 p-0 m-0 container-fluid">
      <HomePageNavbar />
    </header>

    <main class="main">
      <HomePageTableCurrencies
        v-if="!getIsLoading && Object.keys(getCurrencies).length > 0"
        :limit="limit"
        :currentPage="currentPage"
        :currencies="getCurrencies"
      ></HomePageTableCurrencies>
      <SpinnerLoader v-else></SpinnerLoader>
    </main>

    <footer class="footer">
      <HomePagePagination
        :currentPage="getCurrentPage"
        :totalPage="totalPage"
        @change-current-page="setNewPage"
      ></HomePagePagination>
    </footer>
  </div>
</template>


<style lang='scss' scoped>
.home-container {
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
}
.header {
  height: 33%;
}
.main {
  position: relative;
  height: 58%;
  background-color: rgba(22, 22, 22, 0.85);
  display: flex;
  justify-content: center;
  align-items: center;
}
.footer {
  height: 9%;
}
</style>