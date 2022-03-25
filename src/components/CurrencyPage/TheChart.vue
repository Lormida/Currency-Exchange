<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { LineChart } from 'vue-chart-3';
import { Chart, registerables } from "chart.js";
import axios from "axios";
import { chartDataType, historyCurrency } from '@/utils/types';

Chart.register(...registerables);

interface Props {
  currency: string
}
const props = defineProps<Props>()

let dataX: Array<string> = []
let dataY: Array<number> = []
let isLoading = ref(true)
let chartData = {} as chartDataType

const fetchData = async () => {
  try {
    const response = (await axios.get(`https://api.coincap.io/v2/assets/${props.currency}/history?interval=m1`)).data
    const data: historyCurrency[] = response.data

    data.forEach((item: historyCurrency) => {
      dataX.push(new Date(item.time).toLocaleTimeString().slice(0, -6))
      dataY.push(+item.priceUsd)
    })
  }
  catch (e) {
    console.log(e);
  }

  chartData = {
    labels: dataX,
    datasets: [
      {
        label: 'Currency volatility (last 24h)',
        data: dataY,
      },
    ],
  };
  isLoading.value = false
}

onMounted(async () => {
  await fetchData()
})

const getChartData = computed(() => chartData)

</script>

<template>
  <LineChart v-if="!isLoading" :chartData="getChartData" />
</template>

<style lang="scss" scope>
</style>
