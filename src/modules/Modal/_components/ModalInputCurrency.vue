<script setup lang="ts">
import { useModalInputCurrency } from '../hooks/useModalInputCurrency'

const props = defineProps<{
  currency: string
}>()

const emit = defineEmits<{
  (e: 'recalc-validate', getDisabledBtn: boolean, amount: number): void
}>()

const { inputRef, getErrorStatus, errorMessage, recalcValidate } = useModalInputCurrency(props, emit)
</script>

<template>
  <div class="form-currency__input-wrapper mx-auto">
    <input
      class="form-currency__input form-control"
      @input="recalcValidate"
      v-model="inputRef"
      :class="{ 'error-input': getErrorStatus }"
      placeholder="Amount"
    />
    <pre class="form-currency__form-message" dir="auto">{{ errorMessage }}</pre>
  </div>
</template>

<style lang="scss" scoped>
.form-currency {
  // .form-currency__input-wrapper

  &__input-wrapper {
    width: 70%;
  }

  // .form-currency__input

  &__input {
  }

  // .form-currency__form-message

  &__form-message {
    font-size: 12px;
    font-weight: 400;
    color: $lightRed;
    font-weight: 800;
    margin-top: 5px;
  }
}

.error-input {
  border-color: $lightRed;
  outline: 0;
  box-shadow: 0 0 0 0.25rem rgba(235, 96, 77, 0.25);
}
</style>
