import ModalService from '@/services/ModalService'

export const openModal = (currentModalIndicator: string) => {
  ModalService.changeCurrentModalIndicator(currentModalIndicator)
  ModalService.changeModalState(true)
}
