<script setup lang="ts">
import { getFormatCurrency } from '@/helpers/getFormatCurrency'
import { getDataCurrency } from '@/helpers/reactive-getters/getDataCurrency'
</script>

<template>
  <div class="statistics">
    <span class="statistics__currency-short">
      <slot name="currency-sign">$</slot>
    </span>
    <slot name="currency-price">
      <span class="statistics__currency-price">{{ (+getDataCurrency.priceUsd).toFixed(2) }}</span>
    </slot>
    <slot name="currency-price-change">
      <span class="statistics__currency-price-change" :class="getFormatCurrency(+getDataCurrency.changePercent24Hr)"
        >{{ (+getDataCurrency.changePercent24Hr).toFixed(2) }}%</span
      >
    </slot>
  </div>
</template>

<style lang="scss" scoped>
.statistics {
  width: fit-content;
  position: relative;

  // .statistics__currency-short

  &__currency-short {
    font-size: 32px;
  }

  // .statistics__currency-price

  &__currency-price {
    font-size: 48px;
    font-weight: bolder;
    text-shadow: 0 0 4px rgb(72, 68, 68);
  }

  // .statistics__currency-price-change

  &__currency-price-change {
    position: absolute;
    top: 0;
    right: 0;
    font-size: 18px;
    transform: translateX(100%);
  }
}
</style>
