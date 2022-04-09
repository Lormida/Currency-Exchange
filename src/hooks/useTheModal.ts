import { ModalModule } from '@/store/modules/modal/index'
import ModalService from '@/utils/ModalService'
import { computed, defineAsyncComponent } from 'vue'

export const useTheModal = () => {
  const getCurrentModalIndicator = computed(() => ModalModule.getCurrentModalIndicator)

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
