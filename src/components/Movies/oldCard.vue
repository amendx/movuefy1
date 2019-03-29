<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card>
          <v-card-title>
            <h6 class="primary--text">{{ currentMovie.title }}</h6>
          </v-card-title>
          <v-card-media
            :src="`https://image.tmdb.org/t/p/original${this.currentMovie.backdrop_path}`"
            height="400px"
          ></v-card-media>
          <v-card-actions>
            <v-spacer></v-spacer>
            <app-movie-favorite-dialog :movieId="currentMovie.id" v-if="userIsAuthenticated"></app-movie-favorite-dialog>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { RepositoryAbstractFactory } from "../../services/RepositoryAbstractFactory";

const MoviesRepository = RepositoryAbstractFactory.get("movies");
export default {
  props: ["id"],
  data() {
    return {
      currentMovie: {}
    };
  },
  async created() {
    this.fetch();
  },
  methods: {
    async fetch() {
      const { data } = await MoviesRepository.getMovie(this.$route.params.id);
      this.currentMovie = data;
    },
    async getPosterPath(path) {
      const { data } = await MoviesRepository.getImagePath(path);
    }
  },
  computed: {
    userIsAuthenticated() {
      return (
        this.$store.getters.user != null &&
        this.$store.getters.user !== undefined
      );
    }
  }
};
</script>

<style scoped>
body {
  background-color: #e1e7e7;
}
.card {
  position: relative;
  background-color: #ffffff;
  height: 370px;
  width: 240px;
  margin: 10px;
  overflow: hidden;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.5);
}

.favorite-card {
  transform: (0.5, 0.5);
}
.card-image {
  /* center horizontally overflown image */
  position: absolute;
  left: -9999px;
  right: -9999px;
  margin: auto;

  height: 220px;
  min-width: 100%;
}
.card-row {
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 780px;
  width: 100%;
  height: 500px;
}
.card-footer {
  position: absolute;
  bottom: 0;
  height: 130px;
  padding: 10px 15px;
  font-family: Helvetica;
}
.card-text {
  font-size: 14px;
  color: rgba(0, 0, 0, 0.7);
}
.card-title {
  font-family: Serif;
}
.card-author {
  font-size: 14px;
  color: #bab096;
}
</style>

