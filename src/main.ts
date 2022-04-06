import { createApp } from 'vue'
import { useStore } from './store'
import router from './router'
import App from './App.vue'

const store = useStore()
const app = createApp(App)


app.use(router).use(store).mount('#app')
