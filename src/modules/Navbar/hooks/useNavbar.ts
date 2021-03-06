import ApiService from '@/services/ApiService'
import { ref } from 'vue'

export const useNavbar = () => {
  let currencies = ref()
  let isLoading = ref(true)

  const getTop3Currencies = () => {
    ApiService.getTop3Currencies().then((data) => {
      currencies.value = data
      isLoading.value = false
    })
  }

  return { currencies, isLoading, getTop3Currencies }
}
