<script setup lang="ts">
import SpinnerLoader from '@/components/UI/SpinnerLoader.vue'

import { defineAsyncComponent } from 'vue'

import { getDataCurrency } from '@/helpers/getDataCurrency'
import { getIsLoading } from '@/helpers/getIsLoading'
import ApiService from '@/utils/ApiService'


const CurrencyPageContent = defineAsyncComponent(() => {
  return new Promise((resolve) => {
    import(/* webpackChunkName: 'CurrencyPageContent' */ '@/components/CurrencyPage/CurrencyPageContent.vue').then((component: any) => {
      setTimeout(() => {
        resolve(component)
      }, 300)
    })
  })
})

interface Props {
  id: string
}
const props = defineProps<Props>()

ApiService.loadCurrentCurrency(props.id).then(() => {
  ApiService.setLoading(false)
})
</script>

<template>
  <div class="container-currency">
    <div v-if="!getIsLoading && Object.keys(getDataCurrency).length > 0" class="container currency">
      <!-- Currency Header -->
      <Suspense>
        <template #default>
          <!-- Currency Content -->
          <CurrencyPageContent :id="id"></CurrencyPageContent>
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
.container-currency {
  position: fixed;
  top: 0;
  left: 0;
  background: linear-gradient(to right, $leftGradientCurrencyPage, $rightGradientCurrencyPage);
  min-height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.container {
  width: 80%;
  padding-bottom: 10px;
}
.currency {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;

  // .currency__main

  &__main {
    height: auto;
    min-height: 690px;
  }

  // .currency__card

  &__card {
    box-shadow: rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;
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
</style>
