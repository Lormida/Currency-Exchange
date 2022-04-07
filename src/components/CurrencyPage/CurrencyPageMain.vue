<script setup lang="ts">
import { defineAsyncComponent } from 'vue'

const CurrencyPageMarketStats = defineAsyncComponent(
  () => import(/* webpackChunkName: 'CurrencyPageMarketStats' */ '@/components/CurrencyPage/CurrencyPageMarket/CurrencyPageMarketStats.vue')
)
const TheChart = defineAsyncComponent(() => import(/* webpackChunkName: 'TheChart' */ '@/components/CurrencyPage/Chart/TheChart.vue'))
const HeaderChart = defineAsyncComponent(
  () => import(/* webpackChunkName: 'HeaderChart' */ '@/components/CurrencyPage/Chart/HeaderChart.vue')
)

const props = defineProps<{
  id: string
}>()
</script>

<template>
  <div class="chart-wrapper">
    <HeaderChart />
    <TheChart :currency="id"></TheChart>
  </div>
  <CurrencyPageMarketStats class="currency-page__market-stats" />
</template>

<style lang="scss" scoped>
.currency-page__market-stats {
  margin-top: 10px;
}

.chart-wrapper {
  height: auto;
  display: flex;
  flex-direction: column;
  background-color: $white;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  padding: 1% 1%;
  min-height: 531px;
}
</style>
