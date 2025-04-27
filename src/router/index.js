import { createWebHistory, createRouter } from 'vue-router'
import { useAuthStore } from '../stores/authStore' 

import Home from '../views/Home.vue'
import AjouteManga from '../views/AjouteManga.vue'
import Manga from '../views/Manga.vue'
import SignIn from '../views/SignIn.vue'
import Signup from '../views/SignUp.vue'
import Liste from '../views/MangaList.vue'
import Dashboard from '../views/Dashboard.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/add', component: AjouteManga },
  { path:'/manga/:id_manga', name: "Manga", component: Manga },
  { path:'/connexion', name: "SignIn", component: SignIn },
  { path:'/inscription', name: "Signup", component: Signup },
  { path:'/search', name: "search", component: Liste },
  { 
    path: '/dashboard', 
    name: "dashboard", 
    component: Dashboard,
    meta: { requiresAuth: true } 
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  authStore.loadToken(); 

  if (to.meta.requiresAuth && (!authStore.isTokenValid() || !authStore.user)) {
    next('/connexion'); 
  } else {
    next();
  }
});

export default router
