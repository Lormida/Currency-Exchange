import axios from 'axios'
import { baseApiURL } from '@/utils/constants'

const apiCoincap = axios.create({
  baseURL: baseApiURL,
})

export { apiCoincap }
