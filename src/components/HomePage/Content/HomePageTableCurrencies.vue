<script setup lang="ts">
import TableRowCurrency from '@/components/HomePage/Content/Table/TableRowCurrency.vue'
import Thead from '@/components/UI/Thead.vue'
import { computed } from 'vue'

import { Currency } from '@/utils/types'

interface Props {
  currencies: Currency[]
  currentPage: number
  limit: number
}
const props = defineProps<Props>()

const titlesNames = ['Name', 'Price', 'Change', 'Trade']

const getCurrencies = computed(() => props.currencies)
</script>

<template>
  <table class="currency-table container mx-auto table table-hover w-80 m-0">
    <Thead :titles="titlesNames">
      <template #first-column>
        <th class="lead text-center" scope="col">#</th>
      </template>
    </Thead>

    <tbody>
      <TableRowCurrency
        v-for="(currency, index) of getCurrencies"
        :key="currency.id"
        :currency="currency"
        :index="index"
        :limit="limit"
        :currentPage="currentPage"
      ></TableRowCurrency>
    </tbody>
  </table>
</template>

<style lang="scss" scoped>
.currency-table {
  background-color: $white;
  box-shadow: rgba(0, 0, 0, 0.08) 0px 4px 12px;
  height: auto;
  border-collapse: collapse;
}
</style>
