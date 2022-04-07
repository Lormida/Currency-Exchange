<script setup lang="ts">
import SpinnerLoader from '@/components/UI/SpinnerLoader.vue'

import { useTheModal } from '@/hooks/useTheModal'

const { getCurrentModalIndicator, getCurrentModal, closeModal } = useTheModal()
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
  background-color: $modalOverlay;
  height: 100%;
  width: 100%;
  display: flex;
  top: 0;
  position: fixed;
  left: 0;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  z-index: 2;
}

.modal-window {
  min-width: 600px;
  width: fit-content;

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
    display: flex;
    justify-content: center;
    align-items: center;
    mask-image: url('@/assets/svg/close.svg');
    background-color: $white;
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
