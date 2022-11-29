<template>
  <div class="dashboard">
    <v-card class="card-login">
      <v-icon color="black" size="64px">mdi-account-edit</v-icon>
      <h4 class="card-info">You need to login to manage the library assets.</h4>
      <v-btn color="primary" @click="dialog = true">Login</v-btn>
    </v-card>
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="text-h5">Sign In</span>
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
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :type="showPassword ? 'text' : 'password'"
              @click:append="showPassword = !showPassword"
            ></v-text-field>
          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="close"> Cancel </v-btn>
          <v-btn color="blue darken-1" text @click="submit"> Login </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import Admin from "../../apiservices/admin.js";

export default {
  data: () => ({
    rulesReqMaxMin: [
      (v) => !!v || "This field is required.",
      (v) =>
        (v && v.length <= 100) || "Field must have less than 100 characters.",
      (v) => (v && v.length >= 4) || "Field must have at least 3 characters.",
    ],
    rulesEmail: [
      (v) =>
        /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()\\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          v
        ) || "E-mail must be valid",
    ],
    admins: [],
    dialog: false,
    showPassword: "",
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
          localStorage.setItem("adminJwt", "Bearer " + r.data.accessToken);
          this.$store.dispatch("adminJwt", "Bearer " + r.data.accessToken); //
          this.$router.push("/");
          location.reload();
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
      // this.$router.push("/");
    },
  },
};
</script>

<style scoped>
.v-main__wrap {
  display: flex;
}
.home {
  width: 100vw;
}
.dashboard {
  display: flex;
  /* margin: 20px; */
  height: 88vh;
  justify-content: center;
  align-items: center;
  background-color: darkgray;
}

.card-login {
  padding: 20px 65px;
  width: 30vw;
  display: flex;
  gap: 15px;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.card-info {
  font-size: 22px;
  font-weight: 600;
}
</style>
