import Sandbox from './';

export default [
  {
    path: '/sandbox',
    component: Sandbox,
    beforeEnter: (to, from, next) => next(),
  },
];
