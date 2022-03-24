import { reactive } from "vue"

type Currency = {
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
type Modal = {
  currentModalIndicator: string,
  isModalOpen: boolean
}

type State = {
  currencies: Currency[],
  currentCurrency: Currency,
  isLoading: boolean,
  modal: Modal,
  bag: PurchasedCurrency[]
  actualBagData: typeof reactive | any,
}
type PurchasedCurrency = {
  name: string,
  symbol: string,
  amount: number
  purchasePriceUsd: number,
}

const state: State = {
  currencies: [] as Currency[],
  currentCurrency: {} as Currency,
  isLoading: true,
  modal: {
    currentModalIndicator: '',
    isModalOpen: false
  },
  bag: [] as PurchasedCurrency[],
  actualBagData: reactive({
    oldBagValue: 0,
    actualBagValue: 0,
    profitPercent: 0,
    profitAbsolute: 0,
  }),
}

export { state, State, Currency, PurchasedCurrency }