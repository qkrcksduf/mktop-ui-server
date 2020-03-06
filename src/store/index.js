import Vue from 'vue';
import Vuex from 'vuex';
import { getAuthFromCookie, getUserFromCookie } from '@/utils/cookies';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    name: getUserFromCookie() || '',
    token: getAuthFromCookie() || '',
    drawer: true,
    mainPage: false,
  },
  getters: {
    getDrawer(state) {
      return state.drawer;
    },
    isLogin(state) {
      return state.name !== '';
    },
    isMain(state) {
      return state.main;
    },
  },
  mutations: {
    clearToken(state) {
      state.token = '';
    },
    setMain(state) {
      state.mainPage = !state.mainPage;
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
