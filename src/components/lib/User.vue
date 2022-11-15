<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <button @click="getUsers">Load User</button>
    <table>
      <theader>
        <tr>
          <th>ID |</th>
          <th>NAME |</th>
          <th>ADDRESS |</th>
          <th>CITY |</th>
          <th>EMAIL</th>
        </tr>
      </theader>
      <tbody>
        <tr v-for="user in users" v-bind:key="user.id">
          <td>{{ user.id }} |</td>
          <td>{{ user.name }} |</td>
          <td>{{ user.address }} |</td>
          <td>{{ user.city }} |</td>
          <td>{{ user.email }}</td>
        </tr>
      </tbody>
    </table>
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
      users: [],
    };
  },
  methods: {
    async getUsers() {
      const userResponse = await User.getAll();
      this.users = userResponse.data;
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
