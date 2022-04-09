import BagService from '@/services/BagService'
import ModalService from '@/services/ModalService'
import { ref, computed } from 'vue'

export const useModalBuyCurrency = () => {
  const disabledBtnStatus = ref(true)
  const currentAmount = ref(0)

  const getCurrentAmount = computed(() => currentAmount.value)
  const getDisabledBtn = computed(() => disabledBtnStatus.value)

  const recalcValidate = (state: boolean, amount: number) => {
    disabledBtnStatus.value = state
    if (!Number.isNaN(amount)) {
      currentAmount.value = amount
    }
  }

  const buyCurrency = (currencyName: string, amount: number) => {
    BagService.addCurrencyToBag(currencyName, amount).then(() => {
      ModalService.changeModalState(false)

      //* Update info about bag
      BagService.updateInfoBag(BagService.getActualCurrencyPrices, BagService.getBag())
    })
  }

  return { getCurrentAmount, getDisabledBtn, recalcValidate, buyCurrency }
}
