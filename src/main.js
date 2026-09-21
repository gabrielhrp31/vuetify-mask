import Vue from "vue";
import App from "./App.vue";
import vuetify from "@/plugins/vuetify.js";
import VuetifyMask from "../index.js";

Vue.config.productionTip = false;
Vue.use(VuetifyMask);

new Vue({
  vuetify,
  render: h => h(App)
}).$mount("#app");
