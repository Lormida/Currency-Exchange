<script setup lang="ts">
import FooterMenu from '@/components/UI/FooterMenu.vue'

import { useCurrencyPageMarketBody } from '@/hooks/useCurrencyPageMarketBody'

const { menu } = useCurrencyPageMarketBody()
</script>

<template>
  <FooterMenu :menu="menu"></FooterMenu>
</template>

<style lang="scss" scoped></style>
