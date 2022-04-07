<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import { getIsModalOpen } from '@/helpers/getIsModalOpen'
import HomePageNavbar from '@/components/HomePage/Navbar/HomePageNavbar.vue'

const TheModal = defineAsyncComponent(() => import(/* webpackChunkName: 'TheModal' */ '@/components/Modal/TheModal.vue'))
</script>

<template>
  <div class="global-container">
    <HomePageNavbar class="header__navbar" />
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
@import '@/assets/scss/global.scss';

.global-container {
  width: 80%;
  height: 95%;
  display: flex;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  justify-content: space-between;
  align-items: stretch;
  flex-direction: column;
}

.header__navbar {
  min-height: $headerHeight;
}

//* Transition
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

</style>
