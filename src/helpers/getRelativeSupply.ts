import { computed } from 'vue'
import { getDataCurrency } from './reactive-getters/getDataCurrency'

const getRelativeSupply = computed(() => {
  if (getDataCurrency.value.maxSupply == null) return null
  const divide = Number((+getDataCurrency.value.supply / +getDataCurrency.value.maxSupply).toFixed(2))
  return `${divide * 100}% of total supply`
})

export { getRelativeSupply }
