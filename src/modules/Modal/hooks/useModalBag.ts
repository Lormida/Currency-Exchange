import BagService from '@/services/BagService'
import { computed } from 'vue'

export const useModalBag = () => {
  const getBag = computed(() => BagService.getBag())
  const titlesNames = ['Currency', 'Current price', 'Amount', 'Profit', 'Remove']
  const titleClasses = ['col-2', 'col-2', 'col-2', 'col-2', 'col-1']
  const loadBagLocal = () => BagService.loadBagLocal()
  return { getBag, titlesNames, titleClasses, loadBagLocal }
}
