<script setup lang="ts">
import TableCurrenciesRow from '@/modules/TableCurrencies/_components/TableCurrenciesRow.vue'
import Thead from '@/modules/UI/Thead.vue'

import { Currency } from '@/services/types'

import { useTableCurrencies } from './hooks/useTableCurrencies'

const props = defineProps<{
  currencies: Currency[]
  currentPage: number
  limit: number
}>()

const { titlesNames, getCurrencies } = useTableCurrencies(props)
</script>

<template>
  <table class="currency-table container mx-auto table table-hover w-80 m-0">
    <Thead :titles="titlesNames">
      <template #first-column>
        <th class="lead text-center" scope="col">#</th>
      </template>
    </Thead>

    <tbody>
      <TableCurrenciesRow
        v-for="(currency, index) of getCurrencies"
        :key="currency.id"
        :currency="currency"
        :index="index"
        :limit="limit"
        :currentPage="currentPage"
      ></TableCurrenciesRow>
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
