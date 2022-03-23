<template>
  <form class="form-currency">
    <h3 class="form-currency__title mb-3">
      Specify the sum
      <br />
      <span class="currency-label">[{{ String(currency).toUpperCase() }}]</span>
    </h3>
    <div class="form-floating">
      <input type="text" class="form-control" id="currency-input" placeholder="Sum" />
      <label for="currency-input">Sum of currency</label>
    </div>

    <button @click.prevent class="w-100 btn btn-lg btn-primary" type="submit">Buy currency</button>
  </form>
</template>

<script lang='ts'>
import ModalWrapper from './ModalWrapper.vue'
import { defineComponent } from 'vue';
export default defineComponent({
  props: ['currency'],
  setup(props) {

    return { currency: props.currency }
  }
})
</script>

<style lang='scss' scoped>
.form-currency {
  background-color: rgba(31, 36, 33, 0.8);
  padding: 50px 80px;
  box-shadow: 0px 0px 13px 10px rgba(41, 61, 77, 0.2);
  &__title {
    color: white;
    text-align: center;
  }
}
.form-floating {
  margin: 10px 0;
}
.currency-label {
  font-size: 15px;
  font-weight: 800;
  color: rgb(0, 255, 149);
}
</style>