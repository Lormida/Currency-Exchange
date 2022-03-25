import { Actions, ActionsType } from '@/store/actions'
import { Getters } from '@/store/getters'
import { Mutations, MutationsType } from '@/store/mutations'
import { Currency, PurchasedCurrency, State } from '@/store/state'
import { useStore } from '@/store'
import { Store } from 'vuex'
import axios from 'axios'

interface ApiFetching {
  getAllCurrencies(params: { currentPage: number, limit: number }): void,
  getSpecificCurrency(currencyName: string): Promise<Currency>,
  getTop3Currencies(): Promise<Currency[]>,
  loadCurrentCurrency(currencyName: string): void,
  setLoading(loadingStatus: boolean): void,
}

class ApiService implements ApiFetching {
  constructor(private store: Store<State>) { }

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
const store = useStore()

const instanceApiService = new ApiService(store)
export default instanceApiService
