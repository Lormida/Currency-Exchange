<script setup lang="ts">
import { computed, ref } from 'vue'
import TheModalTableRow from '@/components/Modal/TheModalTableRow.vue'
import AbsentLabel from '@/components/UI/AbsentLabel.vue'
import Thead from '@/components/UI/Thead.vue'
import BagService from '@/utils/BagService'

const getBag = computed(() => BagService.getBag())

//* Loading bag from LocalStorage
BagService.loadBagLocal()

const titlesNames = ['Currency', 'Current price', 'Amount', 'Profit', 'Remove']
const titleClasses = ['col-2', 'col-2', 'col-2', 'col-2', 'col-1']
</script>

<template>
  <div class="bag">
    <div class="row mx-auto bg-white rounded shadow">
      <table v-if="getBag?.length" class="table bag__table table-striped table-hover">
        <Thead :titles="titlesNames" :classes="titleClasses">
          <template #first-column>
            <th class="col-1 align-middle" scope="col">#</th>
          </template>
        </Thead>

        <tbody>
          <TheModalTableRow v-for="(currency, index) of getBag" :key="currency.name" :index="index" :currency="currency"></TheModalTableRow>
        </tbody>
      </table>
      <AbsentLabel v-else>You have not yet any cryptocurrencies!</AbsentLabel>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.bag {
  background-color: $modalBagBg;
  padding: 10px 10px;
  border-radius: 10px;
  box-shadow: 0px 0px 13px 10px rgba(41, 61, 77, 0.2);
  min-height: 100px;
  max-height: 600px;
  overflow: auto;
}
</style>
