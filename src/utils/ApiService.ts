import { ActionsType } from '@/store/actions'
import { MutationsType } from '@/store/mutations'
import { Currency } from '@/store/state'
import { SuperStore, useStore } from '@/store'
import axios from 'axios'
import { apiCoincap } from '@/hooks/apiCoincap'
import { historyCurrency } from './types'

interface ApiFetching {
  getAllCurrencies(params: { currentPage: number; limit: number }): void
  getSpecificCurrency(currencyName: string): Promise<Currency>
  getTop3Currencies(): Promise<Currency[]>
  loadCurrentCurrency(currencyName: string): void
  setLoading(loadingStatus: boolean): void
  getChartCurrencyData(currency: string): Promise<historyCurrency[]>
}

class ApiService implements ApiFetching {
  constructor(private store: SuperStore) {}

  async getAllCurrencies(params: { currentPage: number; limit: number }) {
    await this.store.dispatch(ActionsType.LoadAllCurrencies, params)
  }
  async loadCurrentCurrency(currencyName: string) {
    await this.store.dispatch(ActionsType.LoadCurrentCurrency, currencyName)
  }
  async getSpecificCurrency(currencyName: string) {
    try {
      const response = (await apiCoincap.get(currencyName)).data
      return response.data
    } catch (e) {
      console.log(e)
    }
  }
  async getTop3Currencies() {
    try {
      const reqArgs = { params: { limit: 3 } }
      const response = (await apiCoincap(reqArgs)).data
      return response.data
    } catch (e) {
      console.log(e)
    }
  }
  async getChartCurrencyData(currency: string) {
    try {
      const reqArgs = { params: { interval: 'm1' } }
      const response = (await apiCoincap.get(`${currency}/history`, reqArgs)).data
      return response.data
    } catch (e) {
      console.log(e)
    }
  }

  setLoading(loadingStatus: boolean) {
    this.store.commit(MutationsType.SetLoading, loadingStatus)
  }
}

const instanceApiService = new ApiService(useStore())
export default instanceApiService
