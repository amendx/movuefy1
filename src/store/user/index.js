import * as firebase from "firebase";

export default {
  state: {
    user: null,
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
    
    setUser(state, payload) {
      state.user = payload;
    },

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
   
  },
  getters: {
    user(state) {
      return state.user;
    },
  }
}
