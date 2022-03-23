<template>
  <table class="currency-table container mx-auto table table-hover w-80 m-0">
    <thead>
      <tr>
        <th class="lead text-center" scope="col">#</th>
        <th class="lead" scope="col">Name</th>
        <th class="lead" scope="col">Price</th>
        <th class="lead" scope="col">Change</th>
        <th class="lead" scope="col">Chart</th>
        <th class="lead" scope="col">Trade</th>
      </tr>
    </thead>
    <tbody>
      <template v-for="(currency, index) of getCurrencies" :key="currency.id">
        <tr class="currency-table__row">
          <th class="align-middle text-center" scope="row">{{ (currentPage - 1) * limit + index + 1 }}</th>
          <td class="align-middle">
            <router-link
              class="currency-table__link-detail"
              :to="{ name: 'currency', params: { id: currency.id } }"
            >
              {{ currency.name }}
              <span class="currency-table__currency-symbol">{{ currency.symbol }}</span>
            </router-link>
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
            <button
              type="button"
              class="currency-table__btn btn btn-success px-3"
              @click="openModal(currency.id)"
            >Buy</button>
          </td>
        </tr>
      </template>
    </tbody>
  </table>
</template>
<script lang='ts'>
import { computed, defineComponent, onMounted, ref } from 'vue';

export default defineComponent({
  props: ['currencies', 'currentPage', 'limit'],
  setup(props, ctx) {

    let isLoading = ref(true)

    const openModal = (id: any) => {
      ctx.emit('open-modal-window', id)
    }

    const getCurrencies = computed(() => {
      return props.currencies
    })
    const getCurrentPage = computed(() => {
      return props.currentPage
    })


    return { isLoading, openModal, getCurrencies, getCurrentPage, limit: props.limit }
  }
})
</script>
<style lang='scss' scoped>
.currency-table {
  background-color: #f8f7ff;
  box-shadow: rgba(0, 0, 0, 0.08) 0px 4px 12px;
  border-radius: 10px;
  // border-bottom: none;
  border-collapse: collapse;
}
.currency-table__row:last-child {
  border-bottom: none;
}
.currency-table__currency-symbol {
  font-weight: 100;
}
.currency-table__link-detail {
  text-decoration: none;
  color: #222;
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