import { reactive } from "vue"

export type Currency = {
  id: string
  rank: string,
  symbol: string,
  name: string,
  supply: string,
  maxSupply: string,
  marketCapUsd: string,
  volumeUsd24Hr: string,
  priceUsd: string,
  changePercent24Hr: string,
  vwap24Hr: string,
  explorer: string,
}
export type PurchasedCurrency = {
  name: string,
  symbol: string,
  amount: number
  purchasePriceUsd: number,
}

export type historyCurrency = {
  priceUsd: string,
  time: number
}

export type chartDataType = {
  labels: Array<string>,
  datasets : [
    {
      label: string,
      data: Array<number>
    }
  ]
}

export type Modal = {
  currentModalIndicator: string,
  isModalOpen: boolean
}

export type actualBagDataType = {
  oldBagValue: number,
  actualBagValue: number,
  profitPercent: number,
  profitAbsolute: number,
}

export type getActualCurrencyPrices = {
  (bag: PurchasedCurrency[]): Promise<Record<string, number>>
}