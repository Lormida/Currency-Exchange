import { useField } from 'vee-validate'
import { ref, computed } from 'vue'
import { CurrencyModule } from '@/store/modules/currency/index'

export const useModalInputCurrency = (
  props: { currency: string },
  emit: (e: 'recalc-validate', getDisabledBtn: boolean, amount: number) => void
) => {
  const currencySupply = CurrencyModule.getDetailCurrency(props.currency)
  const suspendPhrase = 'Enter the amount'

  const validateField = (value: string | unknown) => {
    if (typeof value === 'string') {
      if (!value) {
        return suspendPhrase
      }
      if (Number.isNaN(+value)) {
        return 'Amount must be a number!'
      }
      if (+value > currencySupply) {
        return 'You have exceeded the amount of available currency'
      }
      if (+value <= 0) {
        return 'Amount must be positive!'
      }
    }
    return true
  }

  const { value, errorMessage } = useField('fullName', validateField)

  let inputRef = ref<string | unknown>(value)

  const getErrorStatus = computed(() => {
    return typeof validateField(inputRef.value) === 'string' && !(validateField(inputRef.value) === suspendPhrase)
  })

  const getDisabledBtn = computed(() => typeof validateField(inputRef.value) === 'string')

  const recalcValidate = () => {
    if (typeof inputRef.value === 'string') {
      emit('recalc-validate', getDisabledBtn.value, +inputRef.value)
    }
  }

  return { inputRef, errorMessage, getErrorStatus, recalcValidate }
}
