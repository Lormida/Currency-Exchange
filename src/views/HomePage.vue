 <template>
  <div class="home-container d-flex flex-column">
    <header class="header mw-100 p-0 m-0 container-fluid">
      <Navbar @open-modal-window="openModal"></Navbar>
    </header>

    <main class="main">
      <TableCurrencies
        v-if="!getIsLoading && Object.keys(getCurrencies).length > 0"
        :limit="limit"
        :currentPage="currentPage"
        :currencies="getCurrencies"
        @open-modal-window="openModal"
      ></TableCurrencies>
      <SpinnerLoader v-else></SpinnerLoader>
    </main>

    <footer class="footer">
      <Pagination
        :currentPage="getCurrentPage"
        :totalPage="totalPage"
        @change-current-page="setNewPage"
      ></Pagination>
    </footer>
    <!-- Modal buy-->
    <ModalWrapper
      v-if="isModalOpen"
      :modalIndicator="getCurrentModalIndicator"
      @close-modal-window="toggleModal"
    ></ModalWrapper>
  </div>
</template>

<script lang='ts'>
import ApiService from '@/utils/ApiService'
import { useStore } from '@/store'
import TableCurrencies from '@/components/HomePage/TableCurrencies.vue'
import Navbar from '@/components/HomePage/Navbar.vue'
import ModalWrapper from '@/components/UI/ModalWrapper.vue';
import Pagination from '@/components/HomePage/Pagination.vue';
import { computed, defineComponent, onMounted, ref } from 'vue';
import SpinnerLoader from '../components/UI/SpinnerLoader.vue';

export default defineComponent({
  components: { TableCurrencies, Navbar, ModalWrapper, Pagination, SpinnerLoader },
  setup() {

    const store = useStore()
    const isModalOpen = ref(false)
    const limit = 7
    const currentPage = ref(1)
    const currentModalIndicator = ref('')
    const totalPage = Math.ceil(100 / limit)

    const openModal = (id: string) => {
      currentModalIndicator.value = id
      isModalOpen.value = true
    }
    const toggleModal = (state: boolean) => {
      isModalOpen.value = state;
    }

    const setNewPage = async (pageNumber: number) => {
      currentPage.value = pageNumber
      await fetchData(currentPage, limit)
    }

    const fetchData = async (currentPage: any, limit: number) => {
      ApiService.setLoading(true)

      ApiService.getAllCurrencies({ currentPage: currentPage.value, limit })
        .then(() => {
          ApiService.setLoading(false)
        })
    }

    const getCurrentPage = computed(() => currentPage.value)
    const getCurrencies = computed(() => store.getters.getCurrencies)
    const getIsLoading = computed(() => store.getters.getIsLoading)
    const getCurrentModalIndicator = computed(() => currentModalIndicator.value)

    onMounted(async () => {
      await fetchData(currentPage, limit)
    })

    return {
      isModalOpen, toggleModal, openModal, currentModalIndicator, getCurrentModalIndicator,
      limit, currentPage, totalPage, setNewPage, getCurrentPage, getIsLoading, fetchData, getCurrencies
    }
  }
})
</script>
<style lang='scss' scoped>
.home-container {
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
}
.header {
  height: 33%;
}
.main {
  height: 58%;
  // background-color: rgba(156, 197, 161, 0.35);
  background-color: rgba(22, 22, 22, 0.85);
  display: flex;
  justify-content: center;
  align-items: center;
}
.footer {
  height: 9%;
}
</style>