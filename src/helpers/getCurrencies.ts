import { useStore } from '@/store'
import { computed } from 'vue'

const store = useStore()
const getCurrencies = computed(() => store.getters.getCurrencies)

export { getCurrencies }
