import { bootstrap, mapComputedFactory } from 'src/utilities/vuex';

export default bootstrap({
  namespaced: true,
  state: {
    loading: false,
  },
  modules: {},
});

export const mapComputed = mapComputedFactory('pages/misc/sandbox');
