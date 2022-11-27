<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12"> </v-col>
      <v-card
        class="card d-flex align-center justify-space-between rounded-lg pa-6"
      >
        <div class="card-content">
          <v-card-title class="number pa-0 pb-7">{{
            this.board.users.toString().padStart(2, 0)
          }}</v-card-title>
          <v-card-subtitle class="name pa-0">Users</v-card-subtitle>
        </div>
      </v-card>
      <v-card
        class="card d-flex align-center justify-space-between rounded-lg pa-6"
      >
        <div class="card-content">
          <v-card-title class="number pa-0 pb-7">{{
            this.board.books.toString().padStart(2, 0)
          }}</v-card-title>
          <v-card-subtitle class="name pa-0">Book Editions</v-card-subtitle>
        </div>
      </v-card>
      <v-card
        class="card d-flex align-center justify-space-between rounded-lg pa-6"
      >
        <div class="card-content">
          <v-card-title class="number pa-0 pb-7">{{
            this.board.booksAvailable.toString().padStart(2, 0)
          }}</v-card-title>
          <v-card-subtitle class="name pa-0"
            >Available Book Editions
          </v-card-subtitle>
        </div>
      </v-card>
      <v-card
        class="card d-flex align-center justify-space-between rounded-lg pa-6"
      >
        <div class="card-content">
          <v-card-title class="number pa-0 pb-7">{{
            this.board.publishers.toString().padStart(2, 0)
          }}</v-card-title>
          <v-card-subtitle class="name pa-0">Publishers</v-card-subtitle>
        </div>
      </v-card>
      <v-card
        class="card d-flex align-center justify-space-between rounded-lg pa-6"
      >
        <div class="card-content">
          <v-card-title class="number pa-0 pb-7">{{
            this.board.rentals.toString().padStart(2, 0)
          }}</v-card-title>
          <v-card-subtitle class="name pa-0">Pending Rentals</v-card-subtitle>
        </div>
      </v-card>
      <v-card
        class="card d-flex align-center justify-space-between rounded-lg pa-6"
      >
        <div class="card-content">
          <v-card-title class="number pa-0 pb-7">{{
            this.board.booksAvailable.toString().padStart(2, 0)
          }}</v-card-title>
          <v-card-subtitle class="name pa-0"
            >Available Book Editions
          </v-card-subtitle>
        </div>
      </v-card>
      <v-card
        class="card d-flex align-center justify-space-between rounded-lg pa-6"
      >
        <div class="card-content">
          <v-card-title class="number pa-0 pb-7">{{
            this.board.booksAvailable.toString().padStart(2, 0)
          }}</v-card-title>
          <v-card-subtitle class="name pa-0"
            >Available Book Editions
          </v-card-subtitle>
        </div>
      </v-card>
      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3">Welcome to Vuetify</h1>
      </v-col>

      <v-col class="mb-5" cols="12">
        <h2 class="headline font-weight-bold mb-3">What's next?</h2>
        <v-row justify="center"> </v-row>
      </v-col>

      <v-col class="mb-5" cols="12">
        <h2 class="headline font-weight-bold mb-3">Important Links</h2>
        <v-row justify="center"> </v-row>
      </v-col>

      <v-col class="mb-5" cols="12">
        <h2 class="headline font-weight-bold mb-3">Ecosystem</h2>

        <v-row justify="center"> </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import user from "../apiservices/user";
import book from "../apiservices/book";
import publisher from "../apiservices/publisher";
import rental from "../apiservices/rental";
export default {
  name: "HomeView",

  data: () => ({
    board: {
      users: 0,
      books: 0,
      booksAvailable: 0,
      publishers: 0,
      rentals: 0,
      booksTotal: 0,
      booksRented: 0,
    },
  }),
  created() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      await user.getAll().then((res) => {
        this.board.users = res.data.length;
      });
      await book.getAll().then((res) => {
        this.board.books = res.data.length;
        this.board.books = res.data.map((i) => {
          i.quantity;
        });
        // this.board.books = this.board.books.reduce();
        console.log(this.board.books);
        // console.log(res.data);
      });
      await book.getAvailable().then((res) => {
        this.board.booksAvailable = res.data.length;
        console.log(res.data);
      });
      await publisher.getAll().then((res) => {
        this.board.publishers = res.data.length;
      });
      await rental.getAll().then((res) => {
        this.board.rentals = res.data.length;
      });
    },
  },
};
</script>
