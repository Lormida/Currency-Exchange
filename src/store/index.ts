import { createStore, Store as VuexStore, CommitOptions, DispatchOptions } from 'vuex'
import { state, State } from './state'
import { getters, Getters } from './getters'
import { mutations, Mutations } from './mutations'
import { actions, Actions } from './actions'

const store = createStore<State>({
  state,
  getters,
  mutations,
  actions,
})

type SuperStore = Omit<VuexStore<State>, 'getters' | 'commit' | 'dispatch'> & {
  commit<K extends keyof Mutations>(key: K, payload?: Parameters<Mutations[K]>[1], options?: CommitOptions): ReturnType<Mutations[K]>
} & {
  dispatch<K extends keyof Actions>(key: K, payload?: Parameters<Actions[K]>[1], options?: DispatchOptions): ReturnType<Actions[K]>
} & {
  getters: {
    [K in keyof Getters]: ReturnType<Getters[K]>
  }
}

const useStore = () => {
  return store as SuperStore
}

export { useStore, SuperStore }
