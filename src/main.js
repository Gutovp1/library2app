import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import vswa2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import store from "./store/vuex";

Vue.use(vswa2);
Vue.config.productionTip = false;

new Vue({
  router,
  vuetify,
  store,
  render: (h) => h(App),
}).$mount("#app");
