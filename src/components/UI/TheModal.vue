<script setup lang="ts">
import SpinnerLoader from './SpinnerLoader.vue'

import { computed, defineAsyncComponent } from 'vue'

import ModalService from '@/utils/ModalService'
import { useStore } from '@/store'

const store = useStore()

const getCurrentModalIndicator = computed(() => store.getters.getCurrentModalIndicator)
const getCurrentModal = computed(() => {
  let currentComponentName = 'TheModalBag'

  if (getCurrentModalIndicator.value !== 'bag') {
    currentComponentName = 'TheModalBuyCurrency'
  }

  return defineAsyncComponent(() => import(`@/components/UI/${currentComponentName}.vue`))
})
const closeModal = () => {
  ModalService.changeModalState(false)
}
</script>

<template>
  <div class="modal__overlay" @click.self="closeModal">
    <div class="modal-window">
      <div class="modal-window__content">
        <span class="modal-window__close-btn" @click.self="closeModal"></span>

        <Suspense>
          <template #default>
            <component :is="getCurrentModal" :currency="getCurrentModalIndicator.toLowerCase()"></component>
          </template>

          <template #fallback>
            <SpinnerLoader size="middle"></SpinnerLoader>
          </template>
        </Suspense>

      </div>
    </div>
  </div>
</template>

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
    mask-image: url('@/assets/svg/close.svg');
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
