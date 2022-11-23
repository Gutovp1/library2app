import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import vswa2 from "vue-sweetalert2";

import "sweetalert2/dist/sweetalert2.min.css";

Vue.config.productionTip = false;
Vue.use(vswa2);

new Vue({
  router,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
