<template>
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
            <v-toolbar-title>{{cardTitle}}</v-toolbar-title>
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
</template>


<script>
import { RepositoryAbstractFactory } from "../../services/RepositoryAbstractFactory";

const MoviesRepository = RepositoryAbstractFactory.get("movies");
export default {
  name: "SearchMovies",
  data () {
    return {
      suggestions: [],
      searchterm: "",
      currentMovie: {},
      cardTitle: "Search movies"
    };
  },
  props: ["movies", "hasMovie"],
  watch: {
    searchterm: function (searchterm) {
      this.suggest(searchterm);
    },
    currentMovie (current) {
      this.currentMovie = current;
      this.$store.dispatch("searchMovie", this.currentMovie.id);
      if (this.currentMovie.id) this.hasMovie = true;
      if (!hasMovie) this.searchMovies();
    }
  },
  methods: {
    searchMovies () {
      if (this.movies) this.hasMovie = false;
    },
    search: async function () {
      const { data } = await MoviesRepository.getMovie(this.currentMovie.id);
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
    }
  }
};
</script>

<style>
.autocomplete {
  margin: 30px;
}
</style>

