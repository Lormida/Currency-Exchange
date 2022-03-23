<template>
  <router-view />
  <!-- Modal buy-->

  <ModalWrapper v-if="getIsModalOpen"></ModalWrapper>
</template>

<script lang='ts'>
import ModalWrapper from '@/components/UI/ModalWrapper.vue';

import { useStore } from '@/store'
import { computed, defineComponent } from 'vue';
export default defineComponent({
  components: { ModalWrapper},
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
</style>
