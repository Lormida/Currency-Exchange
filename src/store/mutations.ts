import { MutationTree } from 'vuex'
import { State, Currency, PurchasedCurrency } from './state'

export enum MutationsType {
  SetLoading = 'SET_LOADING',
  SaveCurrenciesLocal = 'SAVE_DATA_LOCAL',
  SaveCurrentCurrencyLocal = 'SAVE_CURRENT_CURRENCY_LOCAL',

  ChangeModalState = 'CHANGE_MODAL_STATE',
  ChangeCurrentModalIndicator = 'CHANGE_CURRENT_MODAL_INDICATOR',

  DeleteCurrencyFromBag = 'DELETE_CURRENCY_FROM_BAG',
  AddCurrencyToBag = 'ADD_CURRENCY_TO_BAG',
  LoadBagLocal = 'LOAD_BAG_LOCAL',
  ChangeActualBagData = 'CHANGE_ACTUAL_BAG_DATA',
}

export interface Mutations {
  [MutationsType.SetLoading](state: State, status: boolean): void,
  [MutationsType.SaveCurrenciesLocal](state: State, currencies: Currency[]): void,
  [MutationsType.SaveCurrentCurrencyLocal](state: State, currentCurrency: Currency): void,

  [MutationsType.ChangeModalState](state: State, stateModal: boolean): void,
  [MutationsType.ChangeCurrentModalIndicator](state: State, currentModalIndicator: string): void,

  [MutationsType.DeleteCurrencyFromBag](state: State, currencyName: string): void,
  [MutationsType.AddCurrencyToBag](state: State, newCurrency: PurchasedCurrency): void,
  [MutationsType.LoadBagLocal](state: State, bag: PurchasedCurrency[]): void,
  [MutationsType.ChangeActualBagData](state: State, actualBagProfit: any): void,
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
  },

  [MutationsType.DeleteCurrencyFromBag](state, currencyName: string) {
    state.bag = [].filter.call(state.bag, ((currency: PurchasedCurrency) => currency.name !== currencyName))
  },
  [MutationsType.AddCurrencyToBag](state, newCurrency: PurchasedCurrency) {

    const findIndex = state.bag.findIndex((currency: PurchasedCurrency) => currency.name === newCurrency.name)

    // If currency already exists - increase its amount
    if (findIndex != - 1) {
      const oldCurrency = state.bag[findIndex]

      state.bag[findIndex] = {
        ...newCurrency,
        amount: +oldCurrency.amount + +newCurrency.amount,
      }
    }
    // If currency doesn't exist in bag - add it
    else {
      state.bag.push(newCurrency)
    }

  },
  [MutationsType.LoadBagLocal](state, bag) {
    state.bag = bag
  },
  [MutationsType.ChangeActualBagData](state, actualBagProfit) {
    const { oldBagValue, actualBagValue, profitPercent, profitAbsolute } = actualBagProfit

    state.actualBagData.oldBagValue = oldBagValue
    state.actualBagData.actualBagValue = actualBagValue
    state.actualBagData.profitPercent = profitPercent
    state.actualBagData.profitAbsolute = profitAbsolute
  }
}