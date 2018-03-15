import Example from './';
import sub1 from './sub-1/routes';
import sub2 from './sub-2/routes';
import sub3 from './sub-3/routes';

export default [
  {
    path: '/example',
    component: Example,
    beforeEnter: (to, from, next) => next(),
    children: [...sub1, ...sub2, ...sub3],
  },
];
