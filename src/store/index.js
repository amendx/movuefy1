import Vue from "vue";
import Vuex from "vuex";
import * as firebase from "firebase";
import { RepositoryAbstractFactory } from "./../services/RepositoryAbstractFactory";
const MoviesRepository = RepositoryAbstractFactory.get("movies");

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    fetchedMovies: [],
    user: null,
    currentPage: 1,
    loadedFavorites: [],
    loading: false,
    error: null,
    searchMovies: [],
    currentMovie: null
  },
  mutations: {
    fetchMovies(state, payload) {
      state.fetchedMovies = payload;
    },
    setUser(state, payload) {
      state.user = payload;
    },

    setLoading(state, payload) {
      state.loading = payload;
    },
    setError(state, payload) {
      state.error = payload;
    },
    clearError(state) {
      state.error = null;
    },
    setCurrentPage(state, payload) {
      state.currentPage = payload;
    },
    setSearchMovies(state, payload) {
      state.searchMovies = payload;
    },
    setCurrentMovie(state, payload) {
      state.currentMovie = payload;
    },
    setLoadedFavorites(state, payload) {
      state.loadedFavorites = payload;
    }
  },
  actions: {
    async fetchMovies({ commit }) {
      const { data } = await MoviesRepository.getPopularMovies();
      commit("fetchMovies", data.results);
    },
    async fetchMoviePage({ commit }, page) {
      const { data } = await MoviesRepository.getMovieByPage(page);
      commit("fetchMovies", data.results);
      commit("setCurrentPage", page);
    },
    async searchMovies({ commit }, query) {
      const { data } = await MoviesRepository.searchMovies(query);
      commit("setSearchMovies", data.results);
      return data.results;
    },
    async searchMovie({ commit }, id) {
      const { data } = await MoviesRepository.getMovie(id);
      commit("setCurrentMovie", data.results);
    },

    loadFavorites({ commit }) {
      commit("setLoading", true);
      firebase
        .database()
        .ref("favorites")
        .once("value")
        .then(data => {
          const favorites = [];
          const obj = data.val();
          for (let key in obj) {
            favorites.push({
              id: key,
              title: obj[key].title,
              description: obj[key].description,
              movieId: obj[key].movieId
            });
          }
          commit("setLoadedFavorites", favorites);
          commit("setLoading", false);
        })
        .catch(error => {
          console.log(error);
          commit("setLoading", false);
        });
    },

    saveFavorite({ commit }, payload) {
      const favorite = {
        title: payload.title,
        movieId: payload.movieId,
        description: payload.description
      };
      firebase
        .database()
        .ref("favorites")
        .push(favorite)
        .then(data => {
          const key = data.key;
          commit("saveFavorite", {
            ...favorite,
            id: key
          });
          console.log(data);
        })
        .catch(error => {
          console.log(error);
        });
    },

    signUserUp({ commit }, payload) {
      commit("setLoading", true);
      commit("clearError");
      firebase
        .auth()
        .createUserWithEmailAndPassword(payload.email, payload.password)
        .then(user => {
          commit("setLoading", false);
          const newUser = {
            id: user.uid,
            favoritedMovies: []
          };
          commit("setUser", newUser);
        })
        .catch(error => {
          commit("setLoading", false);
          commit("setError", error);
        });
    },
    signUserIn({ commit }, payload) {
      commit("setLoading", true);
      commit("clearError");
      firebase
        .auth()
        .signInWithEmailAndPassword(payload.email, payload.password)
        .then(user => {
          commit("setLoading", false);
          const newUser = {
            id: user.uid,
            favoritedMovies: []
          };
          commit("setUser", newUser);
        })
        .catch(error => {
          commit("setLoading", false);
          commit("setError", error);
        });
    },
    autoSignIn({ commit }, payload) {
      commit("setUser", { id: payload.uid, favoritedMovies: [] });
    },
    clearError({ commit }) {
      commit("clearError");
    }
  },
  getters: {
    loadedMovies(state) {
      return state.fetchedMovies.sort((movA, movB) => {
        return movA.release_date > movB.release_date;
      });
    },
    loadedMovie(state) {
      return movieId => {
        return state.fetchedMovies.find(movie => {
          return movie.id === movieId;
        });
      };
    },
    userFavorites(state) {
      return state.userFavorites.sort((favA, favB) => {
        return favA.vote_count > favB.vote_count;
      });
    },
    fetchedMovies(state, getters) {
      return getters.fetchedMovies.slice(0, 5);
    },
    user(state) {
      return state.user;
    },
    currentPage(state) {
      return state.currentPage;
    },
    currentMovie(state) {
      return state.currentMovie;
    },
    error(state) {
      return state.error;
    },
    loading(state) {
      return state.loading;
    },
    loadedFavorites(state) {
      return state.loadedFavorites;
    }
  }
});
