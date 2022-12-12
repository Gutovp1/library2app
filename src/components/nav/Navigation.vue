<template>
  <header>
    <nav>
      <v-app-bar
        id="toolbar"
        fixed
        :class="$vuetify.breakpoint.mdAndUp ? 'showmenu' : 'hidemenu'"
      >
        <v-icon class="logo-icon" size="33px">
          mdi-book-open-page-variant
        </v-icon>
        <h1 class="logo">LIVRER</h1>
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
      <v-app-bar
        fixed
        :class="$vuetify.breakpoint.mdAndUp ? 'hidemenu' : 'showmenu'"
      >
        <v-icon class="logo-icon" size="30px">
          mdi-book-open-page-variant
        </v-icon>
        <h2 class="logo-mobile">LIVRER</h2>
        <v-spacer></v-spacer>
        <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
      </v-app-bar>
      <v-navigation-drawer
        class="hidden-lg-and-up drawer"
        v-model="drawer"
        absolute
        temporary
      >
        <v-list nav dense>
          <v-list-item-group v-model="group">
            <v-list-item to="/">
              <v-icon size="22px"> mdi-home </v-icon> Home
            </v-list-item>
            <v-list-item to="/user">
              <v-icon size="22px"> mdi-account </v-icon> User
            </v-list-item>
            <v-list-item to="/book">
              <v-icon size="22px"> mdi-book </v-icon> Book
            </v-list-item>
            <v-list-item to="/publisher">
              <v-icon size="22px"> mdi-domain </v-icon> Publisher
            </v-list-item>
            <v-list-item to="/rental">
              <v-icon size="22px"> mdi-book-account </v-icon> Rental
            </v-list-item>
            <v-list-item to="/login" v-if="!adminJwt"
              ><v-icon size="24px"> mdi-login </v-icon> Login
            </v-list-item>
            <v-list-item @click="logout" v-if="adminJwt"
              ><v-icon size="24px"> mdi-logout </v-icon> Logout
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>
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
  data: () => ({
    drawer: false,
    group: null,
  }),
  watch: {
    "$vuetify.breakpoint.mdAndUp"() {
      this.drawer = false;
    },
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
    },
  },
};
</script>

<style>
.hidemenu {
  display: none;
}

.showmenu {
  display: block;
}

#toolbar {
  align-items: center;
}

h1,
h2,
.logo-icon {
  color: gray;
  margin-left: 1rem;
}
.logo {
  margin-top: 0.5rem;
}

.logo-mobile {
  margin-top: 0.3rem;
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
