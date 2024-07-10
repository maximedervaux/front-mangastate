import { createMemoryHistory, createRouter } from 'vue-router'

import Home from '../views/Home.vue'
import AjouteManga from '../views/AjouteManga.vue'
import Manga from '../components/Manga/Manga.vue'
const routes = [
  { path: '/', component: Home },
  { path: '/add', component: AjouteManga },
  { path:'/manga/:id' , name:"Manga" ,component: Manga}
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router