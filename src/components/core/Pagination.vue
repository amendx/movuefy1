<template>
    
    <v-container>
      <v-layout justify-center>
        <v-flex xs12 sm6 md9 offset-lg5>
          <v-pagination  :value="page" :total-visible="7" :length="7"></v-pagination>
        </v-flex>
      </v-layout>
    </v-container>
</template>

<script>
export default {
  name: 'pagination',
props: ['page']
}
</script>
