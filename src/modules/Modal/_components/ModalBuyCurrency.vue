<script setup lang="ts">
import ModalInputCurrency from '@/modules/Modal/_components/ModalInputCurrency.vue'
import ModalTitleBuyCurrency from '@/modules/Modal/_components/ModalTitleBuyCurrency.vue'

import { useModalBuyCurrency } from '../hooks/useModalBuyCurrency'

const props = defineProps<{
  currency: string
}>()

const { getCurrentAmount, getDisabledBtn, recalcValidate, buyCurrency } = useModalBuyCurrency()
</script>

<template>
  <form class="form-currency d-flex flex-column">
    <ModalTitleBuyCurrency title="Specify the amount" :subtitle="String(currency).toUpperCase()"> </ModalTitleBuyCurrency>
    <ModalInputCurrency @recalc-validate="recalcValidate" :currency="currency"></ModalInputCurrency>

    <button
      :disabled="getDisabledBtn"
      @click.prevent="buyCurrency(currency, getCurrentAmount)"
      class="w-50 mx-auto btn btn-lg btn-primary"
      type="submit"
    >
      Buy currency
    </button>
  </form>
</template>

<style lang="scss" scoped>
.form-currency {
  background-color: $modalBuyBg;
  padding: 50px 80px;
  box-shadow: 0px 0px 13px 10px rgba(41, 61, 77, 0.2);
}
</style>
