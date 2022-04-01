import ModalService from '@/utils/ModalService'

export const openModal = (currentModalIndicator: string) => {
  ModalService.changeCurrentModalIndicator(currentModalIndicator)
  ModalService.changeModalState(true)
}
