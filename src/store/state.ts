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
}
type PurchasedCurrency = {
  name: string,
  amount: number
  purchasePriceUsd: number,
  currentPriceUsd: number,
}

const state: State = {
  currencies: [] as Currency[],
  currentCurrency: {} as Currency,
  isLoading: true,
  modal: {
    currentModalIndicator: '',
    isModalOpen: false
  },
  bag: [
    {
      name: 'BTC',
      amount: 2,
      purchasePriceUsd: 35000,
      currentPriceUsd: 40000,
    },
    {
      name: 'RPX',
      amount: 141,
      purchasePriceUsd: 4,
      currentPriceUsd: 3,
    }
  ] as PurchasedCurrency[],
}

export { state, State, Currency, PurchasedCurrency }