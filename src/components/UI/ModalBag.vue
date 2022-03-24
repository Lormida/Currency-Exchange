<template>
  <div class="bag">
    <div class="container">
      <div class="row mx-auto bg-white rounded shadow">
        <div class="table-responsive">
          <table class="table bag__table table-striped table-hover">
            <thead>
              <tr>
                <th scope="col" class="col-1">#</th>
                <th scope="col" class="col-2">Currency</th>
                <th scope="col" class="col-2">Current price</th>
                <th scope="col" class="col-2">Amount</th>
                <th scope="col" class="col-2">Profit</th>
                <th scope="col" class="col-1">Buy</th>
                <th scope="col" class="col-1">Remove</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(currency, index) of getBag" :key="currency.name">
                <th scope="row" class="col-1">{{ index + 1 }}</th>
                <td class="col-1">{{ currency.name }}</td>
                <td class="col-2">${{ currency.currentPriceUsd }}</td>
                <td class="col-2">{{ currency.amount }}</td>
                <td
                  class="col-2"
                >{{ (((currency.currentPriceUsd / currency.purchasePriceUsd) - 1) * 100).toFixed(2) }}%</td>
                <td class="col-1" @click="openModal(currency.name)">
                  <div class="bag__buy-more-btn mx-auto"></div>
                </td>
                <td class="col-1" @click="removeCurrency(currency.name)">
                  <div class="bag__trash-btn mx-auto"></div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang='ts'>
import { computed, defineComponent } from 'vue';
import BagService from '@/utils/BagService'
import ModalService from '@/utils/ModalService';
export default defineComponent({
  setup(props) {

    const getBag = computed(() => BagService.getBag())

    const removeCurrency = (currencyName: string) => BagService.deleteCurrencyFromBag(currencyName)

    const openModal = (currentModalIndicator: string) => {
      ModalService.changeCurrentModalIndicator(currentModalIndicator)
      ModalService.changeModalState(true)
    }

    return { getBag, openModal, removeCurrency }

  }
})
</script>
<style lang='scss' scoped>
.bag {
  background-color: rgba(31, 36, 33, 0.8);
  padding: 10px 10px;
  border-radius: 10px;
  box-shadow: 0px 0px 13px 10px rgba(41, 61, 77, 0.2);
  min-height: 100px;
  // .bag__table

  &__table {
    th,
    td {
      vertical-align: middle;
    }
  }

  // .bag__trash-btn

  &__trash-btn {
    width: 33px;
    height: 33px;
    background-color: #000;
    display: flex;
    justify-content: center;
    align-items: center;
    mask-image: url("@/assets/svg/trash.svg");
    background-color: rgba(0, 0, 0, 0.6);
    mask-size: contain;
    mask-position: center;
    transition: transform 0.3s ease;

    &:hover {
      cursor: pointer;
      transform: scale(1.3);
      background-color: rgba(0, 0, 0, 1);
    }
  }
  &__buy-more-btn {
    width: 33px;
    height: 33px;
    background-color: #000;
    display: flex;
    justify-content: center;
    align-items: center;
    mask-image: url("@/assets/svg/plus.svg");
    background-color: rgba(0, 0, 0, 0.6);
    mask-size: contain;
    mask-position: center;
    transition: transform 0.3s ease;

    &:hover {
      cursor: pointer;
      transform: scale(1.3);
      background-color: rgba(0, 0, 0, 1);
    }
  }
}
</style>