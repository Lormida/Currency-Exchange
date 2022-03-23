import { MutationTree } from 'vuex'
import { State, Currency } from './state'

export enum MutationsType {
  SetLoading = 'SET_LOADING',
  SaveCurrenciesLocal = 'SAVE_DATA_LOCAL',
  SaveCurrentCurrencyLocal = 'SAVE_CURRENT_CURRENCY_LOCAL',
  ChangeModalState = 'CHANGE_MODAL_STATE',
  ChangeCurrentModalIndicator = 'CHANGE_CURRENT_MODAL_INDICATOR'
}

export interface Mutations {
  [MutationsType.SetLoading](state: State, status: boolean): void,
  [MutationsType.SaveCurrenciesLocal](state: State, currencies: Currency[]): void,
  [MutationsType.SaveCurrentCurrencyLocal](state: State, currentCurrency: Currency): void,
  [MutationsType.ChangeModalState](state: State, stateModal: boolean): void,
  [MutationsType.ChangeCurrentModalIndicator](state: State, currentModalIndicator: string): void,
}

export const mutations: MutationTree<State> & Mutations = {
  [MutationsType.SetLoading](state, status) {
    if (status === false) {
      setTimeout(() => {
        state.isLoading = status
      }, 1000);
    } else {
      state.isLoading = status
    }
  },
  [MutationsType.SaveCurrenciesLocal](state, currencies) {
    state.currencies = currencies
  },
  [MutationsType.SaveCurrentCurrencyLocal](state, currentCurrency) {
    state.currentCurrency = currentCurrency
  },
  [MutationsType.ChangeModalState](state, stateModal) {
    state.modal.isModalOpen = stateModal
  },
  [MutationsType.ChangeCurrentModalIndicator](state, currentModalIndicator) {
    state.modal.currentModalIndicator = currentModalIndicator
  }
}