<template>
  <v-data-table
    :headers="headers"
    :items="books"
    :items-per-page="-1"
    :search="search"
    sort-by="id"
    class="elevation-1"
    loading="items"
    loading-text="Loading data... Please wait."
    no-results-text="No books found."
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>BOOKS</v-toolbar-title>
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
              New Book
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-form class="mx-2" ref="form">
                <v-text-field
                  v-model="editedItem.title"
                  :rules="rulesRequired.concat(rulesMaxMin)"
                  label="Title"
                  count
                ></v-text-field>
                <v-text-field
                  v-model="editedItem.author"
                  :rules="rulesRequired.concat(rulesMaxMin)"
                  label="Author"
                ></v-text-field>
                <v-select
                  v-model="editedItem.publisherId"
                  :items="publishers"
                  :item-text="'name'"
                  :item-value="'id'"
                  :rules="rulesRequired"
                  menu-props="auto"
                  label="Publisher"
                ></v-select>
                <v-text-field
                  v-model="editedItem.quantity"
                  :rules="rulesRequired.concat(rulesInteger)"
                  label="Quantity"
                ></v-text-field>
                <v-text-field
                  v-model="editedItem.year"
                  :rules="rulesRequired.concat(rulesYear)"
                  label="Year"
                ></v-text-field>
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
      <v-tooltip bottom color="orange">
        <template v-slot:activator="{ on, attrs }">
          <v-icon
            color="orange"
            v-bind="attrs"
            v-on="on"
            class="mr-2"
            @click="editItem(item)"
          >
            mdi-pencil
          </v-icon>
        </template>
        <span>Edit</span>
      </v-tooltip>
      <v-tooltip bottom color="red">
        <template v-slot:activator="{ on, attrs }">
          <v-icon
            color="red"
            v-bind="attrs"
            v-on="on"
            @click="deleteItem(item)"
          >
            mdi-delete
          </v-icon>
        </template>
        <span>Delete</span>
      </v-tooltip>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize"> Refresh Books</v-btn>
    </template>
    <!-- eslint-disable-next-line -->
    <template v-slot:item.quantity="{ item }">
      <v-chip color="primary" dark>
        {{ item.quantity }}
      </v-chip>
    </template>
    <!-- eslint-disable-next-line -->
    <template v-slot:item.quantityAvailable="{ item }">
      <v-chip :color="getColor(item.quantityAvailable)" dark>
        {{ item.quantityAvailable }}
      </v-chip>
    </template>
  </v-data-table>
</template>

<script>
import Book from "../../apiservices/Book.js";
import Publisher from "../../apiservices/Publisher.js";

export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    search: "",
    rulesRequired: [(v) => !!v || "This field is required."],
    rulesMaxMin: [
      (v) =>
        (v && v.length <= 100) || "Field must have less than 100 characters.",
      (v) => (v && v.length >= 4) || "Field must have more than 3 characters.",
    ],
    rulesInteger: [(v) => /^[0-9]+$/.test(v) || "Enter only numbers."],
    rulesYear: [
      (v) => /^[0-9]{4}$/.test(v) || "Enter a valid year containing 4 numbers.",
    ],
    headers: [
      {
        text: "Id",
        align: "start",
        sortable: false,
        value: "id",
        class: "primary",
      },
      { text: "Title", value: "title", class: "primary" },
      { text: "Author", value: "author", class: "primary" },
      { text: "Publisher", value: "publisherName", class: "primary" },
      { text: "Quantity", value: "quantity", class: "primary" },
      { text: "Available", value: "quantityAvailable", class: "primary" },
      { text: "Year", value: "year", class: "primary" },
      { text: "Actions", value: "actions", class: "primary", sortable: false },
    ],
    books: [],
    editedIndex: -1,
    editedItem: {
      id: "",
      title: "",
      author: "",
      publisherId: "",
      quantity: "",
      quantityAvailable: "",
      year: "",
    },
    defaultItem: {
      id: "",
      title: "",
      author: "",
      publisherId: "",
      quantity: "",
      year: "",
    },
    publishers: [],
    editedPublisher: {
      id: "",
      name: "",
      city: "",
    },
    defaultPublisher: {
      id: "",
      name: "",
      city: "",
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Book" : "Edit Book";
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
      //get all books
      await Publisher.getAll().then((response) => {
        this.publishers = response.data;
      }),
        await Book.getAll().then((res) => {
          this.books = res.data;
        });
    },

    editItem(item) {
      this.editedIndex = this.books.indexOf(item);
      this.editedItem = { ...item }; //Object assign does not work properly here
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.books.indexOf(item);
      this.editedItem = { ...item };
      this.dialogDelete = true;
    },

    async deleteItemConfirm() {
      await Book.deleteBook(this.editedItem).then((res) => {
        console.log(res.data);
        this.initialize();
        this.closeDelete();
      });
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = { ...this.defaultItem };
        // this.editedPublisher = { ...this.defaultPublisher }; ////
        this.editedIndex = -1;
      });
      this.$refs.form.resetValidation();
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = { ...this.defaultItem };
        // this.editedPublisher = { ...this.defaultPublisher }; /////
        this.editedIndex = -1;
      });
    },
    create() {
      this.dialog = true;
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
          const bookResponse = await Book.createBook(this.editedItem);
          console.log(bookResponse.data);
          this.initialize();
          this.close();
        } else {
          const bookResponse = await Book.editBook(this.editedItem);
          console.log(bookResponse.data);
          this.initialize();
          this.close();
        }
      }
    },
    getColor(q) {
      if (q > 8) return "green";
      else if (q > 4) return "orange";
      else return "red";
    },
  },
};
</script>
