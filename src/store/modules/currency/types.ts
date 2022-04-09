import { Currency } from '@/utils/types'

//*------------- Helpers types -------------
export enum MutationsType {
  SaveCurrenciesLocal = 'SaveCurrenciesLocal',
  SaveCurrentCurrencyLocal = 'SaveCurrentCurrencyLocal',
  SetLoading = 'SetLoading',
}
export enum ActionsType {
  LoadAllCurrencies = 'LoadAllCurrencies',
  LoadCurrentCurrency = 'LoadCurrentCurrency',
}

//*------------- State interface -------------
export interface IState {
  currencies: Currency[]
  currentCurrency: Currency
  isLoading: boolean
}

//*------------- Getters interface -------------
interface IGetters {
  getCurrencies: Currency[]
  getCurrentCurrency: Currency
  getDetailCurrency: any
  getIsLoading: boolean
}

//*------------- Mutations interface -------------
interface IMutations {
  [MutationsType.SaveCurrenciesLocal](currencies: Currency[]): void
  [MutationsType.SaveCurrentCurrencyLocal](currentCurrency: Currency): void
  [MutationsType.SetLoading](status: boolean): void
}

//*------------- Actions interface -------------
interface IActions {
  [ActionsType.LoadAllCurrencies](params: { currentPage: number; limit: number }): Promise<any>
  [ActionsType.LoadCurrentCurrency](currencyName: string): Promise<any>
}

export interface ICurrency extends IState, IMutations, IActions, IGetters {}
