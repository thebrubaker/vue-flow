import { bootstrap, mapComputedFactory } from 'src/utilities/vuex';
import dashboard from './dashboard/store';

export default bootstrap({
  namespaced: true,
  state: {
    transitionName: 'fade',
    transitionMode: 'out-in',
  },
  modules: {
    dashboard,
  },
});

export const mapComputed = mapComputedFactory('pages/private');
