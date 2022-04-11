<script setup lang="ts">
import { getDataCurrency } from '@/helpers/reactive-getters/getDataCurrency'
import { openModal } from '@/helpers/openModal'

import { defineAsyncComponent } from 'vue'

const Statistics = defineAsyncComponent(() => import(/* webpackChunkName: 'Statistics' */ '@/modules/UI/Statistics.vue'))
const BigButton = defineAsyncComponent(() => import(/* webpackChunkName: 'BigButton' */ '@/modules/UI/BigButton.vue'))
const CardInfo = defineAsyncComponent(() => import(/* webpackChunkName: 'CardInfo' */ '@/modules/UI/CardInfo.vue'))
</script>

<template>
  <header class="currency-stats">
    <Statistics></Statistics>
    <div class="currency-stats__buttons-wrapper">
      <CardInfo>
        <template #name>{{ getDataCurrency.name }}</template>
        <template #symbol>{{ getDataCurrency.symbol }}</template>
      </CardInfo>
      <BigButton @click="openModal(getDataCurrency.id)">Buy</BigButton>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.currency-stats {
  width: 100%;
  height: auto;
  padding: 1%;
  background-color: $white;
  display: flex;
  justify-content: space-between;
  align-items: center;

  // .currency-stats__buttons-wrapper

  &__buttons-wrapper {
  // display: flex;
  }
}
</style>
