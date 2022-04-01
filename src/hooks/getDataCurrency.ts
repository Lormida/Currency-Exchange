import { useStore } from '@/store'
import { computed } from 'vue'

const store = useStore()
const getDataCurrency = computed(() => store.getters.getCurrentCurrency)

export { getDataCurrency }
