<script setup lang="ts">
import { onMounted } from 'vue'
import { LineChart } from 'vue-chart-3'
import { Chart, registerables } from 'chart.js'
import { useChart } from '@/hooks/useChart'

Chart.register(...registerables)

const props = defineProps<{
  currency: string
  bgColor?: string
}>()

const { fetchData, getColor, getChartData, isLoading } = useChart(props)

onMounted(async () => {
  await fetchData()
})
</script>

<template>
  <LineChart v-if="!isLoading" :style="{ 'background-color': getColor(bgColor) }" class="chart" :chartData="getChartData" />
</template>

<style lang="scss" scope>
.chart {
  background-color: $white;
}
</style>
