import { createWebHistory, createRouter } from "vue-router";

import Home from "../views/Home.vue";
import AjouteManga from "../views/AjouteManga.vue";
import Manga from "../views/Manga.vue";
import SignIn from "../views/SignIn.vue";
import Liste from "../views/MangaList.vue";
import SingUp from "../views/SingUp.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/add", component: AjouteManga },
  { path: "/manga/:id_manga", name: "Manga", component: Manga },
  { path: "/connexion", name: "SignIn", component: SignIn },
  { path: "/search", name: "search", component: Liste },
  { path: "/inscription", name: "Inscription", component: SingUp },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
