<script setup lang="ts">
import { onMounted } from 'vue'

import { getFormatCurrency } from '@/hooks/getFormatCurrency'
import { openModal } from '@/hooks/openModal'
import { getActualBagData } from '@/hooks/getActualBagData'
import BagService from '@/utils/BagService'

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

//* loading bag from LocalStorage
BagService.loadBagLocal()

//* Update info about bag
BagService.updateInfoBag(BagService.getActualCurrencyPrices, BagService.getBag())

//* Interval updating bag data
setInterval(() => {
  BagService.updateInfoBag(BagService.getActualCurrencyPrices, BagService.getBag())
}, 30000)

onMounted(() => {
  initTooltip()
})
</script>

<template>
  <div class="nav__bag bag d-flex p-0 align-items-center col-3">
    <a href="#" class="nav__bag-link" @click="openModal('bag')">
      <img class="nav__bag-image" src="@/assets/svg/bag-fill.svg" alt="bag" />
    </a>
    <div class="bag__tooltip p-1 bag--hide-tooltip">
      Before: ${{ getActualBagData.oldBagValue }}
      <br />
      Today : ${{ getActualBagData.actualBagValue }}
      <span :class="getFormatCurrency(+getActualBagData.profitPercent)">({{ getActualBagData.profitPercent }}%)</span>
    </div>

    
    <div class="bag__label m-1 flex-grow-1 p-1 text-center align-self-start mt-4 border border-dark border-2">
      <span class="h5" style="font-weight: bold; color: #2b2d42; text-shadow: 0 0 1px #10002b"
        >{{ getActualBagData.actualBagValue }} USD</span
      >
      <br />
      <span :class="getFormatCurrency(+getActualBagData.profitAbsolute)">{{ getActualBagData.profitAbsolute }}</span>
      USD
      <span style="border-bottom: 1px #222 solid" :class="getFormatCurrency(+getActualBagData.profitPercent)"
        >({{ getActualBagData.profitPercent }}%)</span
      >
    </div>
  </div>
</template>

<style lang="scss" scoped>
.nav {
  // .nav__bag

  &__bag {
    box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
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
    box-shadow: rgba(0, 0, 0, 0.09) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px,
      rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px;
    background-color: #f8edeb;
    border-radius: 10px;
    font-size: 14px;
  }

  // .bag__tooltip
  &__tooltip {
    width: auto;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;
    position: absolute;
    right: -10%;
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
