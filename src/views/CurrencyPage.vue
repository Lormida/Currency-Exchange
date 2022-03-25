<script setup lang='ts'>
import { computed } from 'vue';
import TheChart from '@/components/CurrencyPage/TheChart.vue'
import CurrencyPageMarketStats from '@/components/CurrencyPage/CurrencyPageMarketStats.vue'
import ApiService from '@/utils/ApiService'
import { useStore } from '@/store'
import { defineProps } from 'vue';
import { getFormatCurrency } from '@/hooks/getFormatCurrency';
import { openModal } from '@/hooks/openModal';

interface Props {
  id: string
}
const props = defineProps<Props>()

const store = useStore()

const getIsLoading = computed(() => store.getters.getIsLoading)
const getDataCurrency = computed(() => store.getters.getCurrentCurrency)

const getRelativeSupply = computed(() => {
  if (getDataCurrency.value.maxSupply == null) return null
  const divide = Number(((+getDataCurrency.value.supply) / (+getDataCurrency.value.maxSupply)).toFixed(2))
  return `${divide * 100}% of total supply`
})


ApiService.loadCurrentCurrency(props.id)
  .then(() => {
    ApiService.setLoading(false)
  })


</script>

<template>
  <div class="container-currency">
    <div v-if="!getIsLoading && Object.keys(getDataCurrency).length > 0" class="container currency">
      <!-- Currency Header -->
      <header class="currency__header">
        <div class="currency__title-wrapper">
          <span class="currency__title-name">{{ getDataCurrency.name }}</span>
          <span class="currency__title-currency">{{ getDataCurrency.symbol }}</span>
        </div>

        <div
          class="currency__title-wrapper currency__buy-wrapper"
          @click="openModal(getDataCurrency.name)"
        >
          <span class="currency__title-name currency__buy-text">Buy</span>
        </div>
      </header>

      <!-- Currency Main -->
      <main class="currency__main">
        <div class="card currency__card">
          <div class="card__header chart">
            <header class="chart__header">
              <span class="chart__currency-short">$</span>
              <span class="chart__currency-price">{{ (+getDataCurrency.priceUsd).toFixed(2) }}</span>
              <span
                :class="getFormatCurrency(+getDataCurrency.changePercent24Hr)"
                class="chart__currency-price-change"
              >{{ (+getDataCurrency.changePercent24Hr).toFixed(2) }}%</span>
            </header>

            <main class="chart__content">
              <!-- Chart -->
              <TheChart :currency="id"></TheChart>
            </main>
          </div>

          <!-- Market Stats -->
          <CurrencyPageMarketStats
            :getDataCurrency="getDataCurrency"
            :getRelativeSupply="getRelativeSupply"
          ></CurrencyPageMarketStats>
        </div>
      </main>
    </div>
    <SpinnerLoader v-else></SpinnerLoader>
  </div>
</template>

<style lang='scss' scoped>
.container-currency {
  position: fixed;
  top: 0;
  left: 0;
  background: linear-gradient(to right, #d7dde8, #757f9a);
  height: 100%;
  width: 100%;
}
.container {
  width: 80%;
  padding-bottom: 10px;
}
.currency {
  height: 100%;
  // .currency__header

  &__header {
    display: flex;
    justify-content: space-between;
    padding: 5px 0;
    height: 11%;
  }

  // .currency__title-wrapper

  &__title-wrapper {
    display: flex;
    box-shadow: rgba(0, 0, 0, 0.09) 0px 3px 12px;
    border-radius: 5px;
    width: fit-content;
    justify-content: space-between;
    background-color: rgba(255, 255, 255, 0.8);
    padding: 10px;
    margin-bottom: 10px;
    transition: all 0.3s ease;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 3px 0px;
    &:hover {
      color: rgba(255, 255, 255, 0.8);
      background-color: #222;
    }
  }

  // .currency__title-name

  &__title-name {
    font-size: 32px;
    font-weight: bold;
    margin-right: 30px;
  }

  // .currency__title-currency

  &__title-currency {
  }

  // .currency__buy-wrapper

  &__buy-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 80px;
    transition: all 0.3s ease;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 3px 0px;
    background-color: rgba(82, 221, 156, 0.9);
    &:hover {
      cursor: pointer;
      color: rgba(82, 221, 156, 0.9);
      background-color: #222;
    }
  }

  // .currency__buy-text

  &__buy-text {
    text-align: center;
  }

  // .currency__main

  &__main {
    height: 89%;
    // height: 672px;
    // height: 86%;
  }

  // .currency__card

  &__card {
    box-shadow: rgba(14, 30, 37, 0.12) 0px 2px 4px 0px,
      rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;
    height: 100%;
  }

  // .currency__body

  &__body {
  }
}
.card {
  // .card__header

  &__header {
  }
}

.chart {
  height: 70%;
  display: flex;
  flex-direction: column;
  background-color: #f7f9fd;

  // .chart__header

  &__header {
    position: relative;
    width: fit-content;
    height: auto;
    padding: 1% 0 1% 5%;
  }

  // .chart__currency-short

  &__currency-short {
    font-size: 32px;
  }

  // .chart__currency-price

  &__currency-price {
    font-size: 48px;
  }

  // .chart__currency-price-change

  &__currency-price-change {
    position: absolute;
    top: 0;
    right: 0;
    font-size: 18px;
    transform: translateX(100%);
  }

  // .chart__content

  &__content {
    flex-grow: 1;
  }
}
</style>