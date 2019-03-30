<template>
  <v-container>
    <v-layout
      justify-center
      align-content-center
    >
      <v-flex
        xs12
        sm6
        md9
        lg6
        offset-lg3
      >
        <v-pagination
          :value="page"
          :total-visible="6"
          :length="6"
        ></v-pagination>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "pagination",
  props: ["page"]
};
</script>
