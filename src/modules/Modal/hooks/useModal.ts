import { ModalModule } from '@/store/modules/modal/index'
import ModalService from '@/services/ModalService'
import { computed, defineAsyncComponent } from 'vue'

export const useModal = () => {
  const getCurrentModalIndicator = computed(() => ModalModule.getCurrentModalIndicator)

  const getCurrentModal = computed(() => {
    let currentComponentName = 'ModalBag'

    if (getCurrentModalIndicator.value !== 'bag') {
      currentComponentName = 'ModalBuyCurrency'
    }

    return defineAsyncComponent(() => import(`@/modules/Modal/_components/${currentComponentName}.vue`))
  })
  const closeModal = () => {
    ModalService.changeModalState(false)
  }

  return { getCurrentModalIndicator, getCurrentModal, closeModal }
}
