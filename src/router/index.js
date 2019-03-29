import Vue from "vue";
import Router from "vue-router";
import Home from "@/components/Home";
import Movies from "@/components/Movies/Movies";
import Favorites from "@/components/Movies/Favorites";
import MovieCard from "@/components/core/MovieCard";
import MovieDetails from "@/components/Movies/MovieDetails";
import SaveFavorite from "@/components/Movies/SaveFavorite";
import Profile from "@/components/User/Profile";
import Signup from "@/components/User/Signup";
import Signin from "@/components/User/Signin";
import AuthGuard from "./auth-guard";
Vue.use(Router);

export default new Router({
  routes: [
    { path: "", redirectTo: "/dashboard", pathMatch: "full" },
    {
      path: "/dashboard",
      name: "Home",
      component: Home
    },
    {
      path: "/movies",
      name: "Movies",
      component: Movies
    },
    {
      path: "/movies/:id",
      name: "MovieDetails",
      component: MovieDetails,
      beforeEnter: AuthGuard
    },
    {
      path: "/favorites",
      name: "Favorites",
      component: Favorites,
      beforeEnter: AuthGuard
    },
    {
      path: "/favorites/:id",
      name: "MovieCard",
      props: true,
      component: MovieCard,
      beforeEnter: AuthGuard
    },
    {
      path: "/profile",
      name: "Profile",
      component: Profile,
      beforeEnter: AuthGuard
    },
    {
      path: "/saveFavorite",
      name: "SaveFavorite",
      component: SaveFavorite,
      beforeEnter: AuthGuard
    },
    {
      path: "/signin",
      name: "Sign In",
      component: Signin
    },
    {
      path: "/signup",
      name: "Sign Up",
      component: Signup
    }
  ],
  mode: "history"
});
