import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Import and add Font Awesome icons
import { library } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
import { faPaw, faBars, faCaretDown, faChevronLeft, faChevronRight, faXmark, faBone } from "@fortawesome/free-solid-svg-icons"
library.add(
    faPaw, faBars, faCaretDown, faChevronLeft, faChevronRight, faXmark, faBone
)

import './assets/main.css'

// Create Pinia reference for local store
const pinia = createPinia()
const app = createApp(App)

app.use(router)
app.use(pinia)
app.component("font-awesome-icon", FontAwesomeIcon)
app.mount('#app')
