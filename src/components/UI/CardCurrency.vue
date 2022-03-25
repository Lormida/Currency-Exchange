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
          ${{ ((+marketCapUsd) / 1e9).toFixed(2) }} Milliards
        </p>
        <p class="card__text card-text my-1">
          <span class="card__small-title">Change for 24h :</span>
          <span
            :class="getFormatCurrency(changePercent24Hr)"
          >{{ (+changePercent24Hr).toFixed(2) }}%</span>
        </p>
      </div>

      <div class="card__footer">
        <button
          type="button"
          class="card__btn-buy btn mx-auto my-2 px-4 btn-sm btn-outline-success"
          @click="openModal(id)"
        >Buy</button>
      </div>
    </div>
  </div>
</template>
<script lang='ts'>

import { defineComponent, onMounted, ref } from 'vue';
import ModalService from '@/utils/ModalService'
import {getFormatCurrency} from '@/hooks/getFormatCurrency'

export default defineComponent({
  props: ['name', 'changePercent24Hr', 'priceUsd', 'marketCapUsd', 'id', 'index'],
  setup(props) {

    const openModal = (currentModalIndicator: string) => {
      ModalService.changeCurrentModalIndicator(currentModalIndicator)
      ModalService.changeModalState(true)
    }

    return {
      name: props.name,
      changePercent24Hr: props.changePercent24Hr,
      priceUsd: props.priceUsd,
      marketCapUsd: props.marketCapUsd,
      id: props.id,
      index: props.index,
      openModal,
      getFormatCurrency
    }
  }
})
</script>
<style lang='scss' scoped>
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
.card--currency-fall {
  color: red;
}
.card-table--currency-growth {
  color: green;
  &::before {
    content: "+";
  }
}
</style>