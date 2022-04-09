<script setup lang="ts">
import SpinnerLoader from '@/modules/UI/SpinnerLoader.vue'

import { defineAsyncComponent } from 'vue'

import { getDataCurrency } from '@/helpers/reactive-getters/getDataCurrency'
import { getIsLoading } from '@/helpers/reactive-getters/getIsLoading'
import ApiService from '@/services/ApiService'

const CurrencyDetailsContent = defineAsyncComponent(
    () => import(/* webpackChunkName: 'CurrencyDetailsContent' */ '@/modules/CurrencyDetailsContent/CurrencyDetailsContent.vue')
)

const props = defineProps<{
  id: string
}>()

ApiService.loadCurrentCurrency(props.id).then(() => {
  ApiService.setLoading(false)
})
</script>

<template>
  <div class="currency-page currency-page__container">

    <div class="currency-page__main" v-if="!getIsLoading && Object.keys(getDataCurrency).length > 0">
      <!-- <CurrencyPageHeader /> -->
      <Suspense>
        <template #default>
          <CurrencyDetailsContent :id="id" />
        </template>

        <template #fallback>
          <SpinnerLoader size="middle"></SpinnerLoader>
        </template>
      </Suspense>
      
    </div>
    <SpinnerLoader v-else></SpinnerLoader>
  </div>
</template>

<style lang="scss" scoped>
.currency-page {
  // .currency-page__container

  &__container {
    min-height: calc(100% - $headerHeight);
    max-height: calc(100% - $headerHeight);
    display: flex;
    flex-direction: column;
    overflow: auto;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
  }

  // .currency-page__main

  &__main {
    background-color: $homeMainBg;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: stretch;
    flex: 1 0 auto;
    width: 100%;
    padding: 15px;
  }
}
</style>
