import Vue from "vue";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import "@mdi/font/css/materialdesignicons.css";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    dark: true,
    themes: {
      dark: {
        primary: "#3ecf8e",
        secondary: "#5b9fd4",
        accent: "#3ecf8e",
        error: "#f07178",
        info: "#5b9fd4",
        success: "#3ecf8e",
        warning: "#e6b450",
        background: "#0f1419"
      }
    }
  },
  icons: { iconfont: "mdi" }
});
