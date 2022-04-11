<script setup lang="ts">
import { Currency } from '@/services/types'

import { openModal } from '@/helpers/openModal'
import { getFormatCurrency } from '@/helpers/getFormatCurrency'

const props = defineProps<{
  currentPage: number
  limit: number
  index: number
  currency: Currency
}>()
</script>

<template>
  <tr class="table-row">
    <th class="align-middle text-center" scope="row">{{ (currentPage - 1) * limit + index + 1 }}</th>
    <td class="align-middle">
      <router-link class="table-row__link-detail" :to="{ name: 'currency', params: { id: currency.id } }">
        {{ currency.name }}
        <span class="table-row__currency-symbol">{{ currency.symbol }}</span>
      </router-link>
    </td>
    <td class="align-middle">$ {{ (+currency.priceUsd).toFixed(2) }}</td>
    <td class="text-start align-middle">
      <span :class="getFormatCurrency(+currency.changePercent24Hr)">{{ (+currency.changePercent24Hr).toFixed(2) }}%</span>
    </td>
    <td class="align-middle">
      <button type="button" class="table-row__btn btn btn-success px-3" @click="openModal(currency.id)">Buy</button>
    </td>
  </tr>
</template>

<style lang="scss" scoped>
.table-row {
  @include adaptive-value('font-size', 18, 11);
  // .table-row__link-detail

  &__link-detail {
    text-decoration: none;
    color: $darkGrey;
  }

  // .table-row__currency-symbol

  &__currency-symbol {
    font-weight: 100;
  }

  // .table-row__btn

  &__btn {
    @include adaptive-value('font-size', 18, 11);
  }
}
</style>
