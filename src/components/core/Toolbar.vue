<template>
  <v-toolbar dark class="blue-contrast">
    <v-toolbar-side-icon @click="sideNav = !sideNav" class="hidden-sm-and-up"></v-toolbar-side-icon>
    <v-toolbar-title>
      <router-link to="/dashboard" tag="span" style="cursor: pointer">Movuefy</router-link>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-xs-only">
      <v-btn flat v-for="item in menuItems" :key="item.title" :to="item.link">
        <v-icon left dark>{{ item.icon }}</v-icon>
        {{ item.title }}
      </v-btn>

      <v-btn v-if="userIsAuthenticated" flat @click="onLogout">
        <v-icon left dark>exit_to_app</v-icon>Logout
      </v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {
  name: "toolbar",
  props: ["menuItems"],
  computed: {
    userIsAuthenticated() {
      return (
        this.$store.getters.user !== null &&
        this.$store.getters.user !== undefined
      );
    }
  },
  methods: {
    onLogout() {
      this.$store.dispatch("logout");
    }
  }
};
</script>

<style>
</style>
