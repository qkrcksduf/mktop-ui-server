import Vue from 'vue';
import App from './App.vue';
import { router } from './routes';
import vuetify from './plugins/vuetify';
import store from '@/store/index';
import cors from 'cors';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  cors,
  render: h => h(App),
}).$mount('#app');
