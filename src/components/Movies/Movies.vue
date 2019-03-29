
<template>
  <div>
    <v-container>
      <v-card dark>
        <v-card-title>
          Search Movies
        </v-card-title>
      <v-layout align-center justify-center>
        <v-flex xs12 md12 lg12 offset-md3 offset-lg4>
          <vue-instant
            class="search-movie"
            name="search-movie"
            type="google"
            placeholder="Search Movie..."
            :show-autocomplete="true"
            :suggestions="suggestions"
            :suggestion-attribute="suggestionAttribute"
            v-model="searchterm"
            @selected="selected"
            @input="changed"
            @enter="search"
            v-bind:style="{ width: '49vh'}"
          ></vue-instant>
          <v-spacer></v-spacer>
        </v-flex>
      </v-layout>
      </v-card>
    </v-container>
    
    <v-container v-if="hasMovie">
       <v-layout >
        <v-flex xs12 sm10 md8 lg6 offset-sm1 offset-md2 offset-lg3>
          <core-movie-card :currentMovie="currentMovie" :path="`${path}${currentMovie.poster_path}`"></core-movie-card>
        </v-flex>
      </v-layout>
    </v-container>
    <v-container v-else>
      <v-layout row wrap v-for="movie in movies" :key="movie.id" class="mb-2">
        <v-flex xs12 sm10 md8 lg6 offset-sm1 offset-md2 offset-lg3>
       
          <core-movie-card :currentMovie="movie" :path="`${path}${movie.poster_path}`"></core-movie-card>

        </v-flex>
      </v-layout>
       
    
    </v-container>
    <v-layout align-center justify-center>
    <pagination :page="page"/>
    </v-layout>
  </div>
</template>


<script>
import { RepositoryAbstractFactory } from "../../services/RepositoryAbstractFactory";

const MoviesRepository = RepositoryAbstractFactory.get("movies");
import pagination from '../core/Pagination.vue'
export default {
  data() {
    return {
      name: "Movies",
      searchterm: "",
      suggestionAttribute: "original_title",
      suggestions: [],
      selectedEvent: "",
      path: "https://image.tmdb.org/t/p/w500",
      result: null,
      currentMovie: {}, 
      hasMovie: false
    };
  },
  components:  {
    pagination
  },
  computed: {
    movies() {
      return this.$store.getters.loadedMovies;
    },
    page() {
      return this.$store.state.currentPage;
    }
  },
  watch: {
    searchterm: function(searchterm) {
      this.suggest(searchterm);
    }
  },
  methods: {
    submit: function() {
      this.search(this.searchterm);
      console.log('submit')
    },
    suggest: async function(searchterm) {
      var that = this;
      this.suggestions = [];
      if(searchterm.length >0 ){
      const { data } = await MoviesRepository.searchMovies(searchterm).then(
        response => {
          response.data.results.forEach(function(a) {
            that.suggestions.push(a);
          });
        });  
        } else {
      this.searchMovies()
      }
    },
    searchMovies(){
        this.$store.dispatch("loadedMovies");
        this.hasMovie = false;
    },
    selected: function(current) {
      this.currentMovie = current;
      if(!current)
      this.searchMovies()
    },
    changed: function(cf) {
      if(this.currentMovie.id)
        this.hasMovie = true;
        if(!hasMovie)
        this.searchMovies()
    },
    search: async function() {
      const { data } = await MoviesRepository.getMovie(this.currentMovie.id)
      console.log('changed')
    }
  },
  created() {
    this.$store.dispatch("loadedMovies");
  }
};
</script>

<style lang="sass" scoped>
.searchbox
 .sbx-google
    width: 50vh;


.card-image 
  transform: scale(0.7, 0.7);


.card 
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  -webkit-transition:  box-shadow .3s ease-out;
  &:hover
    box-shadow: 1px 8px 20px grey;
    -webkit-transition: box-shadow .3s ease-in;
  
</style>

