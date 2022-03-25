<template>
  <form class="form-currency d-flex flex-column">
    <h3 class="form-currency__title mb-3">
      Specify the sum
      <br />
      <span class="form-currency__label">[{{ String(currency).toUpperCase() }}]</span>
    </h3>

    <InputCurrency @recalc-validate="recalcValidate" :currency="currency"></InputCurrency>

    <button
      :disabled="getDisabledBtn"
      @click.prevent="buyCurrency(currency, getCurrentAmount)"
      class="w-50 mx-auto btn btn-lg btn-primary"
      type="submit"
    >Buy currency</button>
  </form>
</template>

<script lang='ts'>
import InputCurrency from '@/components/UI/InputCurrency.vue'
import BagService from '@/utils/BagService';
import ModalService from '@/utils/ModalService';
import { computed, defineComponent, ref } from 'vue';
export default defineComponent({
  props: ['currency'],
  components: { InputCurrency },
  setup(props) {
    const disabledBtnStatus = ref(false)
    const currentAmount = ref(0)

    const getCurrentAmount = computed(() => currentAmount.value)

    const recalcValidate = (state: boolean, amount: number) => {
      disabledBtnStatus.value = state
      currentAmount.value = amount
    }
    const getDisabledBtn = computed(() => disabledBtnStatus.value)

    const buyCurrency = (currencyName: string, amount: number) => {
      BagService.addCurrencyToBag(currencyName, amount)
        .then(() => {
          ModalService.changeModalState(false)

          //* Update info about bag
          BagService.updateInfoBag(BagService.getActualCurrencyPrices, BagService.getBag())
        })
    }

    return {
      currency: props.currency, recalcValidate, getDisabledBtn, buyCurrency, currentAmount, getCurrentAmount
    };
  }
})
</script>

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