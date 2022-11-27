import { defineStore } from "pinia";
import { computed } from "vue";

export const useAuthToken = defineStore("adminJwt", {
  state: () => ({
    adminJwt: "",
  }),
  getters: {
    getToken() {
      return computed(() => this.adminJwt);
    },
  },
  actions: {
    setToken(val) {
      this.adminJwt = "Bearer " + val;
      localStorage.setItem("adminJwt", this.adminJwt);
    },
  },
});
