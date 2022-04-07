import ApiService from '@/utils/ApiService'
import { ref, Ref, computed } from 'vue'

export const useHomePage = () => {
  //* Initialization
  const limit = 6
  const currentPage = ref(1)
  const totalPage = Math.ceil(100 / limit)

  const setNewPage = async (pageNumber: number) => {
    currentPage.value = pageNumber
    await fetchData(currentPage, limit)
  }
  const getCurrentPage = computed(() => currentPage.value)

  const fetchData = async (currentPage: Ref<number>, limit: number) => {
    ApiService.setLoading(true)

    ApiService.getAllCurrencies({ currentPage: currentPage.value, limit }).then(() => {
      ApiService.setLoading(false)
    })
  }

  return { limit, currentPage, totalPage, getCurrentPage, setNewPage, fetchData }
}
