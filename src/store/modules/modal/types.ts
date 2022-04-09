//*------------- Helpers types -------------
type TModal = {
  currentModalIndicator: string
  isModalOpen: boolean
}
export enum MutationsType {
  ChangeModalState = 'ChangeModalState',
  ChangeCurrentModalIndicator = 'ChangeCurrentModalIndicator',
}

//*------------- State interface -------------
export interface IState {
  modal: TModal
}

//*------------- Getters interface -------------
interface IGetters {
  getIsModalOpen: boolean
  getCurrentModalIndicator: string
}

//*------------- Mutations interface -------------
interface IMutations {
  [MutationsType.ChangeModalState](stateModal: boolean): void
  [MutationsType.ChangeCurrentModalIndicator](currentModalIndicator: string): void
}

export interface IModal extends IState, IMutations, IGetters {}
