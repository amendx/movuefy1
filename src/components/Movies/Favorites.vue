
<template>
  <v-container>
    <v-card v-if="userIsCreator">
      <v-toolbar dark color="dark">
        <v-toolbar-title>Favorite Movies</v-toolbar-title>
      </v-toolbar>
      <!-- <v-layout row wrap v-for="movie in movies" :key="movie.movieId" class="mb-2"> -->
      <v-layout row wrap wrapclass="mb-2">
        <v-flex
          xs12
          sm10
          md8
          lg6
          offset-sm1
          offset-md2
          offset-lg3
          v-for="movie in fetchedFavorites"
          :key="movie.id"
        >
          <movie-card :currentMovie="movie" :path="`${path}${movie.poster_path}`"></movie-card>
        </v-flex>
        <!-- </v-layout> -->
      </v-layout>
    </v-card>

    <v-layout v-else>
      <v-flex xs12 md8 sm8 lg8 offset-sm2 offset-md2>
        <v-card>
          <v-toolbar dark color="dark">
            <v-toolbar-title>No favorite movies yet</v-toolbar-title>
          </v-toolbar>

          <v-card-text>How about explore some movies?</v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-flex class="text-xs-right">
              <v-btn color="dark" to="/movies">Explore</v-btn>
            </v-flex>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>


<script>
import { RepositoryAbstractFactory } from "../../services/RepositoryAbstractFactory";
const MoviesRepository = RepositoryAbstractFactory.get("movies");
import _ from "lodash";
export default {
  data() {
    return {
      name: "Favorites",
      fetchedFavorites: [],
      favorites: [],
      props: ["id"]
    };
  },
  computed: {
    movies() {
      return this.$store.getters.registeredFavorites;
    },
    user() {
      return this.$store.getters.user;
    },
    userIsAuthenticated() {
      return (
        this.$store.getters.user != null &&
        this.$store.getters.user !== undefined
      );
    },
    userIsCreator() {
      if (!this.userIsAuthenticated) {
        return false;
      }
      if (this.fetchedFavorites.length > 0) return true;
    }
  },
  methods: {
    fetchMovies() {
      this.favorites = Object.values(this.user)[1];
      this.favorites.forEach(async movieId => {
        console.log(this.favorites);
        const { data } = await MoviesRepository.getMovie(movieId);
        this.fetchedFavorites.push(data);
      });
    }
  },
  created() {
    this.fetchMovies();
    this.$store.dispatch("loadFavorites");
  }
};
</script>
<style scoped>
.color-header {
  color: red;
}
</style>


