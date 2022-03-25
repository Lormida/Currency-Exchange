<template>
  <div class="card-body currency__body market">
    <header class="market__header">
      <h3 class="market__header-title">Market stats</h3>
    </header>

    <main class="market__body">
      <div class="market__cap-wrapper">
        <div class="market__cap-title title">Market Cap</div>
        <div
          class="market__cap-value value"
        >${{ ((+getDataCurrency.marketCapUsd) / 1e9).toFixed(3) }} Milliards</div>
      </div>

      <div class="market__volume-24h">
        <div class="market__volume-24h-title title">Volume (24h)</div>
        <div
          class="market__volume-24h-value value"
        >{{ ((+getDataCurrency.volumeUsd24Hr) / 1e9).toFixed(2) }} Milliards</div>
        <div
          :class="getFormatCurrency(+getDataCurrency.changePercent24Hr)"
          class="market__volume-24h-stats stats"
        >{{ (+getDataCurrency.changePercent24Hr).toFixed(2) }}%</div>
      </div>

      <div class="market__circulating-supply">
        <div class="market__circulating-supply-title title">Circulating supply</div>
        <div
          class="market__circulating-supply-value value"
        >{{ (+getDataCurrency.supply / 1e9).toFixed(2) }} Milliards {{ getDataCurrency.symbol }}</div>
        <div class="market__circulating-supply-stats stats">{{ getRelativeSupply }}</div>
      </div>

      <div class="market__typical-hold-time">
        <div class="market__typical-hold-time-title title">Average price (24h)</div>
        <div
          class="market__typical-hold-time-value value"
        >${{ (+getDataCurrency.vwap24Hr).toFixed(2) }}</div>
      </div>

      <div class="market__popularity">
        <div class="market__popularity-title title">Popularity</div>
        <div class="market__popularity-value value">{{ getDataCurrency.rank }}</div>
      </div>
    </main>
  </div>
</template>

<script lang='ts'>
import { getFormatCurrency } from '@/hooks/getFormatCurrency';
import { defineComponent } from 'vue';
export default defineComponent({
  props: ['getRelativeSupply', 'getDataCurrency'],
  setup(props) {

    return { getRelativeSupply: props.getRelativeSupply, getDataCurrency: props.getDataCurrency, getFormatCurrency }
  }
})
</script>
<style lang='scss' scoped>
.title {
  font-size: 16px;
  font-weight: bolder;
  color: #403d39;
  text-align: left;
  margin: 5px 0;
}
.value {
  font-size: 15px;
  margin: 5px 0;
}
.stats {
  font-size: 13px;
  opacity: 0.8;
  margin: 5px 0;
}
.card-body {
}
.market {
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  background-color: rgba(238, 226, 223, 0.5);

  // .market__header

  &__header {
  }
  // market__header-title
  &__header-title {
    font-size: 20px;
    width: fit-content;
    padding: 3px;
    font-weight: bold;
    border: 1px solid #000;
  }

  // .market__body

  &__body {
    border-radius: 10px;
    padding: 10px;
    border: 2px dashed #222;
    display: flex;
    justify-content: space-between;
    height: 100%;
  }

  // .market__cap-wrapper

  &__cap-wrapper {
    flex-basis: 18%;
  }

  // .market__cap-title

  &__cap-title {
  }

  // .market__cap-value

  &__cap-value {
  }

  // .market__volume-24h

  &__volume-24h {
    flex-basis: 18%;
  }

  // .market__volume-24h-title

  &__volume-24h-title {
  }

  // .market__volume-24h-value

  &__volume-24h-value {
  }

  // .market__volume-24h-stats

  &__volume-24h-stats {
  }

  // .market__circulating-supply

  &__circulating-supply {
    flex-basis: 18%;
  }

  // .market__circulating-supply-title

  &__circulating-supply-title {
  }

  // .market__circulating-supply-value

  &__circulating-supply-value {
  }

  // .market__circulating-supply-stats

  &__circulating-supply-stats {
  }

  // .market__typical-hold-time

  &__typical-hold-time {
    flex-basis: 18%;
  }

  // .market__typical-hold-time-title

  &__typical-hold-time-title {
  }

  // .market__typical-hold-time-value

  &__typical-hold-time-value {
  }

  // .market__popularity

  &__popularity {
    flex-basis: 18%;
  }

  // .market__popularity-title

  &__popularity-title {
  }

  // .market__popularity-value

  &__popularity-value {
  }
}
</style>