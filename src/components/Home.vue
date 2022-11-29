<template>
  <div class="home">
    <div class="dashboard c000 rounded-lg">
      <div class="cards">
        <v-card
          class="card d-flex align-center justify-space-between rounded-lg pa-6"
        >
          <template class="card-content">
            <div>
              <v-card-subtitle class="name pa-0">Book Titles</v-card-subtitle>
              <v-card-title class="number pa-0 pb-7">{{
                this.board.books.toString().padStart(2, 0)
              }}</v-card-title>
            </div>
            <v-icon class="card-icon">mdi-bookshelf</v-icon>
          </template>
        </v-card>
        <v-card
          class="card d-flex align-center justify-space-between rounded-lg pa-6"
        >
          <template class="card-content">
            <div>
              <v-card-subtitle class="name pa-0"
                >Available Titles
              </v-card-subtitle>
              <v-card-title class="number pa-0 pb-7">{{
                this.board.booksAvailable.toString().padStart(2, 0)
              }}</v-card-title>
            </div>
            <v-icon class="card-icon">mdi-book-open-variant</v-icon>
          </template>
        </v-card>
        <v-card
          class="card d-flex align-center justify-space-between rounded-lg pa-6"
        >
          <template class="card-content">
            <div>
              <v-card-subtitle class="name pa-0"
                >Total Publishers</v-card-subtitle
              >
              <v-card-title class="number pa-0 pb-7">{{
                this.board.publishers.toString().padStart(2, 0)
              }}</v-card-title>
            </div>
            <v-icon class="card-icon">mdi-domain </v-icon>
          </template>
        </v-card>
        <v-card
          class="card d-flex align-center justify-space-between rounded-lg pa-6"
        >
          <template class="card-content">
            <div>
              <v-card-subtitle class="name pa-0">Total Users</v-card-subtitle>
              <v-card-title class="number pa-0 pb-7">{{
                this.board.users.toString().padStart(2, 0)
              }}</v-card-title>
            </div>
            <v-icon class="card-icon">mdi-account-multiple</v-icon>
          </template>
        </v-card>
      </div>
      <div class="charts">
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
      </div>
    </div>
  </div>
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
      rentedBooks: 0,
      availableBooks: 0,
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
      this.filteredBookData.rentedBooks = this.board.booksRented;
      this.filteredBookData.availableBooks =
        this.board.booksTotal - this.board.booksRented;
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
<style scoped>
.home {
  padding: 1vh 0;
  /* padding-bottom: 1vh; */
  width: 100vw;
  /* background-image: url(../assets/library-bgi.png);
  background-image: repeat; */
  background-color: darkgray;
}
.dashboard {
  margin: 20px 100px;
  height: 85vh;
}

.cards {
  width: 100%;
  padding: 30px 15px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 20px;
}

.number {
  font-size: 30px;
  font-weight: 500;
  color: #1976d2;
  margin-top: 10px;
}
.name {
  font-size: 22px;
  font-weight: 600;
}
.card-icon {
  font-size: 40px;
  color: #1976d2;
}
.card-content {
  display: flex;
}
.charts {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;
  width: 100%;
  padding: 20px;
  padding-top: 0;
}
.chart {
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  width: 100%;
  overflow: hidden;
}
#radarChart {
  width: 100%;
  height: 40vh;
}
.chartComp {
  height: 100%;
}

@media only screen and (max-width: 1050px) {
  .dashboard {
    margin: 20px 20px;
    height: auto;
  }
  .cards {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
  }

  .charts {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr;
  }
}

@media only screen and (max-width: 600px) {
  .cards {
    grid-template-columns: repeat(1, 1fr);
    grid-template-rows: repeat(1, 1fr);
  }
}
</style>
