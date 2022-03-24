import { MutationsType } from '@/store/mutations'
import { PurchasedCurrency } from '@/store/state'
import { SuperStore, useStore } from '@/store'
import { Currency } from '@/store/state'
import { State } from '@/store/state'
import axios from 'axios'
import { getActualCurrencyPrices } from '@/hooks/getActualCurrencyPrices'

type bagProfitData = {
  oldBagValue: number,
  actualBagValue: number,
  profitPercent: number,
  profitAbsolute: number,
}

interface BagActions {
  getBag(): PurchasedCurrency[],
  deleteCurrencyFromBag(currencyName: string): void,
  addCurrencyToBag(currencyName: string, amount: number): any,
  saveBagLocal(bag: PurchasedCurrency[]): void,
  loadBagLocal(): void,
  analyzeBag(currencyPrices: typeof getActualCurrencyPrices, bag: any): Promise<bagProfitData>,
  calculateActualBagProfit(actualCurrencyPrices: Record<string, number>): bagProfitData
}

class BagService implements BagActions {
  constructor(private store: SuperStore) { }
  getBag(): PurchasedCurrency[] {
    return store.getters.getBag
  }
  deleteCurrencyFromBag(currencyName: string): void {
    store.commit(MutationsType.DeleteCurrencyFromBag, currencyName)
    this.saveBagLocal(store.getters.getBag)
  }
  addCurrencyToBag(currencyName: string, amount: number): any {

    return axios.get(`https://api.coincap.io/v2/assets/${currencyName}`)
      .then(response => response.data)
      .then(({ data }) => {
        let { symbol, id: name, priceUsd } = data
        priceUsd = (+priceUsd)
        const newCurrency = { name, symbol, amount, purchasePriceUsd: priceUsd } as PurchasedCurrency

        store.commit(MutationsType.AddCurrencyToBag, newCurrency)
        this.saveBagLocal(store.getters.getBag)
      })
      .catch(e => console.log(e))

  }
  saveBagLocal(bag: PurchasedCurrency[]) {
    localStorage.setItem('bag', JSON.stringify(bag));
  }
  loadBagLocal() {
    const bag = localStorage.getItem('bag')
    if (bag) {
      store.commit(MutationsType.LoadBagLocal, JSON.parse(bag))
    }
  }
  analyzeBag(currencyPrices: typeof getActualCurrencyPrices, bag: any) {
    return currencyPrices(bag)
      .then(actualCurrencyPrices => {
        return this.calculateActualBagProfit(actualCurrencyPrices)
      })
  }

  updateInfoBag(currencyPrices: typeof getActualCurrencyPrices, bag: any) {
    this.analyzeBag(currencyPrices, bag)
      .then(actualBagProfit => {
        store.commit(MutationsType.ChangeActualBagData, actualBagProfit)
      })
  }


  calculateActualBagProfit(actualCurrencyPrices: Record<string, number>) {
    const oldBagValue = +this.getBag().reduce((acc: number, purchasedCurrency: PurchasedCurrency) => {
      return acc + purchasedCurrency.purchasePriceUsd * purchasedCurrency.amount
    }, 0).toFixed(2)

    const actualBagValue = +this.getBag().reduce((acc: number, purchasedCurrency: PurchasedCurrency) => {
      return acc + actualCurrencyPrices[purchasedCurrency.name] * purchasedCurrency.amount
    }, 0).toFixed(2)

    const profitPercent = +(((actualBagValue - oldBagValue) / oldBagValue) * 100).toFixed(2)
    const profitAbsolute = +(actualBagValue - oldBagValue).toFixed(2)

    return { oldBagValue, actualBagValue, profitPercent, profitAbsolute }
  }


}
const store = useStore()

const instanceBagService = new BagService(store)
export default instanceBagService
