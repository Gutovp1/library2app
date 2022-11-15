<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <button @click="getUser">Load User</button>
    <p>{{ user }}</p>
  </div>
</template>

<script>
import User from "../../apiservices/User.js";

export default {
  name: "UserView",
  props: {
    msg: String,
  },
  data() {
    return {
      user: "No users loaded",
    };
  },
  methods: {
    async getUser() {
      const userResponse = await User.getAll();
      this.user = userResponse.data;
    },
  },
};
</script>

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
