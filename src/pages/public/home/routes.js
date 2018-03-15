import Home from './';

export default [
  {
    path: '/',
    component: Home,
    beforeEnter: (to, from, next) => next(),
  },
];
