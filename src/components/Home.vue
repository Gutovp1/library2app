<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12"> </v-col>
      <v-col cols="12"> </v-col>

      <v-card
        class="card d-flex align-center justify-space-between rounded-lg pa-6"
      >
        <div class="card-content">
          <v-card-title class="number pa-0 pb-7">{{
            this.board.books.toString().padStart(2, 0)
          }}</v-card-title>
          <v-card-subtitle class="name pa-0">Book Titles</v-card-subtitle>
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
            >Available Book Titles
          </v-card-subtitle>
        </div>
      </v-card>

      <v-card
        class="card d-flex align-center justify-space-between rounded-lg pa-6"
      >
        <div class="card-content">
          <v-card-title class="number pa-0 pb-7">{{
            this.board.booksTotal.toString().padStart(2, 0)
          }}</v-card-title>
          <v-card-subtitle class="name pa-0"
            >Total Book Volumes
          </v-card-subtitle>
        </div>
      </v-card>
      <v-card
        class="card d-flex align-center justify-space-between rounded-lg pa-6"
      >
        <div class="card-content">
          <v-card-title class="number pa-0 pb-7">{{
            this.board.booksRented.toString().padStart(2, 0)
          }}</v-card-title>
          <v-card-subtitle class="name pa-0"
            >Rented Book Volumes
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
            this.board.users.toString().padStart(2, 0)
          }}</v-card-title>
          <v-card-subtitle class="name pa-0">Users</v-card-subtitle>
        </div>
      </v-card>
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
        this.board.booksTotal = res.data
          .map((i) => i.quantity)
          .reduce((a, b) => a + b);
        this.board.booksRented = res.data
          .map((i) => i.quantity - i.quantityAvailable)
          .reduce((a, b) => a + b);
      });
      await book.getAvailable().then((res) => {
        this.board.booksAvailable = res.data.length;
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
