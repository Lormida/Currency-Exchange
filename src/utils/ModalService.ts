import { ModalModule } from '@/store/modules/modal/index'

interface ModalActions {
  changeModalState(modalState: boolean): void
  changeCurrentModalIndicator(currentModalIndicator: string): void
}

class ModalService implements ModalActions {
  changeModalState(modalState: boolean) {
    ModalModule.ChangeModalState(modalState)
  }
  changeCurrentModalIndicator(currentModalIndicator: string) {
    ModalModule.ChangeCurrentModalIndicator(currentModalIndicator)
  }
}

export default new ModalService()
