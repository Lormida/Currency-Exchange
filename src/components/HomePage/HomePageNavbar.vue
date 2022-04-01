<script setup lang="ts">
import { onMounted, ref } from 'vue'
import CardCurrency from '@/components/UI/CardCurrency.vue'
import HomePageBag from '@/components/HomePage/HomePageBag.vue'
import ApiService from '@/utils/ApiService'

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
  <nav class="nav" v-if="!isLoading">
    <!-- Cards -->
    <div class="nav__card-currency-wrapper row p-3 col-7">
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
    </div>

    <!-- Bag currency -->
    <HomePageBag />
  </nav>
</template>

<style lang="scss" scoped>
.nav {
  height: 100%;
  padding: 15px;
  display: flex;
  justify-content: space-evenly;

  background-color: #ffe5d9;
  // .nav__card-currency-wrapper

  &__card-currency-wrapper {
    box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
    border: 3px #222 dashed;
    background-color: #ece4db;
    height: 100%;
  }
}
</style>
