
<template>
  <v-app dark>
    <toolbar :menuItems="menuItems"></toolbar>
    <main>
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      sideNav: false
    };
  },
  computed: {
    menuItems() {
      let menuItems = [
        { icon: "face", title: "Sign up", link: "/signup" },
        { icon: "lock_open", title: "Sign in", link: "/signin" }
      ];

      if (this.userIsAuthenticated) {
        menuItems = [
          { icon: "dashboard", title: "Dashboard", link: "/dashboard" },
          { icon: "important_devices", title: "View Movies", link: "/movies" },
          { icon: "room", title: "Favorite Movies", link: "/favorites" },
          { icon: "person", title: "Profile", link: "/profile" }
        ];
      }
      return menuItems;
    },
    userIsAuthenticated() {
      return (
        this.$store.getters.user !== null &&
        this.$store.getters.user !== undefined
      );
    }
  },
  methods: {
    onLoggedOut(val) {
      console.log(val);
    }
  }
};
</script>

<style lang="stylus">

@import './stylus/main';
</style>
