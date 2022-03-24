import { MutationsType } from '@/store/mutations'
import { PurchasedCurrency } from '@/store/state'
import { SuperStore, useStore } from '@/store'
import { Currency } from '@/store/state'
import { State } from '@/store/state'
import axios from 'axios'

interface BagActions {
  getBag(): PurchasedCurrency[],
  deleteCurrencyFromBag(currencyName: string): void,
  addCurrencyToBag(currencyName: string, amount: number): any,
  saveBagLocal(bag: PurchasedCurrency[]): void,
  loadBagLocal(): void
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
        priceUsd = (+priceUsd).toFixed(2)
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


}
const store = useStore()

const instanceBagService = new BagService(store)
export default instanceBagService
