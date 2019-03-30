var merge = require("webpack-merge");
var prodEnv = require("./prod.env");

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  VUE_APP_MOVIEDB_API_KEY: '"533bf9a3f2e9acf633932e225a72339e"',
  VUE_APP_MOVIEDB_IMAGE_URL: '"https://image.tmdb.org/t/p/original"',
  VUE_APP_FIREBASE_API_KEY: '"AIzaSyB3weT8-fIiJGrOda26HiLI_2LxgapT4aE"',
  VUE_APP_FIREBASE_AUTH_DOMAIN: '"movues-2bdc6.firebaseapp.com"',
  VUE_APP_FIREBASE_DB_URL: '"https://movues-2bdc6.firebaseio.com"',
  VUE_APP_FIREBASE_PROJECT_ID: '"movues-2bdc6"',
  VUE_APP_FIREBASE_STORAGE_BUCKET: '"movues-2bdc6.appspot.com"'
});
