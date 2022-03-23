import { createApp } from 'vue'
import { useStore } from './store'
import router from './router'
import App from './App.vue'

import SpinnerLoader from '@/components/UI/SpinnerLoader.vue';

const components = [SpinnerLoader];
const store = useStore()
const app = createApp(App)


components.forEach(component => {
  app.component(component.name, component)
})

app
  .use(router)
  .use(store)
  .mount('#app')
