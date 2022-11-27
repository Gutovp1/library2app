<template>
  <v-app>
    <v-main>
      <Navigation />
      <router-view />
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import Navigation from "./components/nav/Navigation.vue";
import Footer from "./components/foot/Footer.vue";
export default {
  name: "App",
  components: { Navigation, Footer },
  async created() {
    const response = await localStorage.getItem("adminJwt");
    this.$store.dispatch("adminJwt", response);
  },
};
</script>
