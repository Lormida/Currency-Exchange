<template>
  <header class="header mw-100 p-0 m-0 container-fluid">
    <div class="row mx-auto">
      <Navbar></Navbar>
    </div>
  </header>
  <main class="main container">
    <div class="row mx-auto">
      <TableCurrencies></TableCurrencies>
    </div>
  </main>
</template>

<script lang='ts'>
import TableCurrencies from '../components/HomePage/TableCurrencies.vue'
import Navbar from '../components/HomePage/Navbar.vue'
import { defineComponent } from 'vue';
export default defineComponent({
  components: { TableCurrencies, Navbar },
  setup() {

  }
})
</script>
<style lang='scss' scoped>
.header {
}
</style>