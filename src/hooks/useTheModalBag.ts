import BagService from '@/utils/BagService'
import { computed } from 'vue'

export const useTheModalBag = () => {
  const getBag = computed(() => BagService.getBag())
  const titlesNames = ['Currency', 'Current price', 'Amount', 'Profit', 'Remove']
  const titleClasses = ['col-2', 'col-2', 'col-2', 'col-2', 'col-1']
  const loadBagLocal = () => BagService.loadBagLocal()
  return { getBag, titlesNames, titleClasses, loadBagLocal }
}
