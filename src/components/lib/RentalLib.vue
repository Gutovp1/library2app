<template>
  <v-data-table
    :headers="headers"
    :items="rentals"
    :search="search"
    sort-by="id"
    class="elevation-1"
    loading="items"
    loading-text="Loading data... Please wait."
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>RENTALS</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
              New Rental
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <!-- <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.id"
                      label="Id"
                    ></v-text-field>
                  </v-col> -->
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.bookTitle"
                      label="Book"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.userName"
                      label="User"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.rentDate"
                      label="Rental Date"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.returnDate"
                      label="Return Date"
                    ></v-text-field>
                  </v-col>
                  <!-- <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.year"
                      label="Year"
                    ></v-text-field>
                  </v-col> -->
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close"> Cancel </v-btn>
              <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5"
              >Are you sure you want to delete this item?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete"
                >Cancel</v-btn
              >
              <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                >OK</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <!-- <template v-slot:item.actions="{ item }"> -->
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
      <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize"> Refresh Rentals</v-btn>
    </template>
  </v-data-table>
</template>

<script>
import Rental from "../../apiservices/Rental.js";

export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    search: "",
    headers: [
      {
        text: "ID",
        align: "start",
        sortable: false,
        value: "id",
      },
      { text: "Book", value: "bookTitle" },
      { text: "User", value: "userName" },
      { text: "Rental Date", value: "rentDate" },
      { text: "Return Date", value: "returnDate" },
      // { text: "Year", value: "year" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    rentals: [],
    editedIndex: -1,
    editedItem: {
      id: "",
      bookTitle: "",
      userName: "",
      rentDate: "",
      returnDate: "",
      // year: "",
    },
    defaultItem: {
      id: "",
      bookTitle: "",
      userName: "",
      rentDate: "",
      returnDate: "",
      // year: "",
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Rental" : "Edit Rental";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  created() {
    this.initialize();
  },

  methods: {
    async initialize() {
      //get all rentals
      const rentalResponse = await Rental.getAll();
      this.rentals = rentalResponse.data;
    },

    editItem(item) {
      this.editedIndex = this.rentals.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.rentals.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.rentals.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.rentals[this.editedIndex], this.editedItem);
      } else {
        this.rentals.push(this.editedItem);
      }
      this.close();
    },
  },
};
</script>

<!--
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
-->

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!--
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
