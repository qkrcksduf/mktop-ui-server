import Vue from 'vue';
import Vuex from 'vuex';
import { getAuthFromCookie, getUserFromCookie } from '@/utils/cookies';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    name: getUserFromCookie() || '',
    token: getAuthFromCookie() || '',
    drawer: true,
  },
  getters: {
    getDrawer(state) {
      return state.drawer;
    },
    isLogin(state) {
      return state.name !== '';
    },
  },
  mutations: {
    clearToken(state) {
      state.token = '';
    },
    setToken(state, token) {
      state.token = token;
    },
    clearName(state) {
      state.name = '';
    },
    setName(state, name) {
      state.name = name;
    },
    setDrawer(state) {
      state.drawer = !state.drawer;
    },
  },
});
