import { CurrencyModule } from '@/store/modules/currency/index'
import { computed } from 'vue'

const getDataCurrency = computed(() => CurrencyModule.getCurrentCurrency)

export { getDataCurrency }
