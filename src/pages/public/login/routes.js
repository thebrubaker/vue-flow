import Login from './';

export default [
  {
    path: '/login',
    component: Login,
    meta: {
      guest: true,
    },
    beforeEnter: (to, from, next) => next(),
  },
];
