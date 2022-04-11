<script setup lang="ts">
import Bag from '@/modules/Bag/Bag.vue'
import SpinnerLoader from '@/modules/UI/SpinnerLoader.vue'

import { useNavbar } from './hooks/useNavbar'
import { defineAsyncComponent, onMounted } from 'vue'

const CardCurrency = defineAsyncComponent(() => import('@/modules/UI/CardCurrency.vue'))

const { currencies, isLoading, getTop3Currencies } = useNavbar()

onMounted(() => {
  getTop3Currencies()
})
</script>

<template>
  <nav class="nav">
    <template v-if="!isLoading">
      <div class="nav__cards">
        <Suspense>
          <template #default>
            <CardCurrency
              class="card-currency"
              v-for="(currency, index) of currencies"
              :key="currency.id"
              :name="currency.name"
              :changePercent24Hr="+currency.changePercent24Hr"
              :marketCapUsd="+currency.marketCapUsd"
              :priceUsd="+currency.priceUsd"
              :id="currency.id"
              :index="index + 1"
            ></CardCurrency>
          </template>
          <template #fallback>
            <SpinnerLoader size="middle"></SpinnerLoader>
          </template>
        </Suspense>

        <Suspense>
          <template #default>
            <!-- Bag currency -->
            <Bag class="nav__bag" />
          </template>
          <template #fallback>
            <SpinnerLoader size="middle"></SpinnerLoader>
          </template>
        </Suspense>
      </div>
    </template>
    <SpinnerLoader v-else size="middle"></SpinnerLoader>
  </nav>
</template>

<style lang="scss" scoped>
.nav {
  padding: 5px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  background-color: lighten($creamy, 5%);
  position: sticky;
  top: 0;
  left: 0;
  z-index: 1;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;

  @media (max-width: $phone-md) {
    padding: 0;
  }
  // .nav__cards

  &__cards {
    display: flex;
    padding: 5px;
    width: 100%;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: space-evenly;
    gap: 1%;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    background-color: $navbarBg;
    @media (max-width: $tablet) {
    }
  }

  // .nav__bag

  &__bag {
    flex-basis: 24%;
    @media (max-width: $desktop-sm) {
      flex-basis: 40%;
    }

    @media (max-width: $phone-lg) {
      flex-basis: 49%;
    }
  }
}
.card-currency {
  margin: 5px 0;
  flex-basis: 24%;
  @media (max-width: $desktop-sm) {
    flex-basis: 40%;
  }
  @media (max-width: $phone-lg) {
    flex-basis: 49%;
  }
}
</style>
