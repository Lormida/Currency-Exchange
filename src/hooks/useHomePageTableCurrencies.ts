import { Currency } from '@/utils/types'
import { computed } from 'vue'

export const useHomePageTableCurrencies = (props: { currencies: Currency[] }) => {
  const titlesNames = ['Name', 'Price', 'Change', 'Trade']
  const getCurrencies = computed(() => props.currencies)

  return { titlesNames, getCurrencies }
}
