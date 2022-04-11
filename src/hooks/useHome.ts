import ApiService from '@/services/ApiService'
import { ref, Ref, computed } from 'vue'

export const useHome = () => {
  //* Initialization
  const limit = 7
  const currentPage = ref(1)
  const totalPage = Math.ceil(100 / limit)

  const getCurrentPage = computed(() => currentPage.value)

  const fetchData = async (currentPage: Ref<number>, limit: number) => {
    ApiService.setLoading(true)

    ApiService.getAllCurrencies({ currentPage: currentPage.value, limit }).then(() => {
      ApiService.setLoading(false)
    })
  }

  const setNewPage = async (pageNumber: number) => {
    currentPage.value = pageNumber
    await fetchData(currentPage, limit)
  }

  return { limit, currentPage, totalPage, getCurrentPage, setNewPage, fetchData }
}
