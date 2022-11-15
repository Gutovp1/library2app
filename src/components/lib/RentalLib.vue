<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <button @click="getRental">Load Rental</button>
    <p>{{ rental }}</p>
  </div>
</template>

<script>
import Rental from "../../apiservices/Rental";

export default {
  name: "RentalView",
  props: {
    msg: String,
  },
  data() {
    return {
      rental: "No rental loaded",
    };
  },
  methods: {
    async getRental() {
      const rentalResponse = await Rental.getAll();
      this.rental = rentalResponse.data;
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
