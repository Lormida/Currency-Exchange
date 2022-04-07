import { useStore } from '@/store'
import { computed } from 'vue'

const store = useStore()
const getIsModalOpen = computed(() => store.getters.getIsModalOpen)

export { getIsModalOpen }
