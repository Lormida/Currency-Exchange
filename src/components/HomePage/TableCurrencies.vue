<template>
  <table
    class="currency-table table table-hover border border-1 border-light w-80"
    v-if="!isLoading"
  >
    <thead>
      <tr>
        <th class="lead" scope="col">#</th>
        <th class="lead" scope="col">Name</th>
        <th class="lead" scope="col">Price</th>
        <th class="lead" scope="col">Change</th>
        <th class="lead" scope="col">Chart</th>
        <th class="lead" scope="col">Trade</th>
      </tr>
    </thead>
    <tbody>
      <tr
        class="currency-table__row"
        v-for="(currency, index) of currencies.data"
        :key="currency.id"
      >
        <th class="align-middle" scope="row">{{ index + 1 }}</th>
        <td class="align-middle">
          {{ currency.name }}
          <span class="currency-table__currency-symbol">{{ currency.symbol }}</span>
        </td>
        <td class="align-middle">$ {{ (+currency.priceUsd).toFixed(2) }}</td>
        <td class="text-start align-middle">
          <span
            :class="{
              'currency-table--currency-fall': currency.changePercent24Hr < 0,
              'currency-table--currency-growth': currency.changePercent24Hr >= 0
            }"
          >{{ (+currency.changePercent24Hr).toFixed(2) }}%</span>
        </td>
        <td class="align-middle">chart</td>
        <td class="align-middle">
          <button type="button" class="currency-table__btn btn btn-success px-3">Buy</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script lang='ts'>
import { defineComponent, onMounted, ref } from 'vue';
import axios from 'axios'
export default defineComponent({
  setup() {


    let currencies = ref()
    let isLoading = ref(true)

    onMounted(async () => {
      //! Temporary crutch
      currencies.value = (await axios.get('https://api.coincap.io/v2/assets?limit=5')).data
      isLoading.value = false

    })

    return { currencies, isLoading }
  }
})
</script>
<style lang='scss' scoped>
.currency-table__currency-symbol {
  font-weight: 100;
}
.currency-table--currency-fall {
  color: red;
}
.currency-table--currency-growth {
  color: green;
  &::before {
    content: "+";
  }
}
.currency-table__btn {
  //
}
</style>