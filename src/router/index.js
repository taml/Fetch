import { createRouter, createWebHashHistory } from 'vue-router'
import MainView from '../views/MainView.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: MainView
    }, 
    { 
      path: "/:pathMatch(.*)", 
      name: "not-found", 
      component: MainView, 
    },
  ]
})

export default router
