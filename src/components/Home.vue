<template>
  <v-container>
    <loading :loading="loading"></loading>
    <v-layout row wrap class="mt-2" v-if="!loading">
      <v-flex xs12>
        <v-card>
          <v-toolbar dark color="dark">
            <v-toolbar-title>Featured Movies</v-toolbar-title>
          </v-toolbar>
          <v-carousel hide-delimiters="true">
            <v-carousel-item
              v-for="movie in movies"
              @click="onLoadMovie(movie.id)"
              :src="`${posterPath}${movie.backdrop_path}`"
              :key="movie.id"
            >
              <div class="title">{{ movie.title }}</div>
            </v-carousel-item>
          </v-carousel>
        </v-card>
      </v-flex>
    </v-layout>
    <v-spacer></v-spacer>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      posterPath: "https://image.tmdb.org/t/p/original"
    };
  },
  computed: {
    movies() {
      return this.$store.getters.loadedMovies;
    },
    loading() {
      return this.$store.getters.loading;
    },
    userIsAuthenticated() {
      return (
        this.$store.getters.user !== null &&
        this.$store.getters.user !== undefined
      );
    }
  },
  created() {
    this.$store.dispatch("loadedMovies");
  },
  methods: {
    onLoadMovie(id) {
      this.$router.push("/movies/" + id);
    }
  }
};
</script>

<style scoped>
.explore-movies {
  margin: 30px;
  padding: 30px 10px;
}
.title {
  position: absolute;
  bottom: 50px;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  font-size: 2em;
  padding: 20px;
}
</style>
