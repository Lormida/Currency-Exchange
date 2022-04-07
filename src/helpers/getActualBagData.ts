import { useStore } from '@/store'
import { computed } from 'vue'

const store = useStore()
const getActualBagData = computed(() => store.getters.getActualBagData)

export { getActualBagData }
