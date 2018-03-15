import Container from 'app-service-container';
import clone from 'clone';
import api, {
  registerStatusInterceptor,
  registerHeadersInterceptor,
} from './bootstrap/api';
import router, { registerGuardMiddleware } from './bootstrap/router';
import series from './bootstrap/series';
import store from './bootstrap/store';
import vue from './bootstrap/vue';
import validator from './bootstrap/validator';
import callout from './bootstrap/callout';
import config from 'src/config/app';

/**
 * We start by taking a snapshot of the state tree. This will allow us
 * to reset parts of the state as we need to later on.
 */
const initialState = clone(store.state);

/**
 * Now we create a new container for our app and register our core
 * synchronous services.
 */
const app = new Container();

app.register({
  api,
  router,
  series,
  store,
  vue,
  validator,
  callout,
  initialState,
  config,
});

/**
 * Firebase and auth are pretty large packages, so we are going to register those
 * as asynchronous.
 */
app.register('firebase', async () => {
  const firebase = await import(/* webpackChunkName: "admin" */ './bootstrap/firebase');

  return firebase;
});

app.register('auth', async () => {
  const auth = await import(/* webpackChunkName: "admin" */ './bootstrap/auth');

  return auth;
});

/**
 * When auth is resolved down the road, we want to connect it with other services.
 */
app.resolved('auth', (container, auth) => {
  /**
   * Let's make sure we protect against guarded routes
   */
  registerGuardMiddleware((route, next) => {
    if (auth.check() && route.guest) {
      return next(auth.config.home);
    }

    if (!auth.check() && route.protected) {
      return next(auth.config.guest);
    }

    return next();
  });

  /**
   * Let's add our api headers when authenticated.
   */
  registerHeadersInterceptor(headers => {
    if (auth.check()) {
      headers['Accept'] = 'application/json';
      headers['Authorization'] = `Bearer ${auth.getAccessToken()}`;
    }

    return headers;
  });

  /**
   * Let's log the user out when the token has expired.
   */
  registerStatusInterceptor((status, error) => {
    switch (status) {
      case 401:
        return auth.logout();
      default:
        return Promise.reject(error);
    }
  });
});

/**
 * Now we export the app! All services can be accessed through app.serviceName which is sync,
 * or app('serviceName') which is an async Promise.
 */
export default app;
