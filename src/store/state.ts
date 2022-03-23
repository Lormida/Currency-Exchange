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

type State = {
  currencies: Currency[],
  currentCurrency: Currency,
  isLoading: boolean
}

const state: State = {
  currencies: [],
  currentCurrency: {} as Currency,
  isLoading: true
}

export { state, State, Currency }