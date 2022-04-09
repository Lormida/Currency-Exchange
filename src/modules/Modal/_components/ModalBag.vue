<script setup lang="ts">
import ModalTableRow from '@/modules/Modal/_components/ModalTableRow.vue'
import AbsentLabel from '@/modules/UI/AbsentLabel.vue'
import Thead from '@/modules/UI/Thead.vue'

import { useModalBag } from '../hooks/useModalBag'

const { getBag, titlesNames, titleClasses, loadBagLocal } = useModalBag()

//* Loading bag from LocalStorage
loadBagLocal()
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
          <ModalTableRow v-for="(currency, index) of getBag" :key="currency.name" :index="index" :currency="currency"></ModalTableRow>
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
