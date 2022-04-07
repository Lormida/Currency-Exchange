<script setup lang="ts">
import { useTooltip } from '@/hooks/useTooltip'
import { onMounted } from 'vue'

const props = defineProps<{
  classTrigger: string
  left?: string
  right?: string
  top?: string
  bottom?: string
}>()

const { initTooltip } = useTooltip(props, 'tooltip--hide')
onMounted(() => {
  initTooltip()
})
</script>

<template>
  <div class="tooltip tooltip--hide p-2">
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
.tooltip--hide {
  visibility: hidden;
}
</style>
