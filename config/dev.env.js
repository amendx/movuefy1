var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  VUE_APP_MOVIEDB_API_KEY: '"533bf9a3f2e9acf633932e225a72339e"',
  VUE_APP_MOVIEDB_IMAGE_URL: '"https://image.tmdb.org/t/p/original"'
})


