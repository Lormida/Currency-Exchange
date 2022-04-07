<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import { getIsModalOpen } from '@/helpers/getIsModalOpen'
const TheModal = defineAsyncComponent(() => import(/* webpackChunkName: 'TheModal' */ '@/components/Modal/TheModal.vue'))
</script>

<template>
  <div class="global-container">
    <router-view v-slot="{ Component }">
      <transition name="page" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>

    <!-- Modal-->
    <TheModal v-if="getIsModalOpen"></TheModal>
  </div>
</template>

<style lang="scss">
@font-face {
  font-family: 'BiosRegular';
  src: url('@/assets/fonts/BiosRegular.woff2') format('woff2');
}
@font-face {
  font-family: 'BiosBold';
  src: url('@/assets/fonts/BiosBold.woff2') format('woff2');
}

* {
  font-family: 'BiosRegular';
  box-sizing: border-box;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}
.page-enter-to,
.page-leave-from {
  opacity: 1;
  transform: translateX(0px);
}
.page-enter-active {
  transition: all 0.5s ease-in-out 0s;
}
.page-leave-active {
  transition: all 0.25s ease-in-out 0s;
}

body {
  width: 100%;
  max-width: 1440px;
  height: 100vh;
  margin: 0 auto;
  background: linear-gradient(45deg, transparent 3%, #00e6f6 3%, #00e6f6 5%, #5736be 5%);
}

.global-container {
  width: 80%;
  height: 90%;
  display: flex;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  justify-content: space-between;
  align-items: stretch;
  flex-direction: column;
}

.currency-fall {
  color: $red;
  font-weight: bold;
}
.currency-growth {
  color: $green;
  font-weight: bold;
  &::before {
    content: '+';
  }
}

/* Custom Scrollbar */
::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background: white;
}

::-webkit-scrollbar-thumb {
  background: rgba(245, 73, 82, 0.8);
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(22, 22, 22, 0.8);
}
</style>
