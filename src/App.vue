<template>
  <router-view v-slot="{ Component }">
    <transition name="page" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
  <!-- Modal buy-->

  <ModalWrapper v-if="getIsModalOpen"></ModalWrapper>
</template>

<script lang='ts'>
import ModalWrapper from '@/components/UI/ModalWrapper.vue';

import { useStore } from '@/store'
import { computed, defineComponent } from 'vue';
export default defineComponent({
  components: { ModalWrapper },
  setup() {
    const store = useStore()
    const getIsModalOpen = computed(() => store.getters.getIsModalOpen)
    return { getIsModalOpen }
  }
})
</script>
<style lang='scss'>
* {
  font-family: "Inter", sans-serif;
  box-sizing: border-box;
}
[v-cloak] {
  display: none !important;
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
</style>
