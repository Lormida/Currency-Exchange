<template>
  <div class="container-loader">
    <div class="loader">
      <span></span>
    </div>
  </div>
</template>
<script lang='ts'>
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'SpinnerLoader',
  setup() {
  }
})
</script>
<style lang='scss' scoped>
.container-loader {
  display: flex;
  background-color: rgba(22, 22, 22, 0.9);
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  -webkit-box-reflect: below 1px linear-gradient(#0001, #0004);
}
.loader {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: #f0e6ef;
  animation: animate 0.8s linear infinite;
}

@keyframes animate {
  from {
    transform: translateY(-50%) rotate(0deg);
  }
  to {
    transform: translateY(-50%) rotate(360deg);
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
  width: 10px;
  height: 10px;
  background-color: #fff;
  border-radius: 50%;
  z-index: 10;
  box-shadow: 0 0 10px #00fff9, 0 0 20px #00fff9;
}
span {
  position: absolute;
  top: 10px;
  left: 10px;
  right: 10px;
  bottom: 10px;
  background: #2c2c2c;
  border-radius: 50%;
}
</style>