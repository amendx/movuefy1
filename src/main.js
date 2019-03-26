import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App'
import * as firebase from 'firebase'
import router from './router'

Vue.use(Vuetify)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App),
  created () {
    firebase.initializeApp({
      apiKey: 'AIzaSyB3weT8-fIiJGrOda26HiLI_2LxgapT4aE',
      authDomain: 'movues-2bdc6.firebaseapp.com',
      databaseURL: 'https://movues-2bdc6.firebaseio.com',
      projectId: 'movues-2bdc6',
      storageBucket: 'movues-2bdc6.appspot.com'
    })
  }
})
