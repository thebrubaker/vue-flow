import deep from 'deep-get-set';
import clone from 'clone';
import app from 'src/app';
import pages from './modules/pages';
import modal from './modules/modal';

export default {
  mutations: {
    resetState(state, path) {
      path = path.replace(/\//, '.');
      this.replaceState(
        deep(state, path, clone(
          deep(app.initialState, path)
        ))
      );
    }
  },
  modules: {
    pages,
    modal,
  }
};
