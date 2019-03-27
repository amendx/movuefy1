import Vue from "vue";
import Vuetify from "vuetify";
import App from "./App";
import {store} from "./store";
import router from "./router";
import * as firebase from 'firebase';


Vue.use(Vuetify);
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  store,
  render: h => h(App),
  created(){
    firebase.initializeApp({
      apiKey: `${process.env.VUE_APP_FIREBASE_API_KEY}`,
  authDomain: `${process.env.VUE_APP_FIREBASE_AUTH_DOMAIN}`,
  databaseURL: `${process.env.VUE_APP_FIREBASE_DB_URL}`,
  projectId: `${process.env.VUE_APP_FIREBASE_PROJECT_ID}`,
  storageBucket: `${process.env.VUE_APP_FIREBASE_STORAGE_BUCKET}`,
 
    })
  }
 
});
