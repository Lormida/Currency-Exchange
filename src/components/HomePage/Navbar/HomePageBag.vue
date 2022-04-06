<script setup lang="ts">
import { getFormatCurrency } from '@/hooks/getFormatCurrency'
import { openModal } from '@/hooks/openModal'
import { getActualBagData } from '@/hooks/getActualBagData'
import BagService from '@/utils/BagService'
import Tooltip from '@/components/UI/Tooltip.vue'
import HomePageBagLink from '@/components/HomePage/Navbar/HomePageBagLink.vue'
import HomePageBagLabel from '@/components/HomePage/Navbar/HomePageBagLabel.vue'

//* loading bag from LocalStorage
BagService.loadBagLocal()

//* Update info about bag
BagService.updateInfoBag(BagService.getActualCurrencyPrices, BagService.getBag())

//* Interval updating bag data
setInterval(() => {
  BagService.updateInfoBag(BagService.getActualCurrencyPrices, BagService.getBag())
}, 30000)
</script>

<template>
  <div class="nav__bag d-flex p-0 align-items-center col-3">
    <HomePageBagLink @click="openModal('bag')" />

    <Tooltip classTrigger="bag-link" bottom="0" right="-50px">
      <p class="m-0">Before: ${{ getActualBagData.oldBagValue }}</p>
      <p class="m-0">
        Today : ${{ getActualBagData.actualBagValue }}
        <span :class="getFormatCurrency(+getActualBagData.profitPercent)">({{ getActualBagData.profitPercent }}%)</span>
      </p>
    </Tooltip>

    <HomePageBagLabel />
  </div>
</template>

<style lang="scss" scoped>
.nav__bag {
  box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
  position: relative;
  background-color: rgba(79, 34, 88, 0.3);
}
</style>
