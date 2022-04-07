import BagService from '@/utils/BagService'

export const useHomePageBag = () => {
  const loadBagLocal = () => BagService.loadBagLocal()
  const updateInfoBag = () => BagService.updateInfoBag(BagService.getActualCurrencyPrices, BagService.getBag())

  return { loadBagLocal, updateInfoBag }
}
