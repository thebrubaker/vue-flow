import { bootstrap } from 'src/utilities/vuex';
import publicPages from 'src/pages/public/store';
import privatePages from 'src/pages/private/store';
import miscPages from 'src/pages/misc/store';

export default bootstrap({
  namespaced: true,
  state: {
    transitionName: 'fade',
    transitionMode: 'out-in',
  },
  modules: {
    public: publicPages,
    private: privatePages,
    misc: miscPages,
  }
});
