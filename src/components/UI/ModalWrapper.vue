<template>
  <div class="modal__overlay" @click.self="closeCurrencyWindow">
    <div class="modal-window">
      <div class="modal-window__content">
        <span class="modal-window__close-btn" @click.self="closeCurrencyWindow"></span>

        <ModalBuyCurrency v-if="modalIndicator !== 'bag'" :currency="modalIndicator"></ModalBuyCurrency>
        <ModalBag v-else></ModalBag>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
// *ts-ignore
import ModalBag from './ModalBag.vue';
import ModalBuyCurrency from './ModalBuyCurrency.vue';
import { defineComponent, ref } from 'vue';
export default defineComponent({
  props: { modalIndicator: String },
  emits: ['close-modal-window'],
  components: {
    'ModalBuyCurrency': ModalBuyCurrency,
    'ModalBag': ModalBag,

  },
  // components: { ModalBuyCurrency, ModalBag },
  setup(props, ctx) {
    let amountCurrency = ref('')

    const closeCurrencyWindow = () => {
      ctx.emit('close-modal-window', false)
    }

    return {
      amountCurrency, closeCurrencyWindow, modalIndicator: props.modalIndicator
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
  width: 45%;
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
</style>