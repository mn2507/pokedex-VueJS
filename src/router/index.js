import Vue from "vue";
import VueRouter from "vue-router";
import PokemonFavorite from "../components/pokemon/pokemon-favorite/PokemonFavorite.vue";
import Pokemon from "../components/pokemon/Pokemon.vue";
import NotFound from "../components/NotFound.vue";
Vue.use(VueRouter);

const routes = [
  { path: "/", name: "home", component: Pokemon },
  { path: "/home", name: "home", component: Pokemon },
  { path: "/favorite", name: "favorite-list", component: PokemonFavorite },
  {
    path: "/404",
    name: "not-found",
    component: NotFound,
  },
  {
    path: "/:catchAll(.*)",
    redirect: "/404",
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
