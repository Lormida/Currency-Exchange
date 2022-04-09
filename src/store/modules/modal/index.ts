import { VuexModule, Module, Mutation, getModule } from 'vuex-module-decorators'
import { store } from '@/store'

import { IModal } from './types'
import { MutationsType } from './types'

@Module({ dynamic: true, store, name: 'modal' })
class Modal extends VuexModule implements IModal {
  //*------------- State -------------
  modal = { currentModalIndicator: '', isModalOpen: false }

  //*------------- Getters -------------
  get getIsModalOpen() {
    return this.modal.isModalOpen
  }

  get getCurrentModalIndicator() {
    return this.modal.currentModalIndicator
  }

  //*------------- Mutations -------------
  @Mutation
  [MutationsType.ChangeModalState](stateModal: boolean): void {
    this.modal.isModalOpen = stateModal
  }

  @Mutation
  [MutationsType.ChangeCurrentModalIndicator](currentModalIndicator: string): void {
    this.modal.currentModalIndicator = currentModalIndicator
  }
}

export const ModalModule = getModule(Modal)
