import { VuexModule, Module, Mutation, getModule } from 'vuex-module-decorators'
import { store } from '@/store'

import { IBag } from './types'
import { MutationsType } from './types'
import { reactive } from 'vue'
import { actualBagDataType, PurchasedCurrency } from '@/utils/types'

@Module({ dynamic: true, store, name: 'bag' })
class Bag extends VuexModule implements IBag {
  //*------------- State -------------

  bag = [] as PurchasedCurrency[]
  actualBagData = reactive({
    oldBagValue: 0,
    actualBagValue: 0,
    profitPercent: 0,
    profitAbsolute: 0,
  })

  //*------------- Getters -------------
  get getBag() {
    return this.bag
  }

  get getActualBagData() {
    return this.actualBagData
  }


  //*------------- Mutations -------------
  @Mutation
  [MutationsType.DeleteCurrencyFromBag](currencyName: string) {
    this.bag = [].filter.call(this.bag, (currency: PurchasedCurrency) => currency.name !== currencyName)
  }

  @Mutation
  [MutationsType.AddCurrencyToBag](newCurrency: PurchasedCurrency) {
    const findIndex = this.bag.findIndex((currency: PurchasedCurrency) => currency.name === newCurrency.name)

    // If currency already exists - increase its amount
    if (findIndex != -1) {
      const oldCurrency = this.bag[findIndex]

      this.bag[findIndex] = {
        ...newCurrency,
        amount: +oldCurrency.amount + +newCurrency.amount,
      }
    }
    // If currency doesn't exist in bag - add it
    else {
      this.bag.push(newCurrency)
    }
  }

  @Mutation
  [MutationsType.LoadBagLocal](bag: PurchasedCurrency[]) {
    this.bag = bag
  }

  @Mutation
  [MutationsType.ChangeActualBagData](actualBagProfit: actualBagDataType) {
    const { oldBagValue, actualBagValue, profitPercent, profitAbsolute } = actualBagProfit

    this.actualBagData.oldBagValue = oldBagValue
    this.actualBagData.actualBagValue = actualBagValue
    this.actualBagData.profitPercent = profitPercent
    this.actualBagData.profitAbsolute = profitAbsolute
  }
}


export const BagModule = getModule(Bag)
