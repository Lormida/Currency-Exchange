import { ActionContext, ActionTree } from 'vuex'
import { State, Currency } from './state'
import { Mutations, MutationsType } from './mutations'
import { Getters } from './getters'
import axios, { AxiosResponse } from 'axios'

export enum ActionsType {
  LoadAllCurrencies = 'GET_ALL_ITEMS',
  LoadCurrentCurrency = 'LOAD_CURRENT_CURRENCY',
}

type AugmentedAction = Omit<ActionContext<State, State>, 'commit'> & {
  commit<K extends keyof Mutations>(key: K, payload: Parameters<Mutations[K]>[1]): ReturnType<Mutations[K]>
}

export interface Actions {
  [ActionsType.LoadAllCurrencies](context: AugmentedAction, params: { currentPage: number; limit: number }): Promise<any>
  [ActionsType.LoadCurrentCurrency](context: AugmentedAction, currencyName: string): Promise<any>
}

export const actions: ActionTree<State, State> & Actions = {
  [ActionsType.LoadAllCurrencies](context, { currentPage, limit }) {
    context.commit(MutationsType.SetLoading, true)

    const regArgs = { params: { offset: (currentPage - 1) * limit, limit } }

    return axios
      .get(`${context.getters.getBaseApiURL}`, regArgs)
      .then((response) => response.data)
      .then(({ data }) => {
        new Promise<void>((resolve) => {
          setTimeout(() => {
            context.commit(MutationsType.SaveCurrenciesLocal, data)
            resolve()
          }, 0)
        })
      })
      .catch((e) => console.log(e))
  },

  [ActionsType.LoadCurrentCurrency](context, currencyName) {
    context.commit(MutationsType.SetLoading, true)

    return axios
      .get(`${context.getters.getBaseApiURL}/${currencyName}`)
      .then((response) => response.data)
      .then(({ data }) => {
        new Promise<void>((resolve) => {
          setTimeout(() => {
            context.commit(MutationsType.SaveCurrentCurrencyLocal, data)
            resolve()
          }, 0)
        })
      })
      .catch((e) => console.log(e))
  },
}
