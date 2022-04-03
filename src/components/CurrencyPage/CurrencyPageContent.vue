<script setup lang="ts">
import { defineAsyncComponent } from 'vue'

const props = defineProps<{
  id: string
}>()

const CurrencyPageHeader = defineAsyncComponent(
  () => import(/* webpackChunkName: 'CurrencyPageHeader' */ '@/components/CurrencyPage/CurrencyPageHeader.vue')
)

const CurrencyPageMain = defineAsyncComponent(
  () => import(/* webpackChunkName: 'CurrencyPageMain' */ '@/components/CurrencyPage/CurrencyPageMain.vue')
)
</script>

<template>
  <CurrencyPageHeader />
  <CurrencyPageMain :id="id" />
</template>

<style lang="scss" scoped></style>
