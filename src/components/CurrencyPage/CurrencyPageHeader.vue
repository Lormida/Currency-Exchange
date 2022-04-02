<script setup lang="ts">
import { openModal } from '@/hooks/openModal'
import { getDataCurrency } from '@/hooks/getDataCurrency'
</script>

<template>
  <header class="currency__header">
    <div class="currency__title-wrapper">
      <span class="currency__title-name">{{ getDataCurrency.name }}</span>
      <span class="currency__title-currency">{{ getDataCurrency.symbol }}</span>
    </div>

    <div class="currency__title-wrapper currency__buy-wrapper" @click="openModal(getDataCurrency.id)">
      <span class="currency__title-name currency__buy-text">Buy</span>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.currency {
  // .currency__header

  &__header {
    display: flex;
    justify-content: space-between;
    padding: 5px 0;
    height: 11%;
  }

  // .currency__title-wrapper

  &__title-wrapper {
    display: flex;
    box-shadow: rgba(0, 0, 0, 0.09) 0px 3px 12px;
    border-radius: 5px;
    width: fit-content;
    justify-content: space-between;
    background-color: $white8;
    padding: 10px;
    margin-bottom: 10px;
    transition: all 0.3s ease;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 3px 0px;
    &:hover {
      color: $white8;
      background-color: $darkGrey;
    }
  }

  // .currency__title-name

  &__title-name {
    font-size: 32px;
    font-weight: bold;
    margin-right: 30px;
  }

  // .currency__title-currency

  &__title-currency {
  }

  // .currency__buy-wrapper

  &__buy-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 80px;
    transition: all 0.3s ease;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 3px 0px;
    background-color: $green8;
    &:hover {
      cursor: pointer;
      color: $green8;
      background-color: $darkGrey;
    }
  }

  // .currency__buy-text

  &__buy-text {
    text-align: center;
  }
}
</style>
