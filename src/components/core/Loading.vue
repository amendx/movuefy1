<template>
  <v-layout>
    <v-flex
      xs12
      class="text-xs-center"
    >
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
</template>


<script>
export default {
  props: ["loading"]
};
</script>
