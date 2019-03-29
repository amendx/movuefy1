<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout justify-center wrap>
      <v-flex xs12 md8>
        <material-card color="black" title="Your Profile" text="Complete your profile">
          <v-form>
            <v-container py-0>
              <v-layout wrap>
                <v-flex xs12 md4>
                  <h1>Comming soon</h1>
                </v-flex>
              </v-layout>
            </v-container>
          </v-form>
        </material-card>
      </v-flex>
      <v-flex xs12 md4>
        <material-card class="v-card-profile">
          <v-avatar slot="offset" class="mx-auto d-block" size="130">
            <img
              src="https://avatars3.githubusercontent.com/u/30783877?s=400&u=6aa335dcafb11b3aa8dbcaab86ed3b2a1b6bea73&v=4"
            >
          </v-avatar>
          <v-card-text class="text-xs-center">
            <h6 class="category text-gray font-weight-thin mb-3">CEO / FOUNDER</h6>
            <h4 class="card-title font-weight-light">Amanda Esmeraldo</h4>

            <h6 class="category text-gray font-weight-thin mb-3">Front-end developer</h6>
            <p class="card-description font-weight-light">
              <i>Never give up on something you can't go a day without thinking.</i>
            </p>
            <v-btn
              color="dark"
              round
              href="https://github.com/amendx"
              target="_blank"
              class="font-weight-light"
            >Follow</v-btn>
          </v-card-text>
        </material-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import materialCard from "../core/Card.vue";
export default {
  components: { materialCard },
  computed: {}
};
</script>
