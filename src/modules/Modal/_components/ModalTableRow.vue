<script setup lang="ts">
import SpinnerLoader from '@/modules/UI/SpinnerLoader.vue'

import { PurchasedCurrency } from '@/services/types'

import { useModalTableRow } from '../hooks/useModalTableRow'

const props = defineProps<{
  currency: PurchasedCurrency
  index: number
}>()

const { getCustomIsLoading, getBagCurrencyActualPrices, removeCurrency, getProfitCurrencyPercent } = useModalTableRow()
</script>

<template>
  <tr>
    <td scope="row" class="col-1">{{ index + 1 }}</td>
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
td {
  @include adaptive-value('font-size', 18, 11);
  vertical-align: middle;

}
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
