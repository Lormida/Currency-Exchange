<template>
  <nav class="nav" v-if="!isLoading">
    <!-- Cards -->
    <div class="nav__card-currency-wrapper row p-3 col-7">
      <CardCurrency
        v-for="(currency, index) of currencies.data"
        :key="currency.id"
        :name="currency.name"
        :changePercent24Hr="currency.changePercent24Hr"
        :marketCapUsd="currency.marketCapUsd"
        :priceUsd="currency.priceUsd"
        :id="currency.id"
        :index="index + 1"
      ></CardCurrency>
    </div>
    <!-- Bag currency -->
    <div class="nav__bag bag d-flex p-0 align-items-center col-3">
      <a href="#" class="nav__bag-link" @click="openModal('bag')">
        <img class="nav__bag-image" src="@/assets/svg/bag-fill.svg" alt="bag" />
      </a>
      <div class="bag__tooltip p-1 bag--hide-tooltip">
        Last purchase: $4000
        <br />Today : $8000
        <span style="color: #555b6e">(+100%)</span>
      </div>
      <div
        class="bag__label m-1 flex-grow-1 py-2 fs-5 text-center align-self-start mt-4 border border-dark border-2"
      >
        $8000
        <span style="color: #555b6e; border-bottom: 1px #222 solid;">(+100%)</span>
      </div>
    </div>
  </nav>
</template>
<script lang="ts">
import { onMounted, ref } from 'vue';
import axios from 'axios'
import ModalService from '@/utils/ModalService'
import { defineComponent } from 'vue';
import CardCurrency from '@/components/UI/CardCurrency.vue';
export default defineComponent({
  components: { CardCurrency },
  setup() {
    let currencies = ref()
    let isLoading = ref(true)

    onMounted(() => {

      axios.get('https://api.coincap.io/v2/assets?limit=3')
        .then(({ data }) => {
          currencies.value = data
          isLoading.value = false
        })
        .then(() => {
          const tooltip = document.querySelector('.bag__tooltip') as Element
          const tooltipParent = document.querySelector('.nav__bag-link') as Element
          tooltipParent.addEventListener('mouseenter', () => {
            tooltip.classList.remove('bag--hide-tooltip')
          })
          tooltipParent.addEventListener('mouseleave', () => {
            tooltip.classList.add('bag--hide-tooltip')
          })
        })
    })

    const openModal = (currentModalIndicator: string) => {
      ModalService.changeCurrentModalIndicator(currentModalIndicator)
      ModalService.changeModalState(true)
    }


    return { currencies, isLoading, openModal }
  }
})
</script>
<style lang='scss' scoped>
.nav {
  height: 100%;
  padding: 15px;
  display: flex;
  justify-content: space-evenly;

  background-color: #ffe5d9;
  // .nav__card-currency-wrapper

  &__card-currency-wrapper {
    border: 3px #222 dashed;
    background-color: #ece4db;
    height: 100%;
  }

  // .nav__bag

  &__bag {
    position: relative;
    border: 3px #222 dashed;
    background-color: #f8edeb;
  }

  // .nav__bag-link

  &__bag-link {
    height: 50%;
    width: 50%;
    transition: transform 0.3s ease;
    &:hover {
      transform: scale(1) rotateZ(15deg);
    }
  }

  // .nav__bag-image

  &__bag-image {
    height: 100%;
    width: 100%;
  }
}
.bag {
  // .bag__label

  &__label {
    box-shadow: rgba(0, 0, 0, 0.09) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px,
      rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px,
      rgba(0, 0, 0, 0.09) 0px 32px 16px;
    background-color: #f8edeb;
    border-radius: 10px;
  }
  &__tooltip {
    width: auto;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;
    position: absolute;
    right: 3%;
    padding: 2%;
    border-radius: 5px;
    background-color: #edf2fb;
    bottom: 20%;
  }
  &--hide-tooltip {
    visibility: hidden;
  }
}
</style>