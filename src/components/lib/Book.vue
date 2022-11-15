<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <button @click="getBooks">Load Books</button>
    <p>{{ books }}</p>
  </div>
</template>

<script>
import Book from "../../apiservices/Book";

export default {
  name: "BookView",
  props: {
    msg: String,
  },
  data() {
    return {
      books: "No books loaded",
    };
  },
  methods: {
    async getBooks() {
      const booksResponse = await Book.getAll();
      this.books = booksResponse.data;
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
