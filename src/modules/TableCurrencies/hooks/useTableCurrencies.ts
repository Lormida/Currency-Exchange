import { Currency } from '@/services/types'
import { computed } from 'vue'

export const useTableCurrencies = (props: { currencies: Currency[] }) => {
  const titlesNames = ['Name', 'Price', 'Change', 'Trade']
  const getCurrencies = computed(() => props.currencies)

  return { titlesNames, getCurrencies }
}
