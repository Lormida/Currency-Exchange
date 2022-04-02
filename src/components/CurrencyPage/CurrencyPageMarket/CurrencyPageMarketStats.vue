<script setup lang="ts">
import CurrencyPageMarketBody from '@/components/CurrencyPage/CurrencyPageMarket/CurrencyPageMarketBody.vue'
import CurrencyPageMarketHeader from '@/components/CurrencyPage/CurrencyPageMarket/CurrencyPageMarketHeader.vue'
</script>

<template>
  <div class="market">
    <CurrencyPageMarketHeader />
    <CurrencyPageMarketBody />
  </div>
</template>

<style lang="scss" scoped>
.market {
  padding: 6px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  background-color: $marketFooterBg;
}
</style>
