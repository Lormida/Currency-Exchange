<script setup lang="ts">

import BagService from '@/utils/BagService'
import { PurchasedCurrency } from '@/utils/types'
import { computed, ref } from 'vue'
import SpinnerLoader from '@/components/UI/SpinnerLoader.vue'

const props = defineProps<{
  currency: PurchasedCurrency
  index: number
}>()

const customIsLoading = ref(true)

//* Get actual prices to purchased currency
let bagCurrencyActualPrices = ref<Record<string, number>>({})
BagService.getActualCurrencyPrices(BagService.getBag()).then((actualCurrencyPrices) => {
  bagCurrencyActualPrices.value = actualCurrencyPrices
  customIsLoading.value = false
})

const getCustomIsLoading = computed(() => customIsLoading.value)
const getBagCurrencyActualPrices = computed(() => bagCurrencyActualPrices.value)
//* Remove currency from bag
const removeCurrency = (currencyName: string) => {
  BagService.deleteCurrencyFromBag(currencyName)

  //* Update info about bag
  BagService.updateInfoBag(BagService.getActualCurrencyPrices, BagService.getBag())
}

const getProfitCurrencyPercent = computed(() => {
  return (currency: PurchasedCurrency) => {
    return ((getBagCurrencyActualPrices.value[currency.name] / currency.purchasePriceUsd - 1) * 100).toFixed(2)
  }
})
</script>

<template>
  <tr>
    <th scope="row" class="col-1">{{ index + 1 }}</th>
    <td class="col-1">{{ currency.symbol }}</td>
    <td v-if="!getCustomIsLoading" class="col-2">{{ (+getBagCurrencyActualPrices[currency.name]).toFixed(2) }}</td>
    <td style="position: relative" p-0 v-else class="col-2">
      <SpinnerLoader size="small"></SpinnerLoader>
    </td>
    <td class="col-2">{{ currency.amount }}</td>
    <td v-if="!getCustomIsLoading" class="col-2">{{ getProfitCurrencyPercent(currency) }}%</td>
    <td style="position: relative" p-0 v-else class="col-2">
      <SpinnerLoader size="small"></SpinnerLoader>
    </td>
    <td class="col-1" @click="removeCurrency(currency.name)">
      <div class="bag__trash-btn mx-auto"></div>
    </td>
  </tr>
</template>

<style lang="scss" scoped>
.bag {
  &__trash-btn {
    width: 33px;
    height: 33px;
    display: flex;
    justify-content: center;
    align-items: center;
    mask-image: url('@/assets/svg/trash.svg');
    background-color: $trashBtnColor;
    mask-size: contain;
    mask-position: center;
    transition: transform 0.3s ease;

    &:hover {
      cursor: pointer;
      transform: scale(1.3);
      background-color: $trashBtnColorHover;
    }
  }
}
</style>
