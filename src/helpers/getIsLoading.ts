import { CurrencyModule } from '@/store/modules/currency/index'
import { computed } from 'vue'

const getIsLoading = computed(() => CurrencyModule.getIsLoading)

export { getIsLoading }
