import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./vuex/index";
import "vant/lib/index.css";
import "./assets/style/phone-reset.css";
import "./assets/style/base.css";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
