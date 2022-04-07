<script setup lang="ts">
import TheModalInputCurrency from '@/components/Modal/TheModalInputCurrency.vue'
import TheModalTitleBuyCurrency from '@/components/Modal/TheModalTitleBuyCurrency.vue'

import { useTheModalBuyCurrency } from '@/hooks/useTheModalBuyCurrency'

const props = defineProps<{
  currency: string
}>()

const { getCurrentAmount, getDisabledBtn, recalcValidate, buyCurrency } = useTheModalBuyCurrency()
</script>

<template>
  <form class="form-currency d-flex flex-column">
    <TheModalTitleBuyCurrency title="Specify the amount" :subtitle="String(currency).toUpperCase()"> </TheModalTitleBuyCurrency>
    <TheModalInputCurrency @recalc-validate="recalcValidate" :currency="currency"></TheModalInputCurrency>

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
