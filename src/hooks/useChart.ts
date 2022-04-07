import ApiService from '@/utils/ApiService'
import { chartDataType, historyCurrency } from '@/utils/types'
import { computed, ref } from 'vue'

export const useChart = (props: { currency: string }) => {
  let dataX: Array<string> = []
  let dataY: Array<number> = []
  let isLoading = ref(true)
  let chartData = {} as chartDataType

  const fetchData = async () => {
    try {
      const data = await ApiService.getChartCurrencyData(props.currency)

      data.forEach((item: historyCurrency) => {
        dataX.push(new Date(item.time).toLocaleTimeString().slice(0, -6))
        dataY.push(+item.priceUsd)
      })
    } catch (e) {
      console.log(e)
    }

    chartData = {
      labels: dataX,
      datasets: [
        {
          label: 'Currency volatility (last 24h)',
          data: dataY,
        },
      ],
    }
    isLoading.value = false
  }

  const getChartData = computed(() => chartData)
  const getColor = (bgColor: string | undefined) => bgColor

  return { fetchData, getColor, getChartData, isLoading }
}
