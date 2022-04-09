import { actualBagDataType, PurchasedCurrency } from '@/services/types'

//*------------- Helpers types -------------
export enum MutationsType {
  DeleteCurrencyFromBag = 'DeleteCurrencyFromBag',
  AddCurrencyToBag = 'AddCurrencyToBag',
  LoadBagLocal = 'LoadBagLocal',
  ChangeActualBagData = 'ChangeActualBagData',
}

//*------------- State interface -------------
export interface IState {
  bag: PurchasedCurrency[]
  actualBagData: actualBagDataType
}

//*------------- Getters interface -------------
interface IGetters {
  getBag: PurchasedCurrency[]
  getActualBagData: actualBagDataType
}

//*------------- Mutations interface -------------
interface IMutations {
  [MutationsType.DeleteCurrencyFromBag](currencyName: string): void
  [MutationsType.AddCurrencyToBag](newCurrency: PurchasedCurrency): void
  [MutationsType.LoadBagLocal](bag: PurchasedCurrency[]): void
  [MutationsType.ChangeActualBagData](actualBagProfit: actualBagDataType): void
}
export interface IBag extends IState, IMutations, IGetters {}
