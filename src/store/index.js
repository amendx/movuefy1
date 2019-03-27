import Vue  from "vue";
import Vuex from 'vuex';
import { RepositoryAbstractFactory} from './../services/RepositoryAbstractFactory'
import * as firebase from 'firebase'
const MoviesRepository = RepositoryAbstractFactory.get('movies')


Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        fetchedMovies: [],
        user: {}
    },
    mutations: {
        fetchMovies(state, payload){
            state.fetchedMovies = payload
        },
        setUser(state, payload){
            state.user = payload
        }
    },
    actions: {
       async fetchMovies({commit}){
           const {data} = await MoviesRepository.getPopularMovies();
            commit('fetchMovies', data.results)
            },
            signUserUp({commit}, payload){
                    firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password).then((user) =>{
                        const newUser ={
                            id: user.uid, 
                            favoritedMovies: []
                        }
                        commit('setUser', newUser)
                    }).catch(
                        error => {
                            console.log(error)
                        }
                    )
            },
                    signUserIn ({commit}, payload) {
                        firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
                          .then(
                            user => {
                              const newUser = {
                                id: user.uid,
                                favoritedMovies: []
                              }
                              commit('setUser', newUser)
                            }
                          )
                          .catch(
                            error => {
                              console.log(error)
                            }
                          )
                      }
                    },
    getters:{
        loadedMovies(state){
            return state.fetchedMovies.sort((movA, movB) =>{
                return movA.release_date > movB.release_date
            })
        }, 
        loadedMovie(state){
            return (movieId) => {
                return state.fetchedMovies.find((movie)=>{
                    return movie.id === movieId
                })
            }
        },
        userFavorites(state){
            return state.userFavorites.sort((favA, favB) =>{
                return favA.vote_count > favB.vote_count
            })
        }, 
        userFavorite(state){
            return (movieId) => {
                return state.userFavorites.find((favorite)=>{
                    return favorite.id === movieId
                })
            }
        },
        fetchedMovies(state, getters){
            return getters.fetchedMovies.slice(0,5);
        }
    }
})