import { CurrencyModule } from '@/store/modules/currency/index'
import { computed } from 'vue'

const getCurrencies = computed(() => CurrencyModule.getCurrencies)

export { getCurrencies }
