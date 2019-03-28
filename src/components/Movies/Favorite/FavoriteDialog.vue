<template>
  <v-dialog v-model="registerDialog">
    <v-btn primary accent slot="activator">
      {{ userIsRegistered ? 'Unregister' : 'Register' }}
    </v-btn>
    <v-card>
      <v-container>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-title v-if="userIsRegistered">Unregister from Movie?</v-card-title>
            <v-card-title v-else>Register for Movie?</v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-text>You can always change your decision later on.</v-card-text>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-actions>
              <v-btn
                class="red--text darken-1"
                flat
                @click="registerDialog = false">Cancel</v-btn>
              <v-btn
                class="green--text darken-1"
                flat
                @click="onAgree">Confirm</v-btn>
            </v-card-actions>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    props: ['movieId'],
    data () {
      return {
        registerDialog: false
      }
    },
    computed: {
        user(){
            this.$store.getters.user
        },
      userIsRegistered () {
         return this.$store.getters.user.registeredFavorites.findIndex(movieId => {
           return movieId === this.movieId
         }) >= 0
      }
    },
    methods: {
      onAgree () {
        if (this.userIsRegistered) {
          this.$store.dispatch('unregisterUserFromMovie', this.movieId).then(this.registerDialog = false)
        } else {
          this.$store.dispatch('registerUserForMovie', this.movieId).then(this.registerDialog = false)
        }
      }
    }
  }
</script>