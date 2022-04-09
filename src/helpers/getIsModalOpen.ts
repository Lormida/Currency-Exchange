import { ModalModule } from '@/store/modules/modal/index'
import { computed } from 'vue'

const getIsModalOpen = computed(() => ModalModule.getIsModalOpen)

export { getIsModalOpen }
