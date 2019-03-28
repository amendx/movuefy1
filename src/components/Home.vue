<template>
  <v-container>
    <v-layout row wrap v-if="userIsAuthenticated">
      <v-flex xs12 sm6 class="text-xs-center text-sm-right">
        <v-btn large router class="primary">Explore Movies</v-btn>
      </v-flex>
      <v-flex xs12 sm6 class="text-xs-center text-sm-left">
        <v-btn large router to="/savefavorite" class="primary">Organize Favorites</v-btn>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex xs12 class="text-xs-center">
        <v-card>
          <v-progress-circular
            indeterminate
            class="primary--text"
            :width="7"
            :size="70"
            v-if="loading"
          ></v-progress-circular>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout row wrap class="mt-2" v-if="!loading">
      <v-flex xs12>
        <v-card>
          <v-card-title>Featured Movies</v-card-title>
          <v-carousel>
            <v-carousel-item
              v-for="movie in movies"
              @click="onLoadMovie(movie.id)"
              :src="`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`"
              :key="movie.id"
            >
              <div class="title">{{ movie.title }}</div>
            </v-carousel-item>
          </v-carousel>
        </v-card>
      </v-flex>
    </v-layout>
    <v-spacer></v-spacer>
    <v-layout row wrap class="mt-2">
      <v-flex xs12 class="text-xs-center">
        <v-card>
          <p>Check out the latest movies!</p>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
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
.title {
  position: absolute;
  bottom: 50px;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  font-size: 2em;
  padding: 20px;
}
</style>
