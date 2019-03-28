<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <h4>Create a new Favorite</h4>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12>
        <form @submit.prevent="onSaveFavorite">
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field name="title" label="Title" id="title" v-model="title" required></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field name="movieId" label="movieId" id="movieId" v-model="movieId" required></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="description"
                label="Description"
                id="description"
                multi-line
                v-model="description"
                required
              ></v-text-field>
            </v-flex>
          </v-layout>

          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-btn class="primary" :disabled="!formIsValid" type="submit">Create Favorite</v-btn>
            </v-flex>
          </v-layout>
        </form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      title: "",
      movieId: "",
      description: ""
    };
  },
  computed: {
    formIsValid() {
      return (
        this.title !== "" && this.movieId !== "" && this.description !== ""
      );
    }
  },
  methods: {
    onSaveFavorite() {
      if (!this.formIsValid) {
        return;
      }
      const favorite = {
        title: this.title,
        movieId: this.movieId,
        description: this.description
      };
      this.$store.dispatch("saveFavorite", favorite);
      this.$router.push("/movies");
    }
  }
};
</script>