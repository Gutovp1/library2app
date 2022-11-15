<template>
  <header>
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/user">User</router-link> |
      <router-link to="/book">Book</router-link> |
      <router-link to="/publisher">Publisher</router-link> |
      <router-link to="/rental">Rental</router-link>
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
  color: #42b983;
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
