import { createStore } from 'vuex'

import { IModal } from './modules/modal/types'
import { IBag } from './modules/bag/types'
import { ICurrency } from './modules/currency/types'

export interface SuperStore {
  user: IModal
  bag: IBag
  currency: ICurrency
}

const store = createStore<SuperStore>({})

export { store }
