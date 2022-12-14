<template>
  <v-data-table
    :headers="headers"
    :items="publishers"
    :items-per-page="-1"
    :search="search"
    sort-by="id"
    class="elevation-1"
    loading="items"
    loading-text="Loading data... Please wait."
    no-results-text="No publishers found."
  >
    <template v-slot:top>
      <v-toolbar flat class="toolbar">
        <v-toolbar-title>PUBLISHERS</v-toolbar-title>
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
              New Publisher
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-form class="mx-2" ref="form">
                <v-text-field
                  v-model="editedItem.name"
                  label="Publisher Name*"
                  :rules="[rules.required, rules.min, rules.max]"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="editedItem.city"
                  label="Publisher City*"
                  :rules="[rules.required, rules.min, rules.max]"
                  required
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
      <v-btn color="primary" @click="initialize"> Refresh Publishers</v-btn>
    </template>
  </v-data-table>
</template>

<script>
import Publisher from "../../apiservices/Publisher.js";

export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    search: "",
    rules: {
      required: (content) => !!content || "This field is required.",
      max: (content) =>
        content.length <= 100 || "Field must have less than 100 characters.",
      min: (content) =>
        content.length >= 4 || "Field must have more than 3 characters.",
    },
    headers: [
      {
        text: "ID",
        align: "start",
        sortable: false,
        value: "id",
        class: "primary text-h6",
      },
      { text: "NAME", value: "name", class: "primary text-h6" },
      { text: "CITY", value: "city", class: "primary text-h6" },
      {
        text: "ACTIONS",
        value: "actions",
        class: "primary text-h6",
        sortable: false,
      },
    ],
    publishers: [],
    editedIndex: -1,
    editedItem: {
      id: "",
      name: "",
      city: "",
    },
    defaultItem: {
      id: "",
      name: "",
      city: "",
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Publisher" : "Edit Publisher";
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
      //get all publishers
      const publisherResponse = await Publisher.getAll();
      this.publishers = publisherResponse.data;
    },

    editItem(item) {
      this.editedIndex = this.publishers.indexOf(item);
      this.editedItem = Object.assign({}, item);
      // console.log(this.editedItem.id);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.publishers.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    async deleteItemConfirm() {
      await Publisher.deletePublisher(this.editedItem)
        .then((res) => {
          this.$swal({
            title: "Success",
            text: res.data,
            icon: "success",
            allowOutsideClick: false,
          });
        })
        .catch((err) => {
          if (err.response.status === 401) {
            err.response.data = "You need to login to continue.";
            this.$router.push("/login");
          }
          this.$swal({
            title: "Error",
            text: err.response.data,
            icon: "error",
            allowOutsideClick: false,
          });
          console.log(err.response);
        });
      this.initialize();
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
      this.$refs.form ? this.$refs.form.resetValidation() : "";
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    create() {
      this.dialog = true;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    async save() {
      if (this.$refs.form.validate()) {
        if (!this.editedItem.id) {
          const { name, city } = this.editedItem;
          await Publisher.createPublisher({
            name,
            city,
          })
            .then((res) => {
              this.$swal({
                title: "Success",
                text: `Publisher ${res.data.name} has been created successfully.`,
                icon: "success",
                allowOutsideClick: false,
              });
            })
            .catch((err) => {
              if (err.response.status === 401) {
                err.response.data = "You need to login to continue.";
                this.$router.push("/login");
              }
              this.$swal({
                title: "Error",
                text: err.response.data,
                icon: "error",
                allowOutsideClick: false,
              });
            });
        } else {
          await Publisher.editPublisher(this.editedItem)
            .then((res) => {
              this.$swal({
                title: "Success",
                text: `Publisher ${res.data.name} has been edited successfully.`,
                icon: "success",
                allowOutsideClick: false,
              });
            })
            .catch((err) => {
              if (err.response.status === 401) {
                err.response.data = "You need to login to continue.";
                this.$router.push("/login");
              }
              this.$swal({
                title: "Error",
                text: err.response.data,
                icon: "error",
                allowOutsideClick: false,
              });
            });
        }
        this.initialize();
        this.close();
      }
    },
  },
};
</script>
