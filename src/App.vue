<template>
  <div id="app">
    <v-app>
      <v-main class="teal lighten-5">
        <v-container class="mp-0">
          <h1 class="mb-4">💵 Currency Converter</h1>
          <div class="ma-n3 ma-sm-0">
            <Converter />
          </div>
        </v-container>
      </v-main>
    </v-app>
  </div>
</template>

<script>
import Converter from "./components/Converter.vue";

export default {
  name: "App",
  components: {
    Converter,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
