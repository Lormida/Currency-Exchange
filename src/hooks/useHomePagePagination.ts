export const useHomePagePagination = (
  props: { currentPage: number; totalPage: number },
  emit: (e: 'change-current-page', currentPage: number) => void
) => {
  const changeCurrentPage = (pageNumber: number, direction?: boolean) => {
    if (direction === true && props.currentPage < props.totalPage) emit('change-current-page', props.currentPage + 1)
    else if (direction === false && props.currentPage > 1) emit('change-current-page', props.currentPage - 1)
    else emit('change-current-page', pageNumber)
  }

  return { changeCurrentPage }
}
