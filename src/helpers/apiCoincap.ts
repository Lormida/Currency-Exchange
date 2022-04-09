import axios from 'axios'
import { baseApiURL } from '@/services/constants'

const apiCoincap = axios.create({
  baseURL: baseApiURL,
})

export { apiCoincap }
