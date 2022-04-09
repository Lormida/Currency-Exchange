import { reactive } from 'vue'
import ApiService from './ApiService'
import { actualBagDataType, Currency, getActualCurrencyPrices, PurchasedCurrency } from './types'
import { apiCoincap } from '@/helpers/apiCoincap'

import { BagModule } from '@/store/modules/bag/index'

interface BagActions {
  getBag(): PurchasedCurrency[]
  deleteCurrencyFromBag(currencyName: string): void
  addCurrencyToBag(currencyName: string, amount: number): Promise<any>
  saveBagLocal(bag: PurchasedCurrency[]): void
  loadBagLocal(): void
  analyzeBag(currencyPrices: getActualCurrencyPrices, bag: PurchasedCurrency[]): Promise<actualBagDataType>
  calculateActualBagProfit(actualCurrencyPrices: Record<string, number>): actualBagDataType
  getActualCurrencyPrices(bag: PurchasedCurrency[]): Promise<Record<string, number>>
}

class BagService implements BagActions {
  getBag(): PurchasedCurrency[] {
    return BagModule.getBag
  }
  deleteCurrencyFromBag(currencyName: string): void {
    BagModule.DeleteCurrencyFromBag(currencyName)
    this.saveBagLocal(BagModule.getBag)
  }
  addCurrencyToBag(currencyName: string, amount: number): Promise<any> {
    return apiCoincap
      .get(currencyName)
      .then((response) => response.data)
      .then(({ data }) => {
        let { symbol, id: name, priceUsd } = data
        priceUsd = +priceUsd
        const newCurrency = { name, symbol, amount, purchasePriceUsd: priceUsd } as PurchasedCurrency

        BagModule.AddCurrencyToBag(newCurrency)
        this.saveBagLocal(BagModule.getBag)
      })
      .catch((e) => console.log(e))
  }
  saveBagLocal(bag: PurchasedCurrency[]) {
    localStorage.setItem('bag', JSON.stringify(bag))
  }
  loadBagLocal() {
    const bag = localStorage.getItem('bag')
    if (bag) {
      BagModule.LoadBagLocal(JSON.parse(bag))
    }
  }
  analyzeBag(currencyPrices: getActualCurrencyPrices, bag: PurchasedCurrency[]) {
    return currencyPrices(bag).then((actualCurrencyPrices: Record<string, number>) => {
      return this.calculateActualBagProfit(actualCurrencyPrices)
    })
  }
  updateInfoBag(currencyPrices: getActualCurrencyPrices, bag: PurchasedCurrency[]) {
    this.analyzeBag(currencyPrices, bag).then((actualBagProfit) => {
      BagModule.ChangeActualBagData(actualBagProfit)
    })
  }
  calculateActualBagProfit(actualCurrencyPrices: Record<string, number>) {
    const oldBagValue = +this.getBag()
      .reduce((acc: number, purchasedCurrency: PurchasedCurrency) => {
        return acc + purchasedCurrency.purchasePriceUsd * purchasedCurrency.amount
      }, 0)
      .toFixed(2)

    const actualBagValue = +this.getBag()
      .reduce((acc: number, purchasedCurrency: PurchasedCurrency) => {
        return acc + actualCurrencyPrices[purchasedCurrency.name] * purchasedCurrency.amount
      }, 0)
      .toFixed(2)

    let profitPercent = +(((actualBagValue - oldBagValue) / oldBagValue) * 100).toFixed(2)

    if (Number.isNaN(profitPercent)) {
      profitPercent = 0
    }

    const profitAbsolute = +(actualBagValue - oldBagValue).toFixed(2)

    return { oldBagValue, actualBagValue, profitPercent, profitAbsolute }
  }

  async getActualCurrencyPrices(bag: PurchasedCurrency[]): Promise<Record<string, number>> {
    const bagCurrencyActualPrices: Record<string, number> = reactive({})
    const bagCurrencyPromises = [] as Promise<Currency>[]
    bag.forEach((currency: PurchasedCurrency) => bagCurrencyPromises.push(ApiService.getSpecificCurrency(currency.name)))

    await Promise.all(bagCurrencyPromises)
      .then((purchasedCurrencies: Currency[]) => {
        purchasedCurrencies.forEach((purchasedCurrency: Currency) => {
          bagCurrencyActualPrices[`${purchasedCurrency.id}`] = +purchasedCurrency.priceUsd
        })
      })
      .catch((e) => console.log(e))

    return bagCurrencyActualPrices
  }
}

export default new BagService()
