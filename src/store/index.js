import Vue  from "vue";
import Vuex from 'vuex';
import { RepositoryAbstractFactory} from './../services/RepositoryAbstractFactory'
import * as firebase from 'firebase'
const MoviesRepository = RepositoryAbstractFactory.get('movies')


Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        //loadedMeetups
        userFavorites: [
            {
                title: "titanic", vote_count: 3232
            },
            {
                title: "zorarc", vote_count: 200
            },
            {
                title: "amanda", vote_count: 3200
            }
            
        ],
        loadedMovies: [
            {
                title: "titanic", vote_count: 3232, id: 1, release_date: '1995-05-09'
            },
            {
                title: "zorarc", vote_count: 200, id: 2,release_date: '2019-10-27'
            },
            {
                title: "amanda", vote_count: 3200,id: 3, release_date: '2002-11-04'
            }
        ],
        fetchedMovies: [],
        user: {
            id:'34234',
            favoritedMovies: ['sidjasi']
        }
    },
    mutations: {
        FETCH_MOVIES(state, fetchedMovies){
            state.fetchedMovies = fetchedMovies
        },
        setUser(state, payload){
            state.user = payload
        }
    },
    actions: {
       async fetchMovies({commit}){
           const data = await MoviesRepository.getPopularMovies().data;
            commit('FETCH_MOVIES', data)
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
            }
    }, 
    getters:{
        loadedMovies(state){
            return state.loadedMovies.sort((movA, movB) =>{
                return movA.release_date > movB.release_date
            })
        }, 
        loadedMovie(state){
            return (movieId) => {
                return state.loadedMovies.find((movie)=>{
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
        featuredMovies(state, getters){
            return getters.movies.slice(0,5);
        }
    }
})