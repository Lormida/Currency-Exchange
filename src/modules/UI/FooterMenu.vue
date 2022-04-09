<script setup lang="ts">
import { menuItem } from '@/services/types'
import { getFormatCurrency } from '@/helpers/getFormatCurrency'
import { getDataCurrency } from '@/helpers/reactive-getters/getDataCurrency'

const props = defineProps<{
  menu: Array<menuItem>
}>()
</script>

<template>
  <main class="market__menu">
    <div class="market__item" v-for="item of menu" :key="item.title">
      <div class="title">{{ item.title }}</div>
      <div class="value">{{ item.body }}</div>
      <div v-if="item.footerChangePercent" :class="getFormatCurrency(+getDataCurrency.changePercent24Hr)" class="stats">
        {{ item.footerChangePercent }}
      </div>
      <div v-if="item.footerLight" class="market__circulating-supply-stats stats">{{ item.footerLight }}</div>
    </div>
  </main>
</template>

<style lang="scss" scoped>
.title {
  font-size: 16px;
  font-weight: bolder;
  color: $lightGrey;
  text-align: left;
  margin: 5px 0;
}
.value {
  font-size: 15px;
  margin: 5px 0;
}
.stats {
  font-size: 13px;
  opacity: 0.8;
  margin: 5px 0;
}

.market {
  // .market__body

  &__menu {
    border-radius: 10px;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    height: 100%;
  }

  // .market__item

  &__item {
  }
}
</style>
