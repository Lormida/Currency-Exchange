<script setup lang="ts">
import { defineAsyncComponent } from 'vue'

import { getFormatCurrency } from '@/helpers/getFormatCurrency'
import { getDataCurrency } from '@/helpers/getDataCurrency'

const TheChart = defineAsyncComponent(() => import(/* webpackChunkName: 'TheChart' */ '@/components/CurrencyPage/TheChart.vue'))

const props = defineProps<{
  id: string
}>()
</script>

<template>
  <div class="card__header chart">
    <header class="chart__header">
      <span class="chart__currency-short">$</span>
      <span class="chart__currency-price">{{ (+getDataCurrency.priceUsd).toFixed(2) }}</span>
      <span :class="getFormatCurrency(+getDataCurrency.changePercent24Hr)" class="chart__currency-price-change"
        >{{ (+getDataCurrency.changePercent24Hr).toFixed(2) }}%</span
      >
    </header>

    <main class="chart__content">
      <!-- Chart -->
      <TheChart :currency="id"></TheChart>
    </main>
  </div>
</template>

<style lang="scss" scoped>
.chart {
  height: auto;
  min-height: 523px;
  display: flex;
  flex-direction: column;
  background-color: $white;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  padding: 1% 1%;

  // .chart__header

  &__header {
    position: relative;
    width: fit-content;
    height: auto;
    padding: 1% 0 1% 5%;
  }

  // .chart__currency-short

  &__currency-short {
    font-size: 32px;
  }

  // .chart__currency-price

  &__currency-price {
    font-size: 48px;
    font-weight: bolder;
    text-shadow: 0 0 4px rgb(72, 68, 68);
  }

  // .chart__currency-price-change

  &__currency-price-change {
    position: absolute;
    top: 0;
    right: 0;
    font-size: 18px;
    transform: translateX(100%);
  }

  // .chart__content

  &__content {
    position: relative;
    top: -15px;
    flex-grow: 1;
  }
}
</style>
