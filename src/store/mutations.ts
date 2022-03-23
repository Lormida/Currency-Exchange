import { MutationTree } from 'vuex'
import { State, Currency } from './state'

export enum MutationsType {
  SetLoading = 'SET_LOADING',
  SaveCurrenciesLocal = 'SAVE_DATA_LOCAL',
  SaveCurrentCurrencyLocal = 'SAVE_CURRENT_CURRENCY_LOCAL',
}

export interface Mutations {
  [MutationsType.SetLoading](state: State, status: boolean): void,
  [MutationsType.SaveCurrenciesLocal](state: State, currencies: Currency[]): void,
  [MutationsType.SaveCurrentCurrencyLocal](state: State, currencies: Currency): void,
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
}