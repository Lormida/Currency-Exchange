<template>
  <main class="container">
    <div class="row mx-auto">
      <TableCurrencies></TableCurrencies>
    </div>
  </main>
</template>

<script lang='ts'>
import TableCurrencies from '../components/HomePage/TableCurrencies.vue'
import { defineComponent } from 'vue';
export default defineComponent({
  components: { TableCurrencies },
  setup() {

  }
})
</script>
<style lang='scss' scoped>
.container {

}
</style>