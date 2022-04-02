<script setup lang="ts">
import { getFormatCurrency } from '@/hooks/getFormatCurrency'
import { openModal } from '@/hooks/openModal'
import { getDegreeCalc } from '@/hooks/getDegreeCalc'

interface Props {
  name: string
  changePercent24Hr: number
  priceUsd: number
  marketCapUsd: number
  id: string
  index: number
}
const props = defineProps<Props>()
</script>

<template>
  <div class="col-4 h-100">
    <div class="card">
      <div class="card__header card-header d-flex flex-column align-items-center">
        <h5 class="card__title card-title text-center">{{ name }}</h5>
        <span class="card__badge w-auto badge rounded-pill bg-success">Top {{ index }} currency</span>
      </div>

      <div class="card__main px-2">
        <p class="card__text card-text my-1">
          <span class="card__small-title">Price :</span>
          ${{ (+priceUsd).toFixed(2) }}
        </p>
        <p class="card__text card-text my-1">
          <span class="card__small-title">Market capital :</span>
          ${{ getDegreeCalc(marketCapUsd, 9) }} Milliards
        </p>
        <p class="card__text card-text my-1">
          <span class="card__small-title">Change for 24h :</span>
          <span :class="getFormatCurrency(changePercent24Hr)">{{ (+changePercent24Hr).toFixed(2) }}%</span>
        </p>
      </div>

      <div class="card__footer">
        <button type="button" class="card__btn-buy btn mx-auto my-2 px-4 btn-sm btn-outline-success" @click="openModal(id)">Buy</button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card {
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
  height: 100%;

  // .card__header
  &__header {
  }

  // .card__main

  &__main {
  }

  // .card__footer

  &_footer {
  }

  &__title {
  }

  // .card__badge

  &__badge {
  }

  // .card__text

  &__text {
    display: flex;
    justify-content: space-between;
    font-size: 11px;
  }
  // card__btn-buy
  &__btn-buy {
    display: block;
  }
  &__small-title {
    text-decoration: underline;
    // border: 1px #000 solid;
  }
}
</style>
