import { GetterTree } from 'vuex'
import { State, state, Currency } from './state'


export type Getters = {
  getCurrencies(state: State): Currency[],
  getCurrentCurrency(state: State): Currency,
  getIsLoading(state: State): boolean
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
  }
}