import { ActionContext, ActionTree } from 'vuex'
import { State, Currency } from './state'
import { Mutations, MutationsType } from './mutations'
import { Getters } from './getters'
import axios from 'axios'

export enum ActionsType {
  getAllCurrencies = 'GET_ALL_ITEMS',
  getCurrentCurrency = "GET_CURRENT_CURRENCY"
}

type AugmentedAction = Omit<ActionContext<State, State>, 'commit'> & {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>
}

export interface Actions {
  [ActionsType.getAllCurrencies](context: AugmentedAction, params: { currentPage: number, limit: number }): void,
  [ActionsType.getCurrentCurrency](context: AugmentedAction, currencyName: string): void
}

export const actions: ActionTree<State, State> & Actions = {
  [ActionsType.getAllCurrencies](context, { currentPage, limit }) {
    context.commit(MutationsType.SetLoading, true)

    axios.get('https://api.coincap.io/v2/assets', { params: { offset: (currentPage - 1) * limit, limit } })
      .then(response => response.data)
      .then(({ data }) => {
        new Promise<void>(resolve => {
          setTimeout(() => {
            context.commit(MutationsType.SaveCurrenciesLocal, data)
            resolve()
          }, 0);
        })

      })
  },
  [ActionsType.getCurrentCurrency](context, currencyName) {

    context.commit(MutationsType.SetLoading, true)

    axios.get(`https://api.coincap.io/v2/assets/${currencyName}`)
      .then(response => response.data)
      .then(({ data }) => {
        new Promise<void>(resolve => {
          setTimeout(() => {
            context.commit(MutationsType.SaveCurrentCurrencyLocal, data)
            resolve()
          }, 0);
        })
      })
  }
}