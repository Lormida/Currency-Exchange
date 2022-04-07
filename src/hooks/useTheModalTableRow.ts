import BagService from '@/utils/BagService'
import { PurchasedCurrency } from '@/utils/types'
import { ref, computed } from 'vue'

export const useTheModalTableRow = () => {
  const customIsLoading = ref(true)
  const getCustomIsLoading = computed(() => customIsLoading.value)
  const getBagCurrencyActualPrices = computed(() => bagCurrencyActualPrices.value)

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

  return { getCustomIsLoading, getBagCurrencyActualPrices, removeCurrency, getProfitCurrencyPercent }
}
