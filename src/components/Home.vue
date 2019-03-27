<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 sm6 class="text-xs-center text-sm-right">
        <v-btn large router class="primary">Explore Movies</v-btn>
      </v-flex>
      <v-flex xs12 sm6 class="text-xs-center text-sm-left">
        <v-btn large router  class="primary">Organize Favorites</v-btn>
      </v-flex>
    </v-layout>
    <v-layout row wrap class="mt-2">
      <v-flex xs12>
        <v-carousel>
          <v-carousel-item v-for="movie in movies" 
           @click="onLoadMovie(movie.id)"
          :src="`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`" :key="movie.id">
            
             <v-progress-circular
      :size="70"
      :width="7"
      color="purple"
    ></v-progress-circular>
            <div class="title">{{ movie.title }}</div>
          </v-carousel-item>
        </v-carousel>
      </v-flex>
    </v-layout>
    <v-layout row wrap class="mt-2">
      <v-flex xs12 class="text-xs-center">
        <p>Check out the latest movies!</p>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from 'axios'
import _ from 'lodash'
import { RepositoryAbstractFactory} from './../services/RepositoryAbstractFactory'

const MoviesRepository = RepositoryAbstractFactory.get('movies')
export default {
  data () {
      return {
        popularMovies: [], 
        loading: true
      }
    },
  async created() {
    this.fetch()
  },
    methods: {
        async fetch (){
        const {data} = await MoviesRepository.getPopularMovies()
        this.popularMovies = data.results;
        },

      onLoadMovie (id) {
        this.$router.push('/movies/' + id)
      }
    },
    computed: {
      movies() {
        return this.$store.getters.featuredMovies
      }
    }
  }
</script>

<style scoped>
  .title {
    position: absolute;
    bottom: 50px;
    background-color: rgba(0,0,0,0.5);
    color: white;
    font-size: 2em;
    padding: 20px;
  }
</style>
