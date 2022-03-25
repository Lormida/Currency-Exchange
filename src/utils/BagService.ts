import { MutationsType } from '@/store/mutations'
import { PurchasedCurrency } from '@/store/state'
import { SuperStore, useStore } from '@/store'
import { Currency } from '@/store/state'
import { State } from '@/store/state'
import axios from 'axios'
import { reactive } from 'vue'
import ApiService from './ApiService'

type bagProfitData = {
  oldBagValue: number,
  actualBagValue: number,
  profitPercent: number,
  profitAbsolute: number,
}
type getActualCurrencyPrices = {
  (bag: PurchasedCurrency[]): Promise<Record<string, number>>
}

interface BagActions {
  getBag(): PurchasedCurrency[],
  deleteCurrencyFromBag(currencyName: string): void,
  addCurrencyToBag(currencyName: string, amount: number): any,
  saveBagLocal(bag: PurchasedCurrency[]): void,
  loadBagLocal(): void,
  analyzeBag(currencyPrices: getActualCurrencyPrices, bag: any): Promise<bagProfitData>,
  calculateActualBagProfit(actualCurrencyPrices: object): bagProfitData,
  getActualCurrencyPrices(bag: PurchasedCurrency[]): Promise<object>
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
  analyzeBag(currencyPrices: getActualCurrencyPrices, bag: any) {
    return currencyPrices(bag)
      .then((actualCurrencyPrices: Record<string, number>) => {
        return this.calculateActualBagProfit(actualCurrencyPrices)
      })
  }

  updateInfoBag(currencyPrices: getActualCurrencyPrices, bag: any) {
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

    let profitPercent = +(((actualBagValue - oldBagValue) / oldBagValue) * 100).toFixed(2)
    if (Number.isNaN(profitPercent)) {
      profitPercent = 0
    }
    
    const profitAbsolute = +(actualBagValue - oldBagValue).toFixed(2)

    return { oldBagValue, actualBagValue, profitPercent, profitAbsolute }
  }

  async getActualCurrencyPrices(bag: PurchasedCurrency[]): Promise<Record<string, number>> {

    const bagCurrencyActualPrices: Record<string, number> = reactive({});
    const bagCurrencyPromises = [] as Promise<Currency>[];
    bag.forEach((currency: PurchasedCurrency) =>
      bagCurrencyPromises.push(ApiService.getSpecificCurrency(currency.name)));

    await Promise.all(bagCurrencyPromises)
      .then((purchasedCurrencies: Currency[]) => {
        purchasedCurrencies.forEach((purchasedCurrency: Currency) => {
          bagCurrencyActualPrices[`${purchasedCurrency.id}`] = +purchasedCurrency.priceUsd;
        });
      })
      .catch(e => console.log(e))

    return bagCurrencyActualPrices
  };


}
const store = useStore()

const instanceBagService = new BagService(store)
export default instanceBagService
