computed, <template>
  <header class="header mw-100 p-0 m-0 container-fluid">
    <div class="row mx-auto">
      <Navbar @open-currency-modal-window="openCurrencyModalWindow"></Navbar>
    </div>
  </header>
  <main class="main container">
    <div class="row mx-auto">
      <TableCurrencies @open-currency-modal-window="openCurrencyModalWindow"></TableCurrencies>
    </div>
  </main>

  <!-- Modal -->
  <ModalBuyCurrency
    v-if="isModalCurrencyOpen"
    :currency="currentCurrencyToBuy"
    @close-currency-window="toggleCurrencyWindow"
  ></ModalBuyCurrency>
</template>

<script lang='ts'>
import TableCurrencies from '../components/HomePage/TableCurrencies.vue'
import Navbar from '../components/HomePage/Navbar.vue'
import ModalBuyCurrency from '@/components/UI/ModalBuyCurrency.vue';
import { computed, defineComponent, ref } from 'vue';
export default defineComponent({
  components: { TableCurrencies, Navbar, ModalBuyCurrency },
  setup() {
    let isModalCurrencyOpen = ref(false)
    let currentCurrencyToBuy = ref(null)


    const openCurrencyModalWindow = (currencyId: any) => {
      currentCurrencyToBuy.value = currencyId
      isModalCurrencyOpen.value = true
    }

    const toggleCurrencyWindow = (state: boolean) => {
      isModalCurrencyOpen.value = state;
    }
    return { isModalCurrencyOpen, toggleCurrencyWindow, openCurrencyModalWindow, currentCurrencyToBuy }
  }
})
</script>
<style lang='scss' scoped>
.header {
}
</style>