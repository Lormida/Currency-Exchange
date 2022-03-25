import { Currency, PurchasedCurrency, Modal, actualBagDataType } from "@/utils/types"
import { reactive } from 'vue'

type State = {
  currencies: Currency[],
  currentCurrency: Currency,
  isLoading: boolean,
  modal: Modal,
  bag: PurchasedCurrency[]
  actualBagData: actualBagDataType,
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