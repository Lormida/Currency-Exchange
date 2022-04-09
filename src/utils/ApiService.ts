import { CurrencyModule } from '@/store/modules/currency/index'

import { apiCoincap } from '@/helpers/apiCoincap'
import { Currency, historyCurrency } from '@/utils/types'

interface ApiFetching {
  getAllCurrencies(params: { currentPage: number; limit: number }): void
  getSpecificCurrency(currencyName: string): Promise<Currency>
  getTop3Currencies(): Promise<Currency[]>
  loadCurrentCurrency(currencyName: string): void
  setLoading(loadingStatus: boolean): void
  getChartCurrencyData(currency: string): Promise<historyCurrency[]>
}

class ApiService implements ApiFetching {
  async getAllCurrencies(params: { currentPage: number; limit: number }) {
    await CurrencyModule.LoadAllCurrencies(params)
  }
  async loadCurrentCurrency(currencyName: string) {
    await CurrencyModule.LoadCurrentCurrency(currencyName)
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
    CurrencyModule.SetLoading(loadingStatus)
  }
}

export default new ApiService()
