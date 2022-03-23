import { MutationsType } from '@/store/mutations'
import { State } from '@/store/state'
import { useStore } from '@/store'
import { Store } from 'vuex'

interface ModalActions {
  changeModalState(modalState: boolean): void,
  changeCurrentModalIndicator(currentModalIndicator: string): void,
}

class ModalService implements ModalActions {
  constructor(private store: Store<State>) { }
  changeModalState(modalState: boolean) {
    store.commit(MutationsType.ChangeModalState, modalState)
  }
  changeCurrentModalIndicator(currentModalIndicator: string) {
    store.commit(MutationsType.ChangeCurrentModalIndicator, currentModalIndicator)
  }
}
const store = useStore()

const instanceModdalService = new ModalService(store)
export default instanceModdalService
