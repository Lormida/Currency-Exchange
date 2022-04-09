import { computed } from 'vue'
import { BagModule } from '@/store/modules/bag/index'

const getActualBagData = computed(() => BagModule.getActualBagData)

export { getActualBagData }
