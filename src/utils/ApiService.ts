import { ActionsType } from '@/store/actions'
import { MutationsType } from '@/store/mutations'
import { Currency } from '@/store/state'
import { SuperStore, useStore } from '@/store'
import axios from 'axios'

interface ApiFetching {
  getAllCurrencies(params: { currentPage: number, limit: number }): void,
  getSpecificCurrency(currencyName: string): Promise<Currency>,
  getTop3Currencies(): Promise<Currency[]>,
  loadCurrentCurrency(currencyName: string): void,
  setLoading(loadingStatus: boolean): void,
}

class ApiService implements ApiFetching {
  constructor(private store: SuperStore) { }

  async getAllCurrencies(params: { currentPage: number, limit: number }) {
    await this.store.dispatch(ActionsType.LoadAllCurrencies, params)
  }
  async loadCurrentCurrency(currencyName: string) {
    await this.store.dispatch(ActionsType.LoadCurrentCurrency, currencyName)
  }
  async getSpecificCurrency(currencyName: string) {
    try {
      const response = (await axios.get(`https://api.coincap.io/v2/assets/${currencyName}`)).data
      return response.data
    } catch (e) {
      console.log(e);
    }
  }
  async getTop3Currencies() {
    try {
      const response = (await axios.get(`https://api.coincap.io/v2/assets?limit=3`)).data
      return response.data
    } catch (e) {
      console.log(e);
    }
  }

  setLoading(loadingStatus: boolean) {
    this.store.commit(MutationsType.SetLoading, loadingStatus)
  }
}

const instanceApiService = new ApiService(useStore())
export default instanceApiService
