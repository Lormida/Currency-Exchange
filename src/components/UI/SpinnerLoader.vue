<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  size?: string
}
const props = defineProps<Props>()

const getLoader = computed(() => {
  if (props.size === 'small') {
    return {
      animationName: 'loader-small',
      background: 'background-color: transparent',
    }
  } else {
    return {
      animationName: 'loader-default',
      background: 'background-color: rgba(22, 22, 22, 0.9)',
    }
  }
})
</script>

<template>
  <div :style="getLoader.background" class="container-loader">
    <div :class="getLoader.animationName" class="lds-dual-ring"></div>
  </div>
</template>

<style lang="scss" scoped>
.container-loader {
  top: 0;
  left: 0;
  display: flex;
  position: absolute;

  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}

.loader-default {
  animation: animate 1.2s linear infinite;
}
.loader-small {
  animation: animate-small 1.2s linear infinite;
}

@keyframes animate {
  from {
    transform: scale(4) rotate(0deg);
  }
  to {
    transform: scale(4) rotate(360deg);
  }
}

@keyframes animate-small {
  from {
    transform: scale(0.7) rotate(0deg);
  }
  to {
    transform: scale(0.7) rotate(360deg);
  }
}

.lds-dual-ring {
  display: inline-block;
  width: 50px;
  height: 50px;
}
.lds-dual-ring:after {
  content: ' ';
  display: block;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 6px solid #fff;
  border-color: rgb(196, 141, 141) transparent #fff transparent;
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
