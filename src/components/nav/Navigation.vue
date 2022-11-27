<template>
  <header>
    <nav>
      <v-app-bar>
        <v-btn active-class="activated-btn" to="/">
          <v-icon size="24px"> mdi-home </v-icon> Home
        </v-btn>
        |
        <v-btn to="/user">
          <v-icon size="24px"> mdi-account </v-icon> User
        </v-btn>

        <v-btn to="/book"> <v-icon size="24px"> mdi-book </v-icon> Book </v-btn>
        |
        <v-btn to="/publisher">
          <v-icon size="24px"> mdi-bookshelf </v-icon> Publisher
        </v-btn>
        |
        <v-btn to="/rental">
          <v-icon size="24px"> mdi-book-account </v-icon> Rental
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn right to="/login" v-if="!isLoggedIn"
          ><v-icon size="24px"> mdi-lock </v-icon> Login
        </v-btn>
        <v-btn right @click="logout" v-if="isLoggedIn"
          ><v-icon size="24px"> mdi-door </v-icon> Logout
        </v-btn>
      </v-app-bar>
    </nav>
  </header>
</template>

<script>
import { useAuthToken } from "../../store/authToken";
export default {
  name: "NavigationVue",
  setup() {
    const admin = useAuthToken();
    return { admin };
  },
  computed: {
    isLoggedIn() {
      return localStorage.getItem("adminJwt") ? true : false;
    },
  },
  methods: {
    logout() {
      localStorage.removeItem("adminJwt");
      this.admin.$reset;
      this.$router.push("/");
    },
  },
};
</script>

<!--
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #393939;
}
.v-btn.activated-btn {
  position: relative;
}
.v-btn.activated-btn::after {
  position: absolute;
  content: "";
  height: 100%;
  width: 100%;
  border: 3px solid #02af8e !important;
  transition: all 0.3s;
}
.activated-btn.v-btn::before {
  display: none;
}
</style>
-->
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
