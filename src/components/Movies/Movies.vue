
<template>
  <v-container>
     <v-layout>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-img
          class="white--text"
          height="200px"
          src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
        >
          <v-container fill-height fluid>
            <v-layout fill-height>
              <v-flex xs12 align-end flexbox>
                <span class="headline">Top 10 Australian beaches</span>
              </v-flex>
            </v-layout>
          </v-container>
        </v-img>
        <v-card-title>
          <div>
            <span class="grey--text">Number 10</span><br>
            <span>Whitehaven Beach</span><br>
            <span>Whitsunday Island, Whitsunday Islands</span>
          </div>
        </v-card-title>
        <v-card-actions>
          <v-btn flat color="orange">Share</v-btn>
          <v-btn flat color="orange">Explore</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
    <v-layout row wrap v-for="movie in movies" :key="movie.id" class="mb-2">
      <v-flex xs12 sm10 md8 offset-sm1 offset-md2>
        <v-card class="info">
          <v-container fluid>
            <v-layout row justify-start>
              <v-flex xs12 sm6 md9>
                <v-card-media 
                class="card-image"
                   :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`"
                   height="70vh"
                ></v-card-media>
              </v-flex>
              <v-flex xs12 sm6 md9>
                <v-card-title primary-title>
                  <div>
                    <h5 class="white--text mb-0">{{ movie.title }}</h5>
                    <div>{{ movie.overview }}</div>
                  </div>
                </v-card-title>
                <v-card-actions>
                  <v-btn flat :to="'/movies/' + movie.id">
                    <v-icon left light>arrow_forward</v-icon>
                    View Movie
                  </v-btn>
                </v-card-actions>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>


<script>
export default {
  data(){
    return{
      name: 'Movies',
    }
  },
  computed: {
    movies(){
       return this.$store.state.fetchedMovies
     }
  },
  created(){
    this.$store.dispatch('fetchMovies')
    }
}
</script>

<style>

.card-image{
transform: scale(0.7, 0.7);
}
</style>

