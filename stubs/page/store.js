import { bootstrap, mapComputedFactory } from 'src/utilities/vuex';
import sub1 from './sub-1/store';

export default bootstrap({
  namespaced: true,
  state: {
    loading: false,
  },
  modules: {
    sub1,
  },
});

export const mapComputed = mapComputedFactory('pages/example');
