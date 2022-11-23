<template>
  <header>
    <nav>
      <v-btn to="/"> <v-icon size="24px"> mdi-home </v-icon> Home </v-btn> |
      <v-btn to="/user">
        <v-icon size="24px"> mdi-account-edit </v-icon> Admin
      </v-btn>
      |
      <v-btn to="/user">
        <v-icon size="24px"> mdi-account </v-icon> User
      </v-btn>
      |
      <v-btn to="/book"> <v-icon size="24px"> mdi-book </v-icon> Book </v-btn>
      |
      <v-btn to="/publisher">
        <v-icon size="24px"> mdi-bookshelf </v-icon> Publisher
      </v-btn>
      |
      <v-btn to="/rental">
        <v-icon size="24px"> mdi-book-account </v-icon> Rental
      </v-btn>
    </nav>
  </header>
</template>

<script>
export default {
  name: "NavigationVue",
};
</script>

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
</style>

<!-- Add "scoped" attribute to limit CSS to this component only 
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
-->
