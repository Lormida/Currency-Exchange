<template>
  <div class="modal__overlay" @click.self="closeCurrencyWindow">
    <div class="modal-window">
      <div class="modal-window__content">
          <span class="modal-window__close-btn" @click.self="closeCurrencyWindow"></span>
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
      </div>
    </div>
  </div>
</template>
<script lang='ts'>
import { defineComponent, ref } from 'vue';
export default defineComponent({
  props: ['currency'],
  emits: ['close-currency-window'],
  setup(props, ctx) {
    let amountCurrency = ref('')

    const closeCurrencyWindow = () => {
      ctx.emit('close-currency-window', false)
    }

    return {
      amountCurrency, closeCurrencyWindow, currency: props.currency
    }
  }
})
</script>
<style lang="scss" scoped>
.modal__overlay {
  background-color: rgba(22, 22, 22, 0.5);
  height: 100vh;
  width: 100vw;
  display: flex;
  top: 0;
  position: fixed;
  left: 0;
  justify-content: center;
  align-items: center;
}

.modal-window {
  // .modal-window__content

  &__content {
     position: relative;
  }
  // .modal-window__close-btn
  &__close-btn {
    position: absolute;
    right: 0;
    width: 50px;
    height: 50px;
    background-color: #000;
    display: flex;
    justify-content: center;
    align-items: center;
    mask-image: url("@/assets/svg/close.svg");
    background-color: white;
    transform: translateX(50%) translateY(-50%);
    mask-size: contain;
    transition: transform 0.3s ease;

    &:hover {
      cursor: pointer;
      transform: translateX(50%) translateY(-50%) rotateZ(135deg) scale(1.3);
    }
  }
}

///////////////////
.form-currency {
  max-width: 450px;
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