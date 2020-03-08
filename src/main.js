import Vue from 'vue';
import Router from 'vue-router';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
// import { v4 as uuidv4 } from 'uuid';
import App from './App.vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.use(Router);
// Install BootstrapVue
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);
// Vue.use(uuidv4);

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#app');
