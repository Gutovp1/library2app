<template>
  <v-dialog v-model="dialog" max-width="500px">
    <v-card>
      <v-card-title>
        <span class="text-h5">Sign Up</span>
      </v-card-title>

      <v-card-text>
        <v-form class="mx-2" ref="form">
          <v-text-field
            v-model="editedItem.Email"
            name="Email"
            label="Email*"
            :rules="rulesReqMaxMin.concat(rulesEmail)"
          ></v-text-field>
          <v-text-field
            v-model="editedItem.Password"
            name="Password"
            label="Password*"
            :rules="rulesReqMaxMin"
            hint="Password must contain at least 4 characters."
          ></v-text-field>
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="close"> Cancel </v-btn>
        <v-btn color="blue darken-1" text @click="submit"> Submit </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import Admin from "../../apiservices/admin.js";
import { useAuthToken } from "@/store/authToken";

export default {
  data: () => ({
    rulesReqMaxMin: [
      (v) => !!v || "This field is required.",
      (v) =>
        (v && v.length <= 100) || "Field must have less than 100 characters.",
      (v) => (v && v.length >= 4) || "Field must have more than 3 characters.",
    ],
    rulesEmail: [
      (v) =>
        /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()\\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          v
        ) || "E-mail must be valid",
    ],
    admins: [],
    dialog: false,
    editedIndex: -1,
    editedItem: {
      Email: "",
      Password: "",
    },
    defaultItem: {
      Email: "",
      Password: "",
    },
  }),

  setup() {
    const store = useAuthToken();
    return { store };
  },

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      this.dialog = true;
    },
    submit() {
      if (this.$refs.form.validate()) {
        this.save();
      }
    },
    async save() {
      await Admin.login(this.editedItem)
        .then((r) => {
          this.$swal({
            title: "Success",
            text: "Admin is logged!",
            icon: "success",
            allowOutsideClick: false,
          });
          console.log(r);
          this.store.setToken(r.data.accessToken);
          console.log(this.store.getToken);
          this.$router.push("/");
        })
        .catch(() => {
          this.$swal({
            title: "Error",
            text: "Email or password is wrong.",
            icon: "error",
            allowOutsideClick: false,
          });
        });
      this.initialize();
    },

    close() {
      this.$refs.form.resetValidation();
      this.dialog = false;
      this.$router.push("/");
    },
  },
};
</script>
