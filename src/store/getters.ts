import { GetterTree } from 'vuex'
import { State, state, Currency } from './state'


export type Getters = {
  getCurrencies(state: State): Currency[],
  getCurrentCurrency(state: State): Currency,
  getIsLoading(state: State): boolean,
  getIsModalOpen(state: State): boolean,
  getCurrentModalIndicator(state: State): string
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
  }
}