<template>
  <div id="app">
    <Navigation />
    <router-view />
    <Footer />
  </div>
</template>

<script>
import Navigation from "./components/nav/Navigation.vue";
import Footer from "./components/foot/Footer.vue";
export default {
  name: "App",
  components: { Navigation, Footer },
};
</script>
