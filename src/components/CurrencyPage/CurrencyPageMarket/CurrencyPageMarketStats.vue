<script setup lang="ts">
import CurrencyPageMarketBody from '@/components/CurrencyPage/CurrencyPageMarket/CurrencyPageMarketBody.vue'
import CurrencyPageMarketHeader from '@/components/CurrencyPage/CurrencyPageMarket/CurrencyPageMarketHeader.vue'

</script>

<template>
  <div class="market">
    <CurrencyPageMarketHeader />
    <CurrencyPageMarketBody/>
  </div>
</template>

<style lang="scss" scoped>
.market {
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  background-color: rgba(238, 226, 223, 0.5);
}
</style>
