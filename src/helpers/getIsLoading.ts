import { computed } from 'vue'
import { useStore } from '@/store'

const store = useStore()
const getIsLoading = computed(() => store.getters.getIsLoading)

export { getIsLoading }
