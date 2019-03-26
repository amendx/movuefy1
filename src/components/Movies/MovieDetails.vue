<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card>
          <v-card-title>
            <h6 class="primary--text">MOVIE DETAILS {{$route.params.id}}</h6>
          </v-card-title>
         
          
         
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from 'axios'
export default {
async created() {
return this.currentMovie = (await axios.get(`https://api.themoviedb.org/3/movie/${this.$route.params.id}?api_key=533bf9a3f2e9acf633932e225a72339e&language=en-US`)).data.results
  }, watch: {
    '$route' (to, from){
return this.currentMovie = ( axios.get(`https://api.themoviedb.org/3/movie/${this.$route.params.id}?api_key=533bf9a3f2e9acf633932e225a72339e&language=en-US`)).data.results
    }
  }
}
</script>
