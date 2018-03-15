import app from 'src/app';
import { atLeast } from 'src/utilities/promise';
import subPage from './';

export default [
  {
    path: 'sub-1',
    component: subPage,
    beforeEnter: (to, from, next) => {
      app.store.commit('pages/example/loading', true);
      atLeast(1000).then(() => {
        app.store.commit('pages/example/loading', false);
        next();
      });
    },
  },
];
