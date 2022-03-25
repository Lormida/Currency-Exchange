<script setup lang='ts'>
import { useStore } from "@/store";
import { useField } from "vee-validate";
import { computed, ref } from 'vue';

interface Props {
  currency: string,
}
const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'recalc-validate', getDisabledBtn: boolean, amount: number): void
}>()

const store = useStore()
const currencySupply = store.getters.getDetailCurrency(props.currency)
const suspendPhrase = 'Enter the amount'

const validateField = (value: string | unknown) => {
  if (typeof value === 'string') {
    if (!value) {
      return suspendPhrase;
    }
    if (Number.isNaN(+value)) {
      return 'Amount must be a number!'
    }
    if ((+value) > currencySupply) {
      return 'You have exceeded the amount of available currency'
    }
    if ((+value) <= 0) {
      return "Amount must be positive!";
    }
  }
  return true;
}

const { value, errorMessage } = useField("fullName", validateField);

let inputRef = ref<string | unknown>(value)

const getErrorStatus = computed(() => {
  return typeof validateField(inputRef.value) === 'string' && !(validateField(inputRef.value) === suspendPhrase)
})

const getDisabledBtn = computed(() => (typeof validateField(inputRef.value) === 'string'))

const recalcValidate = () => {
  if (typeof inputRef.value === 'string') {
    emit('recalc-validate', getDisabledBtn.value, +inputRef.value)
  }
}

</script>

<template>
  <div class="form-currency__input-wrapper mx-auto">
    <input
      @input="recalcValidate"
      v-model="inputRef"
      :class="{ 'error-input': getErrorStatus }"
      class="form-control"
      placeholder="Sum"
    />
    <pre class="form-currency__form-message" dir="auto">{{ errorMessage }}</pre>
  </div>
</template>

<style lang='scss' scoped>
.form-currency {
  // .form-currency__input-wrapper

  &__input-wrapper {
    width: 70%;
  }

  // .form-currency__form-message

  &__form-message {
    font-size: 12px;
    font-weight: 400;
    color: #e15554;
    font-weight: 800;
    margin-top: 5px;
  }
}
.form-control {
}

.error-input {
  border-color: #e15554;
  outline: 0;
  box-shadow: 0 0 0 0.25rem rgba(235, 96, 77, 0.25);
}
</style>