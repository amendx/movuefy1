<template>
  <v-card class="card">
    <v-container fluid>
      <v-layout row justify-start>
        <v-flex xs12 sm6 md9>
          <v-card-media class="card-image" :src="path" height="70vh"></v-card-media>
        </v-flex>
        <v-flex xs12 sm6 md9>
          <v-card-title primary-title>
            <div>
              <h5 class="white--text mb-0">{{ currentMovie.title }}</h5>
              <div>{{ currentMovie.overview }}</div>
            </div>
          </v-card-title>
          <v-card-actions>
            <v-btn flat :to="'/movies/' + currentMovie.id">
              <v-icon left light>arrow_forward</v-icon>View Movie
            </v-btn>
          </v-card-actions>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script>
export default {
  props: ["currentMovie", "path"]
};
</script>

<style>
</style>
