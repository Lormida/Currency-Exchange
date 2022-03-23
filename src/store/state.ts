type Currency = {
  "id": string
  "rank": string,
  "symbol": string,
  "name": string,
  "supply": string,
  "maxSupply": string,
  "marketCapUsd": string,
  "volumeUsd24Hr": string,
  "priceUsd": string,
  "changePercent24Hr": string,
  "vwap24Hr": string,
  "explorer": string,
}
type Modal = {
  currentModalIndicator: string,
  isModalOpen: boolean
}

type State = {
  currencies: Currency[],
  currentCurrency: Currency,
  isLoading: boolean,
  modal: Modal
}

const state: State = {
  currencies: [] as Currency[],
  currentCurrency: {} as Currency,
  isLoading: true,
  modal: {
    currentModalIndicator: '',
    isModalOpen: false
  },
}

export { state, State, Currency }