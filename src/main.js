import Vue from 'vue';
import Router from 'vue-router';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import App from './App.vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.use(Router);
// Install BootstrapVue
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);

Vue.config.productionTip = false;

Vue.mixin({
  methods: {
    capitalizeFirstLetter: (str) => str.charAt(0).toUpperCase() + str.slice(1),
    formatCurrency(num) {
      const result = new Intl.NumberFormat('de-DE', {
        style: 'currency',
        currency: 'EUR',
      }).format(num);
      return result;
    },
    // TODO: Proper internationlization
    getCurrencySymbol() {
      const result = new Intl.NumberFormat('de-DE', {
        style: 'currency',
        currency: 'EUR',
      }).formatToParts(0).find((x) => x.type === 'currency').value;
      return result;
    },
  },
});

new Vue({
  render: (h) => h(App),
}).$mount('#app');
