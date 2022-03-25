import { createApp } from 'vue'
import { useStore } from './store'
import router from './router'
import App from './App.vue'

import SpinnerLoader from '@/components/UI/SpinnerLoader.vue';

const store = useStore()
const app = createApp(App)


app.component('SpinnerLoader', SpinnerLoader)

app
  .use(router)
  .use(store)
  .mount('#app')
