import { useStore } from '@/store'
import axios from 'axios'

const store = useStore()

const apiCoincap = axios.create({
  baseURL: `${store.getters.getBaseApiURL}`,
})

export { apiCoincap }
