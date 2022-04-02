<script setup lang="ts">
import { computed } from 'vue'

import { getFormatCurrency } from '@/hooks/getFormatCurrency'
import { openModal } from '@/hooks/openModal'
import { Currency } from '@/utils/types'

interface Props {
  currencies: Currency[]
  currentPage: number
  limit: number
}
const props = defineProps<Props>()

const getCurrencies = computed(() => props.currencies)
</script>

<template>
  <table class="currency-table container mx-auto table table-hover w-80 m-0">
    <thead>
      <tr>
        <th class="lead text-center" scope="col">#</th>
        <th class="lead" scope="col">Name</th>
        <th class="lead" scope="col">Price</th>
        <th class="lead" scope="col">Change</th>
        <th class="lead" scope="col">Trade</th>
      </tr>
    </thead>
    <tbody>
      <template v-for="(currency, index) of getCurrencies" :key="currency.id">
        <tr class="currency-table__row">
          <th class="align-middle text-center" scope="row">{{ (currentPage - 1) * limit + index + 1 }}</th>
          <td class="align-middle">
            <router-link class="currency-table__link-detail" :to="{ name: 'currency', params: { id: currency.id } }">
              {{ currency.name }}
              <span class="currency-table__currency-symbol">{{ currency.symbol }}</span>
            </router-link>
          </td>
          <td class="align-middle">$ {{ (+currency.priceUsd).toFixed(2) }}</td>
          <td class="text-start align-middle">
            <span :class="getFormatCurrency(+currency.changePercent24Hr)">{{ (+currency.changePercent24Hr).toFixed(2) }}%</span>
          </td>
          <td class="align-middle">
            <button type="button" class="currency-table__btn btn btn-success px-3" @click="openModal(currency.id)">Buy</button>
          </td>
        </tr>
      </template>
    </tbody>
  </table>
</template>

<style lang="scss" scoped>
.currency-table {
  background-color: $white;
  box-shadow: rgba(0, 0, 0, 0.08) 0px 4px 12px;
  border-radius: 10px;
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
  color: $darkGrey;
}

.currency-table__btn {
  //
}
</style>
