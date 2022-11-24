import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import vswa2 from "vue-sweetalert2";

import "sweetalert2/dist/sweetalert2.min.css";
import { createPinia, PiniaVuePlugin } from 'pinia'
import VueCompositionAPI from '@vue/composition-api'

Vue.use(PiniaVuePlugin)
const pinia = createPinia()
Vue.use(VueCompositionAPI)

Vue.config.productionTip = false;
Vue.use(vswa2);

new Vue({
  router,
  vuetify,
  pinia,
  render: (h) => h(App)
}).$mount("#app");
