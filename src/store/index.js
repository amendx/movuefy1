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
    registeredFavorites: [],
    loadedMovie: {},
    loading: false,
    error: null,
    searchMovies: [],
    currentMovie: null
  },
  mutations: {
    registerUserForMovie(state, payload) {
      const id = payload.id
      if (state.user.registeredFavorites.findIndex(movie => movie.id === id) >= 0) {
        return
      }
      state.user.registeredFavorites.push(id)
      state.user.fbKeys[id] = payload.fbKey
    },
    unregisterUserFromMovie (state, payload) {
      const registeredFavorites = state.user.registeredFavorites
      registeredFavorites.splice(registeredFavorites.findIndex(movie => movie.id === payload), 1)
      Reflect.deleteProperty(state.user.fbKeys, payload)
    },
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
    setRegisteredFavorites(state, payload) {
      state.registeredFavorites = payload;
    }
  },
  actions: {
    registerUserForMovie ({commit, getters}, payload) {
      commit('setLoading', true)
      const user = getters.user
      firebase.database().ref('/users/' + user.id).child('/favorites/')
        .push(payload)
        .then(data => {
          commit('setLoading', false)
          commit('registerUserForMovie', {id: payload, fbKey: data.key})
        })
        .catch(error => {
          commit('setLoading', false)
        })
    },
    unregisterUserFromMovie({commit, getters}, payload) {
      commit('setLoading', true)
      const user = getters.user
      if (!user.fbKeys) {
        return
      }
      const fbKey = user.fbKeys[payload]
      firebase.database().ref('/users/' + user.id + '/favorites/').child(fbKey)
        .remove()
        .then(() => {
          commit('setLoading', false)
          commit('unregisterUserFromMovie', payload)
        })
        .catch(error => {
            commit('setError', error)          
            commit('setLoading', false)
        })
    },
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
              movieId: obj[key].movieId,
              creatorId: obj[key].creatorId
            });
          }
          commit("setRegisteredFavorites", favorites);
          commit("setLoading", false);
        })
        .catch(error => {
          commit('setError', error)   
          commit("setLoading", false);
        });
    },

    saveFavorite({ commit, getters }, payload) {
      const favorite = {
        title: payload.title,
        movieId: payload.movieId,
        description: payload.description,
        creatorId: getters.user.id
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
          commit('setError', error)          
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
            registeredFavorites: [],
            fbKeys: {}
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
            registeredFavorites: [],
            fbKeys: {}
          };
          commit("setUser", newUser);
        })
        .catch(error => {
          commit("setLoading", false);
          commit("setError", error);
        });
    },
    autoSignIn({ commit }, payload) {
      commit("setUser", { id: payload.uid, registeredFavorites: [], fbKeys:{} });
    },
    fetchUserData({commit, getters}){
      commit('setLoading', true)
      firebase.database().ref('/users/'+ getters.user.id + '/favorites').once('value').then((data) =>{
        const dataPairs  = data.val()
        let registeredFavorites = []
        let swappedPairs = {}
        for(let key in dataPairs){
          registeredFavorites.push(dataPairs[key])
          swappedPairs[dataPairs[key]] = key
        }
        
         const updatedUser = {
          id: getters.user.id, 
           registeredFavorites: registeredFavorites, 
           fbKeys: swappedPairs
        }
        commit('setLoading', false)
        commit('setUser', updatedUser)
      }).catch(error => {
        commit('setError', error)
        commit('setLoading', false)
      })
    },
    logout({ commit }) {
      firebase.auth().signOut();
      commit("setUser", null);
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
    registeredFavorite(state) {
      return userId => {
        return state.registeredFavorites.map(movies => {
          movies.userId === userId;
        });
      };
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
    registeredFavorites(state) {
      return state.registeredFavorites;
    }
  }
});
