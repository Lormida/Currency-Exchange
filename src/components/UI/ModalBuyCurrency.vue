<template>
  <form class="form-currency">
    <h3 class="form-currency__title mb-3">
      Specify the sum
      <br />
      <span class="form-currency__label">[{{ String(currency).toUpperCase() }}]</span>
    </h3>

    <InputCurrency @recalc-validate="calcDisabledBtn" :currency="currency"></InputCurrency>

    <button
      :disabled="getDisabledBtn"
      @click.prevent
      class="w-100 btn btn-lg btn-primary"
      type="submit"
    >Buy currency</button>
  </form>
</template>

<script lang='ts'>
import InputCurrency from '@/components/UI/InputCurrency.vue'
import { computed, defineComponent, ref } from 'vue';
export default defineComponent({
  props: ['currency'],
  components: { InputCurrency },
  setup(props) {
    const disabledBtnStatus = ref(false)

    const calcDisabledBtn = (state: boolean) => disabledBtnStatus.value = state
    const getDisabledBtn = computed(() => disabledBtnStatus.value)


    return {
      currency: props.currency, calcDisabledBtn, getDisabledBtn
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