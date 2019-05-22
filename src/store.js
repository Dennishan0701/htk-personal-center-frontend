/* eslint-disable */

import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    accessToken: '',
    openId: undefined,
  },
  mutations: {
    changeToken(state, value) {
      state.accessToken = value;
    },
    saveOpenId(state, value) {
      state.openId = value
    }
  },
  actions: {},
  plugins: [createPersistedState()],
});
