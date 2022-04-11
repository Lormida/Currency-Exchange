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
  @include adaptive-value('font-size', 15, 10);
  font-weight: bolder;
  color: $lightGrey;
  text-align: left;
  margin: 5px 0;
}
.value {
  margin: 5px 0;
  @include adaptive-value('font-size', 13, 10);
}
.stats {
  @include adaptive-value('font-size', 13, 10);
  opacity: 0.4;
  margin: 5px 0;
}

.market {
  // .market__body

  &__menu {
    border-radius: 10px;
    padding: 1px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    height: 100%;
  }

  // .market__item

  &__item {
    flex-basis: 20%;

    @media (max-width: $tablet) {
      flex-basis: 33%;
    }
  }
}
</style>
