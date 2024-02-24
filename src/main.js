import './assets/main.css'

import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import Home from './components/pages/Home.vue'
import Favorites from './components/pages/Favorites.vue'

const app = createApp(App)

const routes = [
  {
    path: '/shoe-store/',
    name: 'Home',
    component: Home
  },
  {
    path: '/shoe-store/favorites',
    name: 'Favorites',
    component: Favorites
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

app.use(router)
app.use(autoAnimatePlugin)

app.mount('#app')
