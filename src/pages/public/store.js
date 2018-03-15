import { bootstrap } from 'src/utilities/vuex';
import home from './home/store';
import login from './login/store';

export default bootstrap({
  namespaced: true,
  state: {},
  modules: {
    home,
    login,
  },
});
