import Vue from 'vue';
import Vuex from 'vuex';
import store from 'src/store';
import config from 'src/config/store';

Vue.use(Vuex);

export default new Vuex.Store({ ...config, ...store });
