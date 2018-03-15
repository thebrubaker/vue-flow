import Vue from 'vue';
import VueRouter from 'vue-router';
import config from 'src/config/router';

Vue.use(VueRouter);

const router = new VueRouter(config);

/**
 * Register a middleware with the router to check authentication
 * status between page transitions.
 * @param {Function} callback
 */
export function registerGuardMiddleware(callback) {
  router.beforeEach((to, from, next) => {
    const route = {
      guest: to.meta && to.meta.guest,
      protected: routeIsProtected(to),
    };

    return callback(route, next);
  });
}

/**
 * Determine if any matched route is protected by auth.
 * @param  {array}  matched  The matched routes.
 * @return {Boolean}
 */
function routeIsProtected({ matched }) {
  return matched.reduce((isProtected, route) => {
    return isProtected || (route.meta && route.meta.auth);
  }, false);
}

export default router;
