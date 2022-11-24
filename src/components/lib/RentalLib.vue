<template>
  <v-data-table
    :headers="headers"
    :items="rentals"
    :items-per-page="-1"
    :search="search"
    sort-by="id"
    class="elevation-1"
    loading="items"
    loading-text="Loading data... Please wait."
    no-results-text="No rentals found."
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
            <v-btn
              color="primary"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
              @click="create"
            >
              New Rental
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-form class="mx-2" ref="form">
                <v-select
                  v-if="!returnBook"
                  v-model="editedItem.bookId"
                  :items="books"
                  :item-text="'title'"
                  :item-value="'id'"
                  :rules="rulesRequired"
                  menu-props="auto"
                  label="Book"
                ></v-select>
                <v-select
                  v-if="!returnBook"
                  v-model="editedItem.userId"
                  :rules="rulesRequired"
                  :items="users"
                  :item-text="'name'"
                  :item-value="'id'"
                  menu-props="auto"
                  label="User"
                ></v-select>

                <v-menu
                  v-if="!returnBook"
                  ref="menuDate1"
                  v-model="menuDate1"
                  :return-value.sync="editedItem.rentDate"
                  :close-on-click="false"
                  :close-on-content-click="false"
                  offset-y
                  offset-x
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-bind="attrs"
                      v-on="on"
                      v-model="editedItem.rentDate"
                      :rules="rulesRequired"
                      label="Rental date"
                    ></v-text-field>
                  </template>
                  <template>
                    <v-row justify="space-around" align="center">
                      <!-- :format="'dd / MM / yyyy'"-->
                      <v-date-picker
                        v-model="editedItem.rentDate"
                        :min="picker"
                        no-title
                        scrollable
                        elevation="15"
                      >
                        <v-spacer></v-spacer>
                        <v-btn
                          color="blue darken-1"
                          text
                          @click="menuDate1 = false"
                        >
                          Cancel
                        </v-btn>
                        <v-btn
                          color="blue darken-1"
                          text
                          @click="$refs.menuDate1.save(editedItem.rentDate)"
                        >
                          Save
                        </v-btn>
                      </v-date-picker>
                    </v-row>
                  </template>
                </v-menu>

                <v-menu
                  v-if="!returnBook"
                  ref="menuDate2"
                  v-model="menuDate2"
                  :return-value.sync="editedItem.returnDate"
                  :close-on-click="false"
                  :close-on-content-click="false"
                  offset-y
                  offset-x
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-bind="attrs"
                      v-on="on"
                      v-model="editedItem.returnDate"
                      :rules="rulesRequired"
                      label="Deadline to return"
                    ></v-text-field>
                  </template>
                  <template>
                    <v-row justify="space-around" align="center">
                      <v-date-picker
                        v-model="editedItem.returnDate"
                        :min="editedItem.rentDate"
                        no-title
                        scrollable
                        elevation="15"
                      >
                        <v-spacer></v-spacer>
                        <v-btn color="primary" text @click="menuDate2 = false">
                          Cancel
                        </v-btn>
                        <!-- color="blue darken-1" -->
                        <v-btn
                          color="primary"
                          text
                          @click="$refs.menuDate2.save(editedItem.returnDate)"
                        >
                          Save
                        </v-btn>
                      </v-date-picker>
                    </v-row>
                  </template>
                </v-menu>
                <v-menu
                  v-if="returnBook"
                  ref="menuDate2"
                  v-model="menuDate2"
                  :close-on-content-click="false"
                  :return-value.sync="editedItem.returnRealDate"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <!-- append-icon="mdi-calendar" -->
                    <!-- readonly -->
                    <v-text-field
                      v-model="editedItem.returnRealDate"
                      label="Return Date"
                      v-bind="attrs"
                      v-on="on"
                      :rules="rulesRequired"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="editedItem.returnRealDate"
                    :min="editedItem.rentDate"
                    no-title
                    scrollable
                  >
                    <v-spacer></v-spacer>

                    <v-btn text color="primary" @click="menuDate2 = false">
                      Cancel
                    </v-btn>
                    <v-btn
                      text
                      color="primary"
                      @click="$refs.menuDate2.save(editedItem.returnRealDate)"
                    >
                      OK
                    </v-btn>
                  </v-date-picker>
                </v-menu>
              </v-form>
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
    <template v-slot:[`item.actions`]="{ item }">
      <v-tooltip bottom color="blue">
        <template v-slot:activator="{ on, attrs }">
          <v-icon
            v-if="!item.returnRealDate"
            v-bind="attrs"
            v-on="on"
            color="blue"
            class="mr-2"
            @click="returnItem(item)"
          >
            mdi-book-check
          </v-icon>
        </template>
        <span>Return</span>
      </v-tooltip>

      <v-tooltip bottom color="red">
        <template v-slot:activator="{ on, attrs }">
          <v-icon
            v-if="item.returnRealDate"
            v-bind="attrs"
            v-on="on"
            color="red"
            @click="deleteItem(item)"
          >
            mdi-delete
          </v-icon>
        </template>
        <span>Delete</span>
      </v-tooltip>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize"> Refresh Rentals</v-btn>
    </template>
    <template v-slot:[`item.returnRealDate`]="{ item }">
      {{
        item.returnRealDate != ""
          ? item.returnRealDate > item.returnDate
            ? `${item.returnRealDate}   (Overdue)`
            : `${item.returnRealDate}`
          : "Pending"
      }}
    </template>
  </v-data-table>
</template>

<script>
import Rental from "../../apiservices/rental.js";
import Book from "../../apiservices/book.js";
import User from "../../apiservices/user.js";

export default {
  data: () => ({
    dialog: false,
    returnBook: false,
    dialogDelete: false,
    search: "",
    // picker: null,
    picker: new Date().toISOString().substr(0, 10),
    menuDate1: "",
    menuDate2: "",
    // menuDate3: "",
    rulesRequired: [(v) => !!v || "This field is required."],
    headers: [
      {
        text: "ID",
        align: "start",
        sortable: false,
        value: "id",
        class: "primary text-h6",
      },
      { text: "BOOK", value: "bookTitle", class: "primary text-h6" },
      { text: "USER", value: "userName", class: "primary text-h6" },
      { text: "RENTAL DATE", value: "rentDate", class: "primary text-h6" },
      {
        text: "DUE DATE",
        value: "returnDate",
        class: "primary text-h6",
      },
      {
        text: "RETURN DATE",
        value: "returnRealDate",
        class: "primary text-h6",
      },
      {
        text: "ACTIONS",
        value: "actions",
        class: "primary text-h6",
        sortable: false,
      },
    ],
    rentals: [],
    editedIndex: -1,
    editedItem: {
      id: "",
      bookId: "",
      userId: "",
      rentDate: "",
      returnDate: "",
      returnRealDate: "",
    },
    defaultItem: {
      id: "",
      bookId: "",
      userId: "",
      rentDate: "",
      returnDate: "",
      returnRealDate: "",
    },
    books: [],
    users: [],
    // editedBook: {
    //   id: "",
    //   title: "",
    //   author: "",
    //   publisherId: "",
    //   quantity: "",
    //   year: "",
    // },
    // defaultBook: {
    //   id: "",
    //   title: "",
    //   author: "",
    //   publisherId: "",
    //   quantity: "",
    //   year: "",
    // },
    // editedUser: {
    //   id: "",
    //   name: "",
    //   address: "",
    //   city: "",
    //   email: "",
    // },
    // defaultUser: {
    //   id: "",
    //   name: "",
    //   address: "",
    //   city: "",
    //   email: "",
    // },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1
        ? "New Rental"
        : `Finish Rental (due date: ${this.editedItem.returnDate})`;
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
    // picker: this.editedItem.rentDate,
  },

  created() {
    this.initialize();
  },

  methods: {
    async initialize() {
      //get all rentals
      await User.getAll().then((res) => {
        this.users = res.data;
      }),
        await Book.getAvailable().then((resp) => {
          this.books = resp.data;
        }),
        await Rental.getAll().then((respo) => {
          this.rentals = respo.data;
        });
    },

    returnItem(item) {
      this.editedIndex = this.rentals.indexOf(item);
      this.editedItem = { ...item };
      this.dialog = true;
      this.returnBook = true;
    },

    deleteItem(item) {
      this.editedIndex = this.rentals.indexOf(item);
      this.editedItem = { ...item };
      this.dialogDelete = true;
    },

    async deleteItemConfirm() {
      await Rental.deleteRental(this.editedItem).then((res) => {
        console.log(res.data);
        this.initialize();
        this.closeDelete();
      });
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = { ...this.defaultItem };
        this.editedIndex = -1;
      });
      this.$refs.form.resetValidation();
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = { ...this.defaultItem };
        this.editedIndex = -1;
      });
    },

    create() {
      this.dialog = true;
      this.returnBook = false;
      this.$nextTick(() => {
        this.editedItem = { ...this.defaultItem };
        // this.editedPublisher = { ...this.defaultPublisher }; /////
        this.editedIndex = -1;
      });
    },

    async save() {
      if (this.$refs.form.validate()) {
        if (!this.editedItem.id) {
          delete this.editedItem.id; //id will be created in db
          await Rental.createRental(this.editedItem);
        } else {
          await Rental.editRental(this.editedItem);
        }
        this.initialize();
        this.close();
      }
    },
  },
};
</script>
