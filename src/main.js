import Vue from 'vue';
import App from './App.vue';
import { router } from './routes';
import vuetify from './plugins/vuetify';
import store from '@/store/index';
import { initMqttClient } from '@/utils/mqtt.client';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app');

function init() {
  initMqttClient();
}

init();
