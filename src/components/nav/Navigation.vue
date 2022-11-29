<template>
  <header>
    <nav>
      <v-app-bar fixed>
        <h1 class="logo">
          <v-icon class="logo-icon" size="34px">
            mdi-book-open-page-variant
          </v-icon>
          LIVRER
        </h1>
        <v-spacer></v-spacer>

        <v-btn active-class="activated-btn" to="/">
          <v-icon size="24px"> mdi-home </v-icon> Home
        </v-btn>

        <v-btn to="/user">
          <v-icon size="24px"> mdi-account </v-icon> User
        </v-btn>

        <v-btn to="/book"> <v-icon size="24px"> mdi-book </v-icon> Book </v-btn>

        <v-btn to="/publisher">
          <v-icon size="24px"> mdi-domain </v-icon> Publisher
        </v-btn>

        <v-btn to="/rental">
          <v-icon size="24px"> mdi-book-account </v-icon> Rental
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn right to="/login" v-if="!adminJwt"
          ><v-icon size="24px"> mdi-login </v-icon> Login
        </v-btn>
        <v-btn right @click="logout" v-if="adminJwt"
          ><v-icon size="24px"> mdi-logout </v-icon> Logout
        </v-btn>
      </v-app-bar>
    </nav>
  </header>
</template>

<script>
import { mapGetters } from "vuex";
import vswa2 from "sweetalert2";
export default {
  name: "NavigationVue",
  computed: {
    ...mapGetters(["adminJwt"]),
  },

  methods: {
    logout() {
      vswa2
        .fire({
          title: "Do you want to log out?",
          showDenyButton: true,
          confirmButtonText: "Yes",
          denyButtonText: "No",
        })
        .then((res) => {
          if (res.isConfirmed) {
            localStorage.removeItem("adminJwt");
            this.$store.dispatch("adminJwt", null);
            location.reload();
          } else if (res.isDenied) {
            vswa2.fire("You are still logged in.", "", "info");
          }
        });

      // this.$router.push("/");
    },
  },
};
</script>

<style>
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
} */
header {
  background-color: pink;
}
h1,
.logo-icon {
  color: darkslategrey;
}
.logo {
  margin: 2rem;
  align-items: center;
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
.v-btn {
  margin: 5px;
}
</style>
