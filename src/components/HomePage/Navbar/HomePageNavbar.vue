<script setup lang="ts">
import HomePageBag from '@/components/HomePage/Navbar/HomePageBag.vue'
import { defineAsyncComponent, onMounted, ref } from 'vue'

import ApiService from '@/utils/ApiService'
import SpinnerLoader from '@/components/UI/SpinnerLoader.vue'

const CardCurrency = defineAsyncComponent(() => import('@/components/UI/CardCurrency.vue'))

let currencies = ref()
let isLoading = ref(true)

onMounted(() => {
  ApiService.getTop3Currencies().then((data) => {
    currencies.value = data
    isLoading.value = false
  })
})
</script>

<template>
  <nav class="nav">
    <template v-if="!isLoading">
      <!-- Top 3 currencies -->
      <div class="nav__top-currencies">
        <Suspense>
          <template #default>
            <CardCurrency
              v-for="(currency, index) of currencies"
              :key="currency.id"
              :name="currency.name"
              :changePercent24Hr="+currency.changePercent24Hr"
              :marketCapUsd="+currency.marketCapUsd"
              :priceUsd="+currency.priceUsd"
              :id="currency.id"
              :index="index + 1"
            ></CardCurrency>
          </template>
          <template #fallback>
            <SpinnerLoader size="middle"></SpinnerLoader>
          </template>
        </Suspense>
      </div>

      <!-- Bag currency -->
      <HomePageBag class="nav__bag" />
    </template>
    <SpinnerLoader v-else size="middle"></SpinnerLoader>
  </nav>
</template>

<style lang="scss" scoped>
.nav {
  height: auto;
  padding: 15px;
  display: flex;
  justify-content: space-between;
  background-color: lighten($creamy, 5%);
  position: sticky;
  top: 0;
  left: 0;
  z-index: 1;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
}
.nav__top-currencies {
  display: flex;
  padding: 10px;
  flex-grow: 0;
  flex-direction: row;
  justify-content: space-between;
  gap: 2%;
  background-color: rgba(79, 34, 88, 0.55);
}
.nav__bag {
}
</style>
