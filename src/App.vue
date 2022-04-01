<script setup lang="ts">
import TheModal from '@/components/UI/TheModal.vue'
import { useStore } from '@/store'
import { computed } from 'vue'

const store = useStore()
const getIsModalOpen = computed(() => store.getters.getIsModalOpen)
</script>

<template>
  <router-view v-slot="{ Component }">
    <transition name="page" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
  <!-- Modal buy-->

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
  background-color: #9a8c98;
}

.currency-fall {
  color: rgb(187, 36, 36);
}
.currency-growth {
  color: green;
  &::before {
    content: '+';
  }
}
</style>
