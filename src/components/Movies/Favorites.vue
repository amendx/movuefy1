
<template>
  <v-container>
    <v-layout
      row
      wrap
      v-for="movie in movies"
      :key="movie.movieId"
      v-if="userIsCreator"
      class="mb-2"
    >
      <v-flex xs12 sm10 md8 offset-sm1 offset-md2>
        <v-card class="info">
          <v-container fluid>
            <v-layout row>
              <v-flex xs5 sm4 md3>
                <v-card-media :src="movie.imageUrl" height="130px"></v-card-media>
              </v-flex>
              <v-flex xs7 sm8 md9>
                <v-card-title primary-title>
                  <div>
                    <h5 class="white--text mb-0">{{ movie.title }}</h5>
                    <div>{{ movie.description }}</div>
                  </div>
                </v-card-title>
                <v-card-actions>
                  <v-btn flat :to="'/favorites/' + movie.id">
                    <v-icon left light>arrow_forward</v-icon>View Movie
                  </v-btn>
                </v-card-actions>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout v-if="!userIsCreator">
      <v-flex xs12 md8 sm8 lg8 offset-sm2 offset-md2>
        <v-card>
          <v-card-title primary-title>
            <h3 class="headline mb-0">No favorite movies</h3>
            <v-divider light></v-divider>
          </v-card-title>
          <v-card-text>How about explore some movies?</v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-flex class="text-xs-right">
              <v-btn flat color="purple">Explore</v-btn>
            </v-flex>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>


<script>
export default {
  data() {
    return {
      name: "Favorites"
    };
  },
  computed: {
    movies() {
      return this.$store.getters.loadedFavorites;
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
      return this.$store.getters.user.id === this.movies.creatorId;
    }
  },
  created() {
    this.$store.dispatch("loadFavorites");
  }
};
</script>
<style scoped>
.color-header {
  color: red;
}
</style>


