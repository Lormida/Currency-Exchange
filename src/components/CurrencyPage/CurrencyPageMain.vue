<script setup lang="ts">
import CurrencyPageChart from '@/components/CurrencyPage/CurrencyPageChart.vue'
import CurrencyPageMarketStats from '@/components/CurrencyPage/CurrencyPageMarket/CurrencyPageMarketStats.vue'

const props = defineProps<{
  id: string
}>()
</script>

<template>
  <main class="currency__main">
    <div class="card currency__card">
      <!-- Chart component -->
      <CurrencyPageChart :id="id"></CurrencyPageChart>

      <!-- Market Stats -->
      <CurrencyPageMarketStats />
    </div>
  </main>
</template>

<style lang="scss" scoped>
.currency__card {
  // min-height: 500px;
  height: 100%;
  background-color: transparent;
  border: none;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
</style>
