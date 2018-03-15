import { bootstrap, mapComputedFactory } from 'src/utilities/vuex';
import sandbox from './sandbox/store';

export default bootstrap({
  namespaced: true,
  modules: {
    sandbox,
  },
});

export const mapComputed = mapComputedFactory('pages/misc');
