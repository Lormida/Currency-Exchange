<script setup lang="ts">
import Bag from '@/modules/Bag/Bag.vue'
import SpinnerLoader from '@/modules/UI/SpinnerLoader.vue'

import { useNavbar } from './hooks/useNavbar'
import { defineAsyncComponent, onMounted } from 'vue'

const CardCurrency = defineAsyncComponent(() => import('@/modules/UI/CardCurrency.vue'))

const { currencies, isLoading, getTop3Currencies } = useNavbar()

onMounted(() => {
  getTop3Currencies()
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
      <Bag class="nav__bag" />
    </template>
    <SpinnerLoader v-else size="middle"></SpinnerLoader>
  </nav>
</template>

<style lang="scss" scoped>
.nav {
  height: auto;
  padding: 15px;
  display: flex;
  flex-wrap: nowrap;
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
  flex-basis: 70%;
  flex-direction: row;
  justify-content: space-evenly;
  gap: 2%;
  background-color: rgba(79, 34, 88, 0.55);
}
.nav__bag {
  flex-basis: 25%;
}
</style>
