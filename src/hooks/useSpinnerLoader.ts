import { computed } from 'vue'

export const useSpinnerLoader = (props: { size?: string | undefined }) => {
  const getLoader = computed(() => {
    if (props?.size === 'small') {
      return {
        animationName: 'loader-small',
        background: 'background-color: transparent',
      }
    } else if (props?.size === 'middle') {
      return {
        animationName: 'loader-middle',
        background: 'background-color: transparent',
      }
    } else {
      return {
        animationName: 'loader-default',
        background: 'background-color: transparent',
      }
    }
  })

  return { getLoader }
}
