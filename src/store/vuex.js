import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const state = {
  adminJwt: null,
};

const store = new Vuex.Store({
  state,
  getters: {
    adminJwt: (state) => {
      return state.adminJwt;
    },
  },
  actions: {
    adminJwt(context, adminJwt) {
      context.commit("adminJwt", adminJwt);
    },
  },
  mutations: {
    adminJwt(state, adminJwt) {
      state.adminJwt = adminJwt;
    },
  },
});

export default store;
