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
      <v-card class="chart d-flex flex-column align-center">
        <h2>Rental Overview</h2>
        <div id="radarChart" :class="loaders">
          <DoughnutRental
            v-if="exposeChart"
            :data="filteredRentalDates"
            class="chartComp"
          />
          <!-- <half-circle-spinner
            v-else
            :animation-duration="1000"
            :size="60"
            :color="'#FF7E55'"
          /> -->
        </div>
      </v-card>
      <v-card class="chart d-flex flex-column align-center">
        <h2>Book Overview</h2>
        <div id="radarChart" :class="loaders">
          <DoughnutBook
            v-if="exposeChart"
            :data="filteredBookData"
            class="chartComp"
          />
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
import DoughnutRental from "./lib/DoughnutRental.vue";
import DoughnutBook from "./lib/DoughnutBook.vue";

export default {
  name: "HomeView",
  components: {
    DoughnutRental,
    DoughnutBook,
  },

  data: () => ({
    exposeChart: false,
    board: {
      users: 0,
      books: 0,
      booksAvailable: 0,
      publishers: 0,
      rentals: 0,
      booksTotal: 0,
      booksRented: 0,
    },
    currentYear: new Date().getFullYear(),
    rentals: [],
    filteredRentalDates: {
      pending: 0,
      returnedOnTime: 0,
      returnedOverdue: 0,
    },
    filteredBookData: {
      titles: 0,
      availableTitles: 0,
      totalVolumes: 0,
    },
  }),
  computed: {
    loaders() {
      return this.exposeChart ? false : "d-flex justify-center align-center";
    },
  },

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
        this.rentals = res.data;
        console.log(this.rentals);
      });
      this.filterRentalStates(this.rentals);
      this.filteredBookData.titles = this.board.books;
      this.filteredBookData.availableTitles = this.board.booksAvailable;
      this.filteredBookData.totalVolumes = this.board.booksTotal;
      this.exposeChart = true;
    },

    filterRentalStates(rentals) {
      rentals.forEach((rental) => {
        if (rental.returnRealDate === "") {
          this.filteredRentalDates.pending += 1;
        } else {
          if (rental.returnRealDate <= rental.returnDate) {
            this.filteredRentalDates.returnedOnTime += 1;
          } else {
            this.filteredRentalDates.returnedOverdue += 1;
          }
        }
      });
    },
  },
};
</script>
