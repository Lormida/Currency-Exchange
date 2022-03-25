<template>
  <LineChart v-if="!isLoading" :chartData="getData" />
</template>


<script lang="ts">
import { defineComponent, ref, onMounted, computed } from 'vue';
import { LineChart } from 'vue-chart-3';
import { Chart, ChartData, registerables, ScatterDataPoint } from "chart.js";
import axios from "axios";

Chart.register(...registerables);

export default defineComponent({
  props: { currency: String },
  components: { LineChart },
  setup(props) {
    const baseURL = `https://api.coincap.io/v2/assets/${props.currency}/history?interval=m1`;

    let dataX: any = []
    let dataY: any = []
    let isLoading = ref(true)
    let testData = {}


    const fetchData = async () => {
      try {
        let { data } = (await axios.get(baseURL)).data
        data.forEach((item: any) => {
          dataX.push(new Date(item.time).toLocaleTimeString().slice(0, -6))
          dataY.push(item.priceUsd)
        })
      }
      catch(e) {
        console.log(e);
      }

      testData = {
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


    const getData = computed(() => {
      return testData as any
    })

    return { isLoading, getData }
  },
});
</script>

<style lang="scss" scope>
</style>
