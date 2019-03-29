<template>
  <v-alert error dismissible transition="scale-transition" @input="onClose" :value="true">{{text}}</v-alert>
</template>

<script>
export default {
  props: ["text"],
  methods: {
    onClose() {
      this.$emit("dissmissed");
    }
  }
};
</script>

<style>
</style>
