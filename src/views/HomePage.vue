 <template>
  <div class="home-container d-flex flex-column">
    <header class="header mw-100 p-0 m-0 container-fluid">
      <Navbar></Navbar>
    </header>

    <main class="main">
      <TableCurrencies
        v-if="!getIsLoading && Object.keys(getCurrencies).length > 0"
        :limit="limit"
        :currentPage="currentPage"
        :currencies="getCurrencies"
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
  </div>
</template>

<script lang='ts'>
import ApiService from '@/utils/ApiService'
import { useStore } from '@/store'
import TableCurrencies from '@/components/HomePage/TableCurrencies.vue'
import Navbar from '@/components/HomePage/Navbar.vue'
import Pagination from '@/components/HomePage/Pagination.vue';
import { computed, defineComponent, onMounted, Ref, ref } from 'vue';
import SpinnerLoader from '../components/UI/SpinnerLoader.vue';

export default defineComponent({
  components: { TableCurrencies, Navbar, Pagination, SpinnerLoader },
  setup() {

    //* Initialization
    const store = useStore()
    const limit = 7
    const currentPage = ref(1)
    const totalPage = Math.ceil(100 / limit)


    const setNewPage = async (pageNumber: number) => {
      currentPage.value = pageNumber
      await fetchData(currentPage, limit)
    }

    const fetchData = async (currentPage: Ref<number>, limit: number) => {
      ApiService.setLoading(true)

      ApiService.getAllCurrencies({ currentPage: currentPage.value, limit })
        .then(() => {
          ApiService.setLoading(false)
        })
    }

    const getCurrentPage = computed(() => currentPage.value)
    const getCurrencies = computed(() => store.getters.getCurrencies)
    const getIsLoading = computed(() => store.getters.getIsLoading)


    onMounted(async () => {
      await fetchData(currentPage, limit)
    })


    return {
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
  position: relative;
  height: 58%;
  background-color: rgba(22, 22, 22, 0.85);
  display: flex;
  justify-content: center;
  align-items: center;
}
.footer {
  height: 9%;
}
</style>