<script setup lang="ts">
import TheChart from '@/components/CurrencyPage/TheChart.vue'
import { getFormatCurrency } from '@/hooks/getFormatCurrency'
import { getDataCurrency } from '@/hooks/getDataCurrency'

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
  height: 70%;
  display: flex;
  flex-direction: column;
  background-color: #f7f9fd;

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
    flex-grow: 1;
  }
}
</style>
