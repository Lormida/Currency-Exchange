import BagService from '@/services/BagService'

export const useBag = () => {
  const loadBagLocal = () => BagService.loadBagLocal()
  const updateInfoBag = () => BagService.updateInfoBag(BagService.getActualCurrencyPrices, BagService.getBag())

  return { loadBagLocal, updateInfoBag }
}
