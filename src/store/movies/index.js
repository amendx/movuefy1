import * as firebase from "firebase";
import { RepositoryAbstractFactory } from "../../services/RepositoryAbstractFactory";
const MoviesRepository = RepositoryAbstractFactory.get("movies");

export default {
  state: {
    loadedMovies: [],
    registeredFavorites: [],
    searchMovies: [],
    currentMovie: null
  },
  mutations: {
    loadMovies(state, payload) {
      state.loadedMovies = payload;
    },
    setCurrentMovie(state, payload) {
      state.currentMovie = payload;
    },
    setRegisteredFavorites(state, payload) {
      state.registeredFavorites = payload;
    }
  },
  actions: {
    async loadedMovies({ commit }) {
      const { data } = await MoviesRepository.getPopularMovies();
      commit("loadMovies", data.results);
    },
    async loadMoviePage({ commit }, page) {
      const { data } = await MoviesRepository.getMovieByPage(page);
      commit("loadMovies", data.results);
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

    loadFavorites({ commit, getters }) {
      commit("setLoading", true);
      firebase
        .database()
        .ref("/users/" + getters.user.id)
        .child("/favorites/")
        .once("value")
        .then(data => {
          const favorites = [];
          const obj = data.val();
          for (let key in obj) {
            favorites.push({
              id: obj[key].creatorId,
              movieId: obj[key].movieId
            });
          }
          commit("setRegisteredFavorites", favorites);
          commit("setLoading", false);
        })
        .catch(error => {
          commit("setError", error);
          commit("setLoading", false);
        });
    },

    saveFavorite({ commit, getters }, payload) {
      const favorite = {
        id: getters.user.id,
        movieId: payload.movieId
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
        })
        .catch(error => {
          commit("setError", error);
        });
    }
  },
  getters: {
    loadedMovies(state) {
      return state.loadedMovies.sort((movA, movB) => {
        return movA.release_date > movB.release_date;
      });
    },
    currentMovie(state) {
      return state.currentMovie;
    },
    loadedMovie(state) {
      return movieId => {
        return state.loadedMovies.find(movie => {
          return movie.id === movieId;
        });
      };
    },
    featuredMovies(state, getters) {
      return getters.loadedMovies.slice(0, 7);
    },
    registeredFavorites(state) {
      return state.registeredFavorites;
    }
  }
};
