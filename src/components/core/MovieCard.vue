<template>
  <materialCard color="black" :title="currentMovie.title">
    <v-card class="white--text">
      <v-container fluid>
        <v-layout row justify-start>
          <v-flex xs12 sm6 md9>
            <v-card-media class="card-image" :src="path" height="70vh"></v-card-media>
          </v-flex>
          <v-flex xs12 sm6 md9>
            <v-card-text>
              <div class="text-movie-cont">
                <div class="mr-grid">
                  <v-flex row wrap>
                    <ul class="movie-gen">
                      <li v-if="currentMovie.adult">PG-13 /</li>
                      <li v-else>FREE /</li>
                      <li>{{currentMovie.runtime}} 2h49min /</li>
                      <li>{{currentMovie.genres}} SciFi, Terror</li>
                    </ul>
                  </v-flex>
                </div>

                <div class="mr-grid summary-row">
                  <!-- <div class="col2"> -->
                  <v-flex row wrap>
                    <h5>SUMMARY</h5>
                    <ul class="movie-likes">
                      <li>
                        <i class="material-icons">&#xe106;</i>
                        {{currentMovie.vote_count}}
                      </li>
                      <li>
                        <i class="material-icons">&#xe033;</i>
                        {{currentMovie.vote_average}}
                      </li>
                    </ul>
                  </v-flex>
                  <!-- </div> -->
                </div>

                <div class="mr-grid">
                  <div class="col1">
                    <p class="movie-description">{{currentMovie.overview}}</p>
                  </div>
                </div>
              </div>
            </v-card-text>
            <v-card-actions>
              <v-btn flat :to="'/movies/' + currentMovie.id">
                View Movie
                <div class="col6 action-btn">
                  <i class="material-icons">&#xe0e4;</i>
                </div>
              </v-btn>
            </v-card-actions>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </materialCard>
</template>

<script>
import materialCard from "./Card.vue";
export default {
  components: { materialCard },
  props: ["currentMovie", "path"]
};
</script>


<style lang="scss">
@import "../SCSS/MovieCard.scss";
</style>
