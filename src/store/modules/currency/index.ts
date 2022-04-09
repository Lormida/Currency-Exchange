import { VuexModule, Module, Mutation, Action, getModule } from 'vuex-module-decorators'
import { store } from '@/store'
import { baseApiURL } from '@/services/constants'
import { ICurrency } from './types'
import { MutationsType } from './types'
import { ActionsType } from './types'
import axios from 'axios'
import { Currency } from '@/services/types'

@Module({ dynamic: true, store, name: 'currency' })
class CurrencyClass extends VuexModule implements ICurrency {
  //*------------- State -------------
  currencies = [] as Currency[]
  currentCurrency = {} as Currency
  isLoading = true

  //*------------- Getters -------------
  get getCurrencies() {
    return this.currencies
  }
  get getCurrentCurrency() {
    return this.currentCurrency
  }
  get getIsLoading() {
    return this.isLoading
  }
  get getDetailCurrency() {
    return (currencyName: string) => {
      currencyName = currencyName.toLowerCase()
      const fnFit = (currency: Currency) => currency.id == currencyName

      const foundCurrency: Currency = [].filter.call(this.getCurrencies, fnFit)[0]
      return +foundCurrency?.supply
    }
  }

  //*------------- Mutations -------------
  @Mutation
  [MutationsType.SaveCurrenciesLocal](currencies: Currency[]) {
    this.currencies = currencies
  }

  @Mutation
  [MutationsType.SaveCurrentCurrencyLocal](currentCurrency: Currency) {
    this.currentCurrency = currentCurrency
  }

  @Mutation
  [MutationsType.SetLoading](status: boolean) {
    if (status === false) {
      setTimeout(() => {
        this.isLoading = status
      }, 1000)
    } else {
      this.isLoading = status
    }
  }

  //*------------- Actions -------------
  @Action
  [ActionsType.LoadAllCurrencies]({ currentPage, limit }: { currentPage: number; limit: number }) {
    this.context.commit(MutationsType.SetLoading, true)

    const regArgs = { params: { offset: (currentPage - 1) * limit, limit } }

    return axios
      .get(`${baseApiURL}`, regArgs)
      .then((response) => response.data)
      .then(({ data }) => {
        new Promise<void>((resolve) => {
          setTimeout(() => {
            this.context.commit(MutationsType.SaveCurrenciesLocal, data)
            resolve()
          }, 0)
        })
      })
      .catch((e) => console.log(e))
  }

  @Action
  [ActionsType.LoadCurrentCurrency](currencyName: string) {
    this.context.commit(MutationsType.SetLoading, true)

    return axios
      .get(`${baseApiURL}/${currencyName}`)
      .then((response) => response.data)
      .then(({ data }) => {
        new Promise<void>((resolve) => {
          setTimeout(() => {
            this.context.commit(MutationsType.SaveCurrentCurrencyLocal, data)
            resolve()
          }, 0)
        })
      })
      .catch((e) => console.log(e))
  }
}

export const CurrencyModule = getModule(CurrencyClass)
