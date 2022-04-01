import { MutationsType } from '@/store/mutations'
import { SuperStore, useStore } from '@/store'

interface ModalActions {
  changeModalState(modalState: boolean): void
  changeCurrentModalIndicator(currentModalIndicator: string): void
}

class ModalService implements ModalActions {
  constructor(private store: SuperStore) {}
  changeModalState(modalState: boolean) {
    this.store.commit(MutationsType.ChangeModalState, modalState)
  }
  changeCurrentModalIndicator(currentModalIndicator: string) {
    this.store.commit(MutationsType.ChangeCurrentModalIndicator, currentModalIndicator)
  }
}

const instanceModdalService = new ModalService(useStore())
export default instanceModdalService
