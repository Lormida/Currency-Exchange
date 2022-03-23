import { GetterTree } from 'vuex'
import { State, state, Currency } from './state'

type CustomGetter = (currencyName: string) => number


export type Getters = {
  getCurrencies(state: State): Currency[],
  getCurrentCurrency(state: State): Currency,
  getIsLoading(state: State): boolean,
  getIsModalOpen(state: State): boolean,
  getCurrentModalIndicator(state: State): string,
  getDetailCurrency(state: State, getters: Getters): CustomGetter;
}

export const getters: GetterTree<State, State> & Getters = {
  getCurrencies(state) {
    return state.currencies
  },
  getCurrentCurrency(state) {
    return state.currentCurrency
  },
  getIsLoading(state) {
    return state.isLoading
  },
  getIsModalOpen(state) {
    return state.modal.isModalOpen
  },
  getCurrentModalIndicator(state) {
    return state.modal.currentModalIndicator
  },
  getDetailCurrency(_, getters) {
    return function (currencyName: string) {
      currencyName = currencyName.toLowerCase();
      const fnFit = (currency: Currency) => currency.id == currencyName
      const foundCurrency: Currency = ([].filter.call(getters.getCurrencies, fnFit))[0]
      return (+foundCurrency?.supply)
    }
  }

}