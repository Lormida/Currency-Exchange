<script setup lang="ts">
import Tooltip from '@/modules/UI/Tooltip.vue'
import BagLink from '@/modules/Bag/_components/BagLink.vue'
import BagLabel from '@/modules/Bag/_components/BagLabel.vue'

import { getFormatCurrency } from '@/helpers/getFormatCurrency'
import { openModal } from '@/helpers/openModal'

import { getActualBagData } from './hooks/getActualBagData'
import { useBag } from './hooks/useBag'

const { loadBagLocal, updateInfoBag } = useBag()

//* loading bag from LocalStorage
loadBagLocal()

//* Update info about bag
updateInfoBag()

//* Interval updating bag data
setInterval(() => {
  updateInfoBag()
}, 30000)
</script>

<template>
  <div class="nav__bag d-flex p-0 align-items-center col-3">
    <BagLink @click="openModal('bag')" />

    <Tooltip classTrigger="bag-link" bottom="0" right="-50px">
      <p class="m-0">Before: ${{ getActualBagData.oldBagValue }}</p>
      <p class="m-0">
        Today : ${{ getActualBagData.actualBagValue }}
        <span :class="getFormatCurrency(+getActualBagData.profitPercent)">({{ getActualBagData.profitPercent }}%)</span>
      </p>
    </Tooltip>

    <BagLabel :getActualBagData="getActualBagData" />
  </div>
</template>

<style lang="scss" scoped>
.nav__bag {
  box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
  position: relative;
  background-color: rgba(79, 34, 88, 0.3);
  padding: 10px;

  @media (max-width: $tablet) {
    flex-direction: column;
  }
}
</style>
