import Dashboard from './';

export default [
  {
    path: 'dashboard',
    component: Dashboard,
    beforeEnter: (to, from, next) => next(),
  },
];
