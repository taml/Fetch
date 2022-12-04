import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import { library } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
import { faPaw, faBars } from "@fortawesome/free-solid-svg-icons"
library.add(
    faPaw, faBars
)

import './assets/main.css'

const pinia = createPinia()
const app = createApp(App)

app.use(router)
app.use(pinia)
app.component("font-awesome-icon", FontAwesomeIcon)
app.mount('#app')
