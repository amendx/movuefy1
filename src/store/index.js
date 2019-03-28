import Vue from 'vue'
import Vuex from 'vuex'

import movies from './movies'
import user from './user'
import shared from './shared'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    movies: movies,
    user: user,
    shared: shared
  }
})
