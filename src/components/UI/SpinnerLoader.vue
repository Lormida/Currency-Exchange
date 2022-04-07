<script setup lang="ts">
import { useSpinnerLoader } from '@/hooks/useSpinnerLoader'

const props = defineProps<{ size?: string }>()

const { getLoader } = useSpinnerLoader(props)
</script>

<template>
  <div :style="getLoader.background" class="container-loader">
    <div :class="getLoader.animationName" class="lds-dual-ring"></div>
  </div>
</template>

<style lang="scss" scoped>
.container-loader {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 100%;
  user-select: none;
}

.loader-default {
  animation: animate 1.2s linear infinite;
}
.loader-middle {
  animation: animate-middle 1.2s linear infinite;
}
.loader-small {
  animation: animate-small 1.2s linear infinite;
}

@keyframes animate {
  from {
    transform: scale(5) rotate(0deg);
  }
  to {
    transform: scale(5) rotate(360deg);
  }
}
@keyframes animate-middle {
  from {
    transform: scale(3) rotate(0deg);
  }
  to {
    transform: scale(3) rotate(360deg);
  }
}

@keyframes animate-small {
  from {
    transform: scale(1) rotate(0deg);
  }
  to {
    transform: scale(1) rotate(360deg);
  }
}

.lds-dual-ring {
  display: inline-block;
  width: 30px;
  height: 30px;
  user-select: none;
}
.lds-dual-ring:after {
  content: '';
  display: block;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 5px solid #fff;
  border-color: rgb(196, 141, 141) transparent #fff transparent;
  user-select: none;
}
@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
