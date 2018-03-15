import Admin from './layout';
import dashboard from './dashboard/routes';

export default [
  {
    path: '/admin',
    component: Admin,
    meta: {
      auth: true,
    },
    children: [
      ...dashboard,
    ]
  }
];
