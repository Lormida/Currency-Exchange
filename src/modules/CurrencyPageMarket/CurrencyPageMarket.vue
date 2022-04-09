<script setup lang="ts">
import FooterMenu from '@/modules/UI/FooterMenu.vue'
import CurrencyPageMarketHeader from '@/modules/CurrencyPageMarket/_components/CurrencyPageMarketHeader.vue'

import { useCurrencyPageMarketBody } from './hooks/useCurrencyPageMarketBody'

const { menu } = useCurrencyPageMarketBody()
</script>

<template>
  <div class="market">
    <CurrencyPageMarketHeader />
    <FooterMenu :menu="menu"></FooterMenu>
  </div>
</template>

<style lang="scss" scoped>
.market {
  padding: 6px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  display: flex;
  flex-direction: column;
  background-color: $marketFooterBg;
}
</style>
