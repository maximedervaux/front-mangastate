import { createWebHistory, createRouter } from 'vue-router'

import Home from '../views/Home.vue'
import AjouteManga from '../views/AjouteManga.vue'
import Manga from '../views/Manga.vue'
import SignIn from '../views/SignIn.vue'
const routes = [
  { path: '/', component: Home },
  { path: '/add', component: AjouteManga },
  { path:'/manga/:id_manga' , name:"Manga" ,component: Manga},
  { path:'/signin' , name:"SignIn" ,component: SignIn}
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router