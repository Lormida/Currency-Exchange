export const useTooltip = (props: { classTrigger: string }, hideClass: string) => {
  const initTooltip = () => {
    const tooltip = document.querySelector('.tooltip') as Element
    const tooltipParent = document.querySelector(`.${props.classTrigger}`) as Element

    tooltipParent.addEventListener('mouseenter', () => tooltip.classList.remove(hideClass))
    tooltipParent.addEventListener('mouseleave', () => tooltip.classList.add(hideClass))
  }
  return { initTooltip }
}
