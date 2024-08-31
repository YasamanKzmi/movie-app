import { createRouter, createWebHashHistory } from "vue-router";
import Movies from "../views/Movies.vue";
import MovieDetails from "../views/MovieDetails.vue";
import TVShows from "../views/TVShows.vue";
import TVShowDetails from "../views/TVShowDetails.vue";
import Watchlist from "../views/Watchlist.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: Movies,
  },
  {
    path: "/TVShows",
    name: "TVShows",
    component: TVShows,
  },

  {
    path: "/details/:id",
    name: "details",
    component: MovieDetails,
  },

  {
    path: "/tvshowdetails/:id",
    name: "tvshowdetails",
    component: TVShowDetails,
  },
  {
    path: "/watchlist",
    name: "watchlist",
    component: Watchlist,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
