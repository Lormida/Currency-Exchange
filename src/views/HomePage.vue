<script setup lang="ts">
import HomePageNavbar from '@/components/HomePage/Navbar/HomePageNavbar.vue'
import HomePageTableCurrencies from '@/components/HomePage/Content/HomePageTableCurrencies.vue'
import HomePagePagination from '@/components/HomePage/Pagination/HomePagePagination.vue'
import SpinnerLoader from '@/components/UI/SpinnerLoader.vue'
import { useHomePage } from '@/hooks/useHomePage'

import { onMounted } from 'vue'

import { getIsLoading } from '@/helpers/getIsLoading'
import { getCurrencies } from '@/helpers/getCurrencies'

const { limit, currentPage, totalPage, getCurrentPage, setNewPage, fetchData } = useHomePage()

onMounted(async () => {
  await fetchData(currentPage, limit)
})
</script>

<template>
  <div class="home-container">
    <HomePageNavbar class="header" />

    <main class="main">
      <HomePageTableCurrencies
        v-if="!getIsLoading && Object.keys(getCurrencies).length > 0"
        :limit="limit"
        :currentPage="currentPage"
        :currencies="getCurrencies"
      ></HomePageTableCurrencies>
      <SpinnerLoader v-else></SpinnerLoader>
    </main>

    <HomePagePagination
      class="footer"
      :currentPage="getCurrentPage"
      :totalPage="totalPage"
      @change-current-page="setNewPage"
    ></HomePagePagination>
  </div>
</template>

<style lang="scss" scoped>
.home-container {
  min-height: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.header {
  min-height: 201px;
}
.main {
  overflow: auto;
  background-color: $homeMainBg;
  background: linear-gradient(
    135deg,
    rgba(98, 43, 83, 0.8) 0%,
    rgba(175, 65, 143, 0.8) 20%,
    rgba(111, 62, 139, 0.8) 50%,
    rgba(96, 57, 167, 0.8) 80%,
    rgba(155, 31, 202, 0.8) 100%
  );
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
  flex: 1 0 auto;
  width: 100%;
  padding: 15px;
  max-height: calc(100% - 201px - 56px);
}
.footer {
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
}
</style>
