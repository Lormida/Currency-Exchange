<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import { getIsModalOpen } from '@/hooks/getIsModalOpen'
const TheModal = defineAsyncComponent(() => import(/* webpackChunkName: 'TheModal' */ '@/components/UI/TheModal.vue'))
</script>

<template>
  <router-view v-slot="{ Component }">
    <transition name="page" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>

  <!-- Modal-->
  <TheModal v-if="getIsModalOpen"></TheModal>
</template>

<style lang="scss">
* {
  font-family: 'Inter', sans-serif;
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
html {
  background-color: $transitionColor;
}

.currency-fall {
  color: $red;
}
.currency-growth {
  color: $green;
  &::before {
    content: '+';
  }
}
</style>
