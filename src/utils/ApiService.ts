import { Actions, ActionsType } from '@/store/actions'
import { Getters } from '@/store/getters'
import { Mutations, MutationsType } from '@/store/mutations'
import { Currency, State } from '@/store/state'
import { useStore } from '@/store'
import { Store } from 'vuex'

interface ApiFetching {
  getAllCurrencies(params: { currentPage: number, limit: number }): void,
  getCurrentCurrency(currencyName: string): void,
  setLoading(loadingStatus: boolean): void,
}

class ApiService implements ApiFetching {
  constructor(private store: Store<State>) { }

  async getAllCurrencies(params: { currentPage: number, limit: number }) {
    await this.store.dispatch(ActionsType.getAllCurrencies, params)
  }
  async getCurrentCurrency(currencyName: string) {
    await this.store.dispatch(ActionsType.getCurrentCurrency, currencyName)
  }
  setLoading(loadingStatus: boolean) {
    this.store.commit(MutationsType.SetLoading, loadingStatus)
  }
}
const store = useStore()

const instanceApiService = new ApiService(store)
export default instanceApiService
