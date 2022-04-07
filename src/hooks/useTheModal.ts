import ModalService from '@/utils/ModalService'
import { computed, defineAsyncComponent } from 'vue'
import { useStore } from '@/store'

const store = useStore()

export const useTheModal = () => {
  const getCurrentModalIndicator = computed(() => store.getters.getCurrentModalIndicator)

  const getCurrentModal = computed(() => {
    let currentComponentName = 'TheModalBag'

    if (getCurrentModalIndicator.value !== 'bag') {
      currentComponentName = 'TheModalBuyCurrency'
    }

    return defineAsyncComponent(() => import(`@/components/Modal/${currentComponentName}.vue`))
  })
  const closeModal = () => {
    ModalService.changeModalState(false)
  }

  return { getCurrentModalIndicator, getCurrentModal, closeModal }
}
