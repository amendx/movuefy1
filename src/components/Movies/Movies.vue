
<template>
  <div>
    <v-container>
      <v-layout align-center justify-center>
        <v-flex offset-md3 offset-lg3>
          <vue-instant
            class="search-movie"
            name="search-movie"
            type="google"
            placeholder="Search Movie..."
            :show-autocomplete="true"
            :autofocus="false"
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
    </v-container>

    <v-container>
      <!-- <template v-if="result"></template> -->
      <v-layout row wrap v-for="movie in movies" :key="movie.id" class="mb-2">
        <v-flex xs12 sm10 md8 lg6 offset-sm1 offset-md2 offset-lg3>
          <v-card class="card">
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
                      <v-icon left light>arrow_forward</v-icon>View Movie
                    </v-btn>
                  </v-card-actions>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <v-container>
      <v-layout justify-center>
        <v-flex xs12 sm6 md9>
          <v-pagination @input="next" :value="page" :total-visible="5" :length="5"></v-pagination>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>


<script>
import axios from "axios";
export default {
  data() {
    return {
      name: "Movies",
      searchterm: "",
      suggestionAttribute: "original_title",
      suggestions: [],
      selectedEvent: "",
      result: null
    };
  },
  computed: {
    movies() {
      return this.$store.state.fetchedMovies;
    },
    page() {
      return this.$store.state.currentPage;
    }
  },
  watch: {
    page() {
      console.log(page);
    },
    searchterm: function(searchterm) {
      this.suggest(searchterm);
    }
  },
  methods: {
    next() {
      // this.$store.dispatch("fetchMoviePage", this.$store.state.currentPage);
    },
    submit: function() {
      this.search(this.searchterm);
    },
    suggest: function(searchterm) {
      var that = this;
      this.suggestions = [];
      this.$store
        .dispatch("setSearchMovies", this.searchterm)
        .then(response => {
          response.forEach(function(a) {
            that.suggestions.push(a);
            console.log(a);
          });
        });
    },
    selected: function(current) {
      this.selection = current;
    },
    changed: function() {},
    search: function() {}
  },
  created() {
    // this.$store.dispatch("fetchMovies");
    this.$store.dispatch("fetchMoviePage", 1);
  }
};
</script>

<style lang="sass" scoped>
.searchbox
 .sbx-google
    width: 49vh;


.card-image 
  transform: scale(0.7, 0.7);


.card 
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  -webkit-transition:  box-shadow .3s ease-out;
  &:hover
    box-shadow: 1px 8px 20px grey;
    -webkit-transition: box-shadow .3s ease-in;
  
</style>

