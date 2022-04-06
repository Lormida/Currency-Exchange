<script setup lang="ts">
import { onMounted } from 'vue'

const props = defineProps({
  classTrigger: {
    type: String,
    required: true,
  },
  left: String,
  right: String,
  bottom: String,
  top: String,
})

const initTooltip = () => {
  const tooltip = document.querySelector('.tooltip') as Element
  const tooltipParent = document.querySelector(`.${props.classTrigger}`) as Element

  tooltipParent.addEventListener('mouseenter', () => tooltip.classList.remove('hide-tooltip'))
  tooltipParent.addEventListener('mouseleave', () => tooltip.classList.add('hide-tooltip'))
}
onMounted(() => {
  initTooltip()
})
</script>

<template>
  <div class="tooltip hide-tooltip p-2">
    <slot name="default"> </slot>
  </div>
</template>

<style lang="scss" scoped>
// .tooltip
.tooltip {
  width: auto;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;
  position: absolute;
  left: v-bind(left);
  right: v-bind(right);
  bottom: v-bind(bottom);
  top: v-bind(top);
  padding: 2%;
  border-radius: 5px;
  background-color: $white;
  opacity: 1;
}
.hide-tooltip {
  visibility: hidden;
}
</style>
