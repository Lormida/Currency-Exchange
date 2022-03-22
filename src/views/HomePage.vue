onMounted, <template>
  <header class="header mw-100 p-0 m-0 container-fluid">
    <div class="row mx-auto">
      <Navbar @open-modal-window="openModal"></Navbar>
    </div>
  </header>
  <main v-if="!isLoading" class="main container">
    <div class="row mx-auto">
      <TableCurrencies
        :limit="limit"
        :currentPage="currentPage"
        :currencies="getCurrencies"
        @open-modal-window="openModal"
      ></TableCurrencies>
    </div>
  </main>

  <Pagination
    :currentPage="getCurrentPage"
    :totalPage="totalPage"
    @change-current-page="setNewPage"
  ></Pagination>

  <!-- Modal buy-->
  <ModalWrapper
    v-if="isModalOpen"
    :modalIndicator="getCurrentModalIndicator"
    @close-modal-window="toggleModal"
  ></ModalWrapper>
</template>

<script lang='ts'>
import axios from 'axios'
import TableCurrencies from '@/components/HomePage/TableCurrencies.vue'
import Navbar from '@/components/HomePage/Navbar.vue'
import ModalWrapper from '@/components/UI/ModalWrapper.vue';
import Pagination from '@/components/HomePage/Pagination.vue';
import { computed, defineComponent, onMounted, ref } from 'vue';
export default defineComponent({
  components: { TableCurrencies, Navbar, ModalWrapper, Pagination },
  setup() {
    let isModalOpen = ref(false)

    const limit = 6
    const baseURL = 'https://api.coincap.io/v2/assets'
    let currentPage = ref(1)
    let currentModalIndicator = ref(null)
    const totalPage = Math.ceil(100 / limit)

    const openModal = (id: any) => {
      currentModalIndicator.value = id
      isModalOpen.value = true
    }

    const toggleModal = (state: boolean) => {
      isModalOpen.value = state;
    }

    const getCurrentPage = computed(() => {
      return currentPage.value
    })

    const setNewPage = async (pageNumber: number) => {
      currentPage.value = pageNumber
      await fetchData(currentPage, limit)
    }
    let currencies = ref();
    let isLoading = ref(true);

    const fetchData = async (currentPage: any, limit: number) => {
      currencies.value = (await axios.get(baseURL, { params: { offset: (currentPage.value - 1) * limit, limit } })).data
      isLoading.value = false
    }

    const getCurrencies = computed(() => {
      return currencies.value
    })

    onMounted(async () => {
      //! Temporary crutch
      await fetchData(currentPage, limit)
    })

    const getCurrentModalIndicator = computed(() => {
      return currentModalIndicator.value
    })

    return {
      isModalOpen, toggleModal, openModal, currentModalIndicator, getCurrentModalIndicator,
      limit, currentPage, totalPage, setNewPage, getCurrentPage, isLoading, currencies, fetchData, getCurrencies
    }
  }
})
</script>
<style lang='scss' scoped>
.header {
}
</style>