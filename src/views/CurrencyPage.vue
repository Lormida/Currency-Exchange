<script setup lang="ts">
import CurrencyPageHeader from '@/components/CurrencyPage/CurrencyPageHeader.vue'
import CurrencyPageMain from '@/components/CurrencyPage/CurrencyPageMain.vue'
import SpinnerLoader from '@/components/UI/SpinnerLoader.vue'

import { getDataCurrency } from '@/hooks/getDataCurrency'
import { getIsLoading } from '@/hooks/getIsLoading'

import ApiService from '@/utils/ApiService'

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
      <CurrencyPageHeader />

      <!-- Currency Main -->
      <CurrencyPageMain :id="id"></CurrencyPageMain>
    </div>
    <SpinnerLoader v-else></SpinnerLoader>
  </div>
</template>

<style lang="scss" scoped>
.container-currency {
  position: fixed;
  top: 0;
  left: 0;
  background: linear-gradient(to right, #d7dde8, #757f9a);
  height: 100%;
  width: 100%;
}
.container {
  width: 80%;
  padding-bottom: 10px;
}
.currency {
  height: 100%;

  // .currency__main

  &__main {
    height: 89%;
    // height: 86%;
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
