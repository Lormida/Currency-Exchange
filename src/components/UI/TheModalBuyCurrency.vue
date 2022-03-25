<script setup lang='ts'>
import TheModalInputCurrency from '@/components/UI/TheModalInputCurrency.vue'
import BagService from '@/utils/BagService';
import ModalService from '@/utils/ModalService';
import { computed, ref } from 'vue';

interface Props {
  currency: string
}

const props = defineProps<Props>()

const disabledBtnStatus = ref(true)
const currentAmount = ref(0)

const getCurrentAmount = computed(() => currentAmount.value)
const getDisabledBtn = computed(() => disabledBtnStatus.value)

const recalcValidate = (state: boolean, amount: number) => {
  disabledBtnStatus.value = state
  if (!Number.isNaN(amount)) {
    currentAmount.value = amount
  }
}

const buyCurrency = (currencyName: string, amount: number) => {
  BagService.addCurrencyToBag(currencyName, amount)
    .then(() => {
      ModalService.changeModalState(false)

      //* Update info about bag
      BagService.updateInfoBag(BagService.getActualCurrencyPrices, BagService.getBag())
    })
}

</script>

<template>
  <form class="form-currency d-flex flex-column">
    <h3 class="form-currency__title mb-3">
      Specify the sum
      <br />
      <span class="form-currency__label">[{{ String(currency).toUpperCase() }}]</span>
    </h3>

    <TheModalInputCurrency @recalc-validate="recalcValidate" :currency="currency"></TheModalInputCurrency>

    <button
      :disabled="getDisabledBtn"
      @click.prevent="buyCurrency(currency, getCurrentAmount)"
      class="w-50 mx-auto btn btn-lg btn-primary"
      type="submit"
    >Buy currency</button>
  </form>
</template>



<style lang='scss' scoped>
.form-currency__label {
  font-size: 15px;
  font-weight: 800;
  color: rgb(0, 255, 149);
}
.form-currency {
  background-color: rgba(31, 36, 33, 0.8);
  padding: 50px 80px;
  box-shadow: 0px 0px 13px 10px rgba(41, 61, 77, 0.2);
  &__title {
    color: white;
    text-align: center;
  }
}
</style>