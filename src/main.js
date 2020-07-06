import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Toastr from 'vue-toastr'
//import '@/assets/css/style.css'
export const EventBus = new Vue();


/* == DEFAULT GLOBAL OPTIONS == */
Vue.use(Toastr, {
  defaultPosition: "toast-top-right",
  defaultTimeout: 5000,
  defaultCloseOnHover: true,
})

Vue.config.productionTip = false

Vue.directive("focus", {
  inserted: el => {
    el.focus();
  }
});



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
