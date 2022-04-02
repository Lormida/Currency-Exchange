<script setup lang="ts">
import { computed, ref } from 'vue'

import BagService from '@/utils/BagService'
import SpinnerLoader from './SpinnerLoader.vue'
import { PurchasedCurrency } from '@/utils/types'

const customIsLoading = ref(true)
const getCustomIsLoading = computed(() => customIsLoading.value)
const getBagCurrencyActualPrices = computed(() => bagCurrencyActualPrices.value)
const getBag = computed(() => BagService.getBag())

//* Loading bag from LocalStorage
BagService.loadBagLocal()

//* Get actual prices to purchased currency
let bagCurrencyActualPrices = ref<Record<string, number>>({})
BagService.getActualCurrencyPrices(BagService.getBag()).then((actualCurrencyPrices) => {
  bagCurrencyActualPrices.value = actualCurrencyPrices
  customIsLoading.value = false
})

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
  <div class="bag">
    <div class="container">
      <div class="row mx-auto bg-white rounded shadow">
        <div class="table-responsive">
          <template v-if="getBag?.length">
            <table class="table bag__table table-striped table-hover">
              <thead>
                <tr>
                  <th scope="col" class="col-1">#</th>
                  <th scope="col" class="col-2">Currency</th>
                  <th scope="col" class="col-2">Current price</th>
                  <th scope="col" class="col-2">Amount</th>
                  <th scope="col" class="col-2">Profit</th>
                  <th scope="col" class="col-1">Remove</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(currency, index) of getBag" :key="currency.name">
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
              </tbody>
            </table>
          </template>
          <h3 class="text-center fw-bold p-4 m-0" v-else>You have not yet any cryptocurrencies!</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.bag {
  background-color: $modalBagBg;
  padding: 10px 10px;
  border-radius: 10px;
  box-shadow: 0px 0px 13px 10px rgba(41, 61, 77, 0.2);
  min-height: 100px;
  max-height: 600px;
  overflow: auto;
  // .bag__table

  &__table {
    th,
    td {
      vertical-align: middle;
    }
  }

  // .bag__trash-btn

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
