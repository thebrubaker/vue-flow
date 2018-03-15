# Auth

## Overview

The Auth service provides a simple API for authenticating users with a number of default drivers, as well as the ability to create custom drivers.

``` js
// Log a user into an api backend.
auth.login('test@email.com', 'secret')
// Log a user out.
auth.logout()
// Check the status of the auth session
auth.isAuthenticated()
// Access the api token to add to api requests
auth.getApiToken()
// Bind callbacks to auth events
auth.on('loginSuccess', () => {
  router.push({ path: config.homePath });
  callout('You have been logged in.');
});
// Change the auth driver.
auth.driver('auth0').hostedLogin()
```

## Installation

Auth keeps it's state internal and provides a handful of methods to determine auth status and access auth properties. Sessions are stored in local storage.

```js
import axios from 'axios';
import Auth from './auth';
import LaravelDriver from './auth/drivers/laravel';

const auth = new Auth({
  driver: 'laravel',
  homePath: '/dashboard',
  loginPath: '/auth/login',
})

auth.loadDriver({
  laravel: new LaravelDriver({
    authUrl: env('LARAVEL_AUTH_URL', ''),
    client_id: env('LARAVEL_CLIENT_ID', ''),
    client_secret: env('LARAVEL_CLIENT_SECRET', ''),
    grant_type: env('LARAVEL_GRANT_TYPE', 'password'),
    scope: env('LARAVEL_SCOPE', '*'),
  }, axios)
})

Vue.use(auth, '$auth')
```

## Integrations

The Auth service can be used across several other services to simplify some common practices.

### Axios

You can integrate Auth into your axios API calls by using auth in request and response middlewares.

``` js
const api = axios.create({
  baseUrl: 'https://api.example/com'
})

api.interceptors.request.use(config => {
  if (!auth.isAuthenticated()) {
    return config;
  }

  return {
    ...config,
    headers: {
      ...config.headers,
      Accept: 'application/json',
      Authorization: `Bearer ${auth.getApiToken()}`,
    },
  };
});

api.interceptors.response.use(null, error => {
  switch (error.response.status) {
    case 401:
      return auth.logout();
    case 404:
      return callout('API request failed. Endpoint returned 404.');
    case 500:
      return callout('API request failed. Endpoint returned 500.');
  }

  return Promise.reject(error);
});
```

### VueRouter

You can add a middleware before each route change to check auth status can log the user out.

``` js
router.beforeEach((to, from, next) => {
  // If authenticated and accessing a guest only route, redirect to appropriate page
  if (auth.isAuthenticated() && to.meta && to.meta.guest) {
    return next('/dashboard');
  }

  // If not authenticated and not accessing the guest path, redirect to the guest path
  if (!auth.isAuthenticated() && this.routeIsProtected(to)) {
    callout('Please log in to continue.')
    return next('/auth/login');
  }

  return next();
});

function routeIsProtected({ matched }) {
  return matched.reduce((isProtected, route) => {
    return isProtected || (route.meta && route.meta.auth);
  }, false);
}
```