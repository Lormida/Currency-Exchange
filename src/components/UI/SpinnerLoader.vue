<script setup lang='ts'>
import { computed } from 'vue';

interface Props {
  size?: string,
}
const props = defineProps<Props>()

const getLoader = computed(() => {
  if (props.size === 'small') {
    return {
      animationName: 'loader-small',
      background: 'background-color: transparent',
      colorLoader: 'background-color: rgb(255,255,255)'
    }
  } else {
    return {
      animationName: 'loader-default',
      background: 'background-color: rgba(22, 22, 22, 0.9)',
      colorLoader: 'background-color: #2c2c2c'
    }
  }
})

</script>

<template>
  <div :style="getLoader.background" class="container-loader">
    <div :class="getLoader.animationName" class="loader">
      <span :style="getLoader.colorLoader"></span>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.container-loader {
  top: 0;
  left: 0;
  display: flex;
  position: absolute;

  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  -webkit-box-reflect: below 1px linear-gradient(#0001, #0004);
}
.loader {
  height: 50px;
  width: 50px;
  border-radius: 50%;
}
.loader-default {
  background: #f0e6ef;
  animation: animate 0.8s linear infinite;
}
.loader-small {
  background: #f0e6ef;
  animation: animate-small 0.8s linear infinite;
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
.loader:before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 50%;
  height: 100%;
  background: linear-gradient(to top, transparent, rgba(102, 211, 147, 0.4));
  background-size: 50px 90px;
  background-repeat: no-repeat;
  border-top-left-radius: 50px;
  border-bottom-left-radius: 50px;
}
.loader::after {
  content: "";
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 4px;
  height: 4px;
  background-color: #fff;
  border-radius: 50%;
  z-index: 10;
  box-shadow: 0 0 4px #00fff9, 0 0 8px #00fff9;
}
span {
  position: absolute;
  top: 4px;
  left: 4px;
  right: 4px;
  bottom: 4px;
  border-radius: 50%;
}
</style>