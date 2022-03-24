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
}

class BagService implements BagActions {
  constructor(private store: SuperStore) { }
  getBag(): PurchasedCurrency[] {
    return this.store.getters.getBag
  }
  deleteCurrencyFromBag(currencyName: string): void {
    this.store.commit(MutationsType.DeleteCurrencyFromBag, currencyName)
  }
  addCurrencyToBag(currencyName: string, amount: number): any {

    return new Promise((resolve) => {
      axios.get(`https://api.coincap.io/v2/assets/${currencyName}`)
        .then(response => response.data)
        .then(({ data }) => {
          let { symbol: name, priceUsd } = data
          priceUsd = (+priceUsd).toFixed(2)
          const newCurrency = { name, amount, purchasePriceUsd: priceUsd, currentPriceUsd: priceUsd } as PurchasedCurrency
          this.store.commit(MutationsType.AddCurrencyToBag, newCurrency)
          resolve(true)
        })
        .catch(e => console.log(e))
    })

  }



}
const store = useStore()

const instanceBagService = new BagService(store)
export default instanceBagService
