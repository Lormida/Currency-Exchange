<script setup lang="ts">
import TableCurrencies from '@/modules/TableCurrencies/TableCurrencies.vue'
import Pagination from '@/modules/Pagination/Pagination.vue'

import SpinnerLoader from '@/modules/UI/SpinnerLoader.vue'
import { useHome } from '@/hooks/useHome'

import { getIsLoading } from '@/helpers/reactive-getters/getIsLoading'
import { getCurrencies } from '@/helpers/reactive-getters/getCurrencies'

import { onMounted } from 'vue'

const { limit, currentPage, totalPage, getCurrentPage, setNewPage, fetchData } = useHome()

onMounted(async () => {
  await fetchData(currentPage, limit)
})
</script>

<template>
  <div class="home-page home-page__container">
    <main class="home-page__main">
      <TableCurrencies
        v-if="!getIsLoading && Object.keys(getCurrencies).length > 0"
        :limit="limit"
        :currentPage="currentPage"
        :currencies="getCurrencies"
      ></TableCurrencies>
      <SpinnerLoader v-else></SpinnerLoader>
    </main>

    <Pagination
      class="home-page__footer"
      :currentPage="getCurrentPage"
      :totalPage="totalPage"
      @change-current-page="setNewPage"
    ></Pagination>
  </div>
</template>

<style lang="scss" scoped>
.home-page {
  // .home-page__container

  &__container {
    min-height: calc(100% - $headerHeight);
    max-height: calc(100% - $headerHeight);
    display: flex;
    flex-direction: column;
  }

  // .home-page__main

  &__main {
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
    min-height: calc(100% - $footerHeight);
    max-height: calc(100% - $footerHeight);
  }

  // .home-page__footer

  &__footer {
    height: $footerHeight;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
  }
}
</style>
