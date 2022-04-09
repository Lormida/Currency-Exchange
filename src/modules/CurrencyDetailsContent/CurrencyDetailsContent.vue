<script setup lang="ts">
import { defineAsyncComponent } from 'vue'

const CurrencyPageMarket = defineAsyncComponent(
  () => import(/* webpackChunkName: 'CurrencyPageMarketStats' */ '@/modules/CurrencyPageMarket/CurrencyPageMarket.vue')
)
const Chart = defineAsyncComponent(() => import(/* webpackChunkName: 'Chart' */ '@/modules/Chart/Chart.vue'))
const ChartHeader = defineAsyncComponent(() => import(/* webpackChunkName: 'ChartHeader' */ '@/modules/Chart/_components/ChartHeader.vue'))

const props = defineProps<{
  id: string
}>()
</script>

<template>
  <div class="chart-wrapper">
    <ChartHeader />
    <Chart :currency="id"></Chart>
  </div>
  <CurrencyPageMarket class="currency-page__market" />
</template>

<style lang="scss" scoped>
.currency-page__market {
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
