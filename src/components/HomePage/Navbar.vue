<template>
  <nav class="nav" v-if="!isLoading">
    <!-- Cards -->
    <div class="nav__card-currency-wrapper row p-3 col-7">
      <CardCurrency
        v-for="(currency, index) of currencies"
        :key="currency.id"
        :name="currency.name"
        :changePercent24Hr="currency.changePercent24Hr"
        :marketCapUsd="currency.marketCapUsd"
        :priceUsd="currency.priceUsd"
        :id="currency.id"
        :index="index + 1"
      ></CardCurrency>
    </div>
    <!-- Bag currency -->
    <div class="nav__bag bag d-flex p-0 align-items-center col-3">
      <a href="#" class="nav__bag-link" @click="openModal('bag')">
        <img class="nav__bag-image" src="@/assets/svg/bag-fill.svg" alt="bag" />
      </a>
      <div class="bag__tooltip p-1 bag--hide-tooltip">
        Before: ${{ actualBagData.oldBagValue }}
        <br />
        Today : ${{ actualBagData.actualBagValue }}
        <span
          style="color: #555b6e"
        >({{ actualBagData.profitPercent }}%)</span>
      </div>
      <div
        class="bag__label m-1 flex-grow-1 py-2 fs-5 text-center align-self-start mt-4 border border-dark border-2"
      >
        ${{ actualBagData.actualBagValue }}
        <span
          style="color: #555b6e; border-bottom: 1px #222 solid;"
        >({{ actualBagData.profitPercent }}%)</span>
      </div>
    </div>
  </nav>
</template>
<script lang="ts">
import { onMounted, reactive, ref } from 'vue';
import axios from 'axios'
import ModalService from '@/utils/ModalService'
import { defineComponent } from 'vue';
import CardCurrency from '@/components/UI/CardCurrency.vue';
import { Currency, PurchasedCurrency } from '@/store/state';
import ApiService from '@/utils/ApiService';
import BagService from '@/utils/BagService';
import { getActualCurrencyPrices } from '@/hooks/getActualCurrencyPrices'
export default defineComponent({
  components: { CardCurrency },
  setup() {
    let currencies = ref()
    let isLoading = ref(true)
    const actualBagData = reactive({
      oldBagValue: 0,
      actualBagValue: 0,
      profitPercent: 0,
      profitAbsolute: 0,
    })

    const calculateActualBagProfit = ({ ...actualBagData }: any, actualCurrencyPrices: Record<string, number>) => {

      actualBagData.oldBagValue = +BagService.getBag().reduce((acc: number, purchasedCurrency: PurchasedCurrency) => {
        return acc + purchasedCurrency.purchasePriceUsd * purchasedCurrency.amount
      }, 0).toFixed(2)

      actualBagData.actualBagValue = +BagService.getBag().reduce((acc: number, purchasedCurrency: PurchasedCurrency) => {
        return acc + actualCurrencyPrices[purchasedCurrency.name] * purchasedCurrency.amount
      }, 0).toFixed(2)

      actualBagData.profitPercent =
        +(((actualBagData.actualBagValue - actualBagData.oldBagValue) / actualBagData.oldBagValue) * 100).toFixed(2)

      actualBagData.profitAbsolute = +(actualBagData.actualBagValue - actualBagData.oldBagValue).toFixed(2)

      return actualBagData
    }
    const initTooltip = () => {
      const tooltip = document.querySelector('.bag__tooltip') as Element
      const tooltipParent = document.querySelector('.nav__bag-link') as Element
      tooltipParent.addEventListener('mouseenter', () => {
        tooltip.classList.remove('bag--hide-tooltip')
      })
      tooltipParent.addEventListener('mouseleave', () => {
        tooltip.classList.add('bag--hide-tooltip')
      })
    }
    const openModal = (currentModalIndicator: string) => {
      ModalService.changeCurrentModalIndicator(currentModalIndicator)
      ModalService.changeModalState(true)
    }
    const analyzeBag = () => {
      getActualCurrencyPrices(BagService.getBag())
        .then(actualCurrencyPrices => {
          const { oldBagValue, actualBagValue, profitPercent, profitAbsolute } = calculateActualBagProfit(actualBagData, actualCurrencyPrices)

          actualBagData.oldBagValue = oldBagValue
          actualBagData.actualBagValue = actualBagValue
          actualBagData.profitPercent = profitPercent
          actualBagData.profitAbsolute = profitAbsolute

        })
    }

    //* loading bag from LocalStorage
    BagService.loadBagLocal();

    //* Get info about bag
    analyzeBag()

    onMounted(() => {

      ApiService.getTop3Currencies()
        .then((data) => {
          currencies.value = data
          isLoading.value = false
        })
        .then(() => {
          initTooltip()
        })
    })



    return { currencies, isLoading, openModal, actualBagData }
  }
})
</script>
<style lang='scss' scoped>
.nav {
  height: 100%;
  padding: 15px;
  display: flex;
  justify-content: space-evenly;

  background-color: #ffe5d9;
  // .nav__card-currency-wrapper

  &__card-currency-wrapper {
    box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px,
      rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
    border: 3px #222 dashed;
    background-color: #ece4db;
    height: 100%;
  }

  // .nav__bag

  &__bag {
    box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px,
      rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
    position: relative;
    border: 3px #222 dashed;
    background-color: #f8edeb;
  }

  // .nav__bag-link

  &__bag-link {
    height: 50%;
    width: 50%;
    transition: transform 0.3s ease;
    &:hover {
      transform: scale(1) rotateZ(15deg);
    }
  }

  // .nav__bag-image

  &__bag-image {
    height: 100%;
    width: 100%;
  }
}
.bag {
  // .bag__label

  &__label {
    box-shadow: rgba(0, 0, 0, 0.09) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px,
      rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px,
      rgba(0, 0, 0, 0.09) 0px 32px 16px;
    background-color: #f8edeb;
    border-radius: 10px;
  }
  &__tooltip {
    width: auto;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;
    position: absolute;
    right: 3%;
    padding: 2%;
    border-radius: 5px;
    background-color: #edf2fb;
    bottom: 20%;
  }
  &--hide-tooltip {
    visibility: hidden;
  }
}
</style>