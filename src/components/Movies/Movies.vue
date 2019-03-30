
<template>
  <div>
    <v-flex
      xs12
      md12
      sm12
      lg12
    >
      <v-layout
        align-center
        justify-center
      >
        <v-flex
          xs12
          md12
          lg12
          offset-md3
          offset-lg4
        >
          <v-spacer></v-spacer>
        </v-flex>
      </v-layout>
    </v-flex>
    <v-container>
      <v-layout
        align-center
        justify-center
        row
        fill-height
      >
        <v-flex
          xs12
          md8
          sm8
          lg8
          align-center
          justify-center
        >
          <v-card>
            <v-toolbar
              dark
              color="dark"
            >
              <v-toolbar-title>Search movies</v-toolbar-title>
            </v-toolbar>
            <v-card-media>
              <v-autocomplete
                class="autocomplete"
                :items="suggestions"
                :search-input.sync="searchterm"
                cache-items
                v-model="currentMovie"
                item-text="title"
                color="white"
                return-object
                label="Movies"
              ></v-autocomplete>
            </v-card-media>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <v-container v-if="hasMovie">
      <v-layout>
        <v-flex
          xs12
          sm10
          md8
          lg6
          offset-sm1
          offset-md2
          offset-lg3
        >
          <movie-card
            :currentMovie="currentMovie"
            :path="`${path}${currentMovie.poster_path}`"
          ></movie-card>
        </v-flex>
      </v-layout>
    </v-container>
    <v-container v-else>
      <v-layout
        row
        wrap
        wrapclass="mb-2"
      >
        <v-flex
          xs12
          sm10
          md8
          lg6
          offset-sm1
          offset-md2
          offset-lg3
          v-for="movie in movies"
          :key="movie.id"
        >
          <movie-card
            :currentMovie="movie"
            :path="`${path}${movie.poster_path}`"
          ></movie-card>
        </v-flex>
      </v-layout>
    </v-container>
    <v-layout
      align-center
      justify-center
    >
      <pagination :page="page" />
    </v-layout>
  </div>
</template>


<script>
import { RepositoryAbstractFactory } from "../../services/RepositoryAbstractFactory";
import _ from "lodash";
const MoviesRepository = RepositoryAbstractFactory.get("movies");
import pagination from "../core/Pagination.vue";
export default {
  data () {
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
  components: {
    pagination
  },
  computed: {
    movies () {
      return this.$store.getters.loadedMovies;
    },
    page () {
      return this.$store.state.currentPage;
    }
  },
  watch: {
    searchterm: function (searchterm) {
      this.suggest(searchterm);
    },
    currentMovie (current) {
      this.currentMovie = current;
      if (this.currentMovie.id) this.hasMovie = true;
      if (!hasMovie) this.searchMovies();
    },
    search (val) {
      console.log(val);
    }
  },
  methods: {
    submit: function () {
      this.search(this.searchterm);
    },

    suggest: async function (searchterm) {
      var that = this;
      this.suggestions = [];
      if (searchterm.length > 0) {
        const { data } = await MoviesRepository.searchMovies(searchterm).then(
          response => {
            response.data.results.forEach(function (a) {
              that.suggestions.push(a);
            });
          }
        );
      } else {
        this.searchMovies();
      }
    },
    searchMovies () {
      this.$store.dispatch("loadedMovies");
      this.hasMovie = false;
    },

    changed: function (cf) {
      if (this.currentMovie.id) this.hasMovie = true;
      if (!hasMovie) this.searchMovies();
    },
    search: async function () {
      const { data } = await MoviesRepository.getMovie(this.currentMovie.id);
    }
  },
  created () {
    this.$store.dispatch("loadedMovies");
  }
};
</script>

<style lang="sass" scoped>

.autocomplete
  margin: 30px;

.searchbox
 .sbx-google
    width: 50vh;

.card-search
  margin: 30px;
  padding-bottom: 30px;

.search-movie 
  z-index: 3;
  
.card-image 
  transform: scale(0.7, 0.7);


.card 
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  -webkit-transition:  box-shadow .3s ease-out;
  &:hover
    box-shadow: 1px 8px 20px grey;
    -webkit-transition: box-shadow .3s ease-in;
  
</style>

