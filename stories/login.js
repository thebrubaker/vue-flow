export default [
  {
    description: 'A user visits the login page.',
    state: {
      pages: {
        login: {
          form: {
            isAuthenticating: false,
            showErrors: false,
            email: { value: '', isValid: true, error: '' },
            password: { value: '', isValid: true, error: '' },
          },
        },
      },
      modal: { name: null, props: null },
      webhooks: { webhooks: [], isFetching: false },
      orderImport: { order: null, isFetching: false },
      route: {
        name: 'LoginPage',
        path: '/login',
        hash: '',
        query: {},
        params: {},
        fullPath: '/login',
        meta: { guest: true, afterLeave: '[object Function]' },
        from: {
          name: null,
          path: '/',
          hash: '',
          query: {},
          params: {},
          fullPath: '/',
          meta: {},
        },
      },
      callout: { incrementer: 0, list: {} },
    },
  },
  {
    description: 'A user submits the login form.',
    state: {
      pages: {
        login: {
          form: {
            isAuthenticating: true,
            showErrors: false,
            email: { value: 'pk.joel@gmail.com', isValid: true, error: '' },
            password: { value: 'secret123', isValid: true, error: '' },
          },
        },
      },
      modal: { name: null, props: null },
      webhooks: { webhooks: [], isFetching: false },
      orderImport: { order: null, isFetching: false },
      route: {
        name: 'LoginPage',
        path: '/login',
        hash: '',
        query: {},
        params: {},
        fullPath: '/login',
        meta: { guest: true, afterLeave: '[object Function]' },
        from: {
          name: null,
          path: '/',
          hash: '',
          query: {},
          params: {},
          fullPath: '/',
          meta: {},
        },
      },
      callout: { incrementer: 0, list: {} },
    },
  },
  {
    description: 'A user submits the login form with errors.',
    state: {
      pages: {
        login: {
          form: {
            isAuthenticating: false,
            showErrors: true,
            email: {
              value: '',
              isValid: false,
              error: 'The email field is required.',
            },
            password: {
              value: '',
              isValid: false,
              error: 'The password field is required.',
            },
          },
        },
      },
      modal: { name: null, props: null },
      webhooks: { webhooks: [], isFetching: false },
      orderImport: { order: null, isFetching: false },
      route: {
        name: 'LoginPage',
        path: '/login',
        hash: '',
        query: {},
        params: {},
        fullPath: '/login',
        meta: { guest: true, afterLeave: '[object Function]' },
        from: {
          name: null,
          path: '/',
          hash: '',
          query: {},
          params: {},
          fullPath: '/',
          meta: {},
        },
      },
      callout: { incrementer: 0, list: {} },
    },
  },
];
