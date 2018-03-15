export default {
  /**
   * Register routes on the Router.
   */
  routes: [
    ...require('src/pages/private/routes').default,
    ...require('src/pages/public/routes').default,
    ...require('src/pages/misc/routes').default,
  ],

  /**
   * Configure the router mode.
   * @type {String}
   */
  mode: 'history',

  /**
   * The base URL of the app.
   * @type {String}
   */
  base: '/',

  /**
   * Globally configure <router-link> default active class.
   * https://router.vuejs.org/en/api/router-link.html
   * @type {String}
   */
  linkActiveClass: 'router-link-active',

  /**
   * Globally configure <router-link> default active class for exact matches.
   * https://router.vuejs.org/en/api/router-link.html
   * @type {String}
   */
  linkExactActiveClass: 'router-link-exact-active',

  /**
   * Customize the scroll behavior on route navigation.
   * https://router.vuejs.org/en/advanced/scroll-behavior.html
   * @param  {Route} to
   * @param  {Route} from
   * @param  {Object} savedPosition
   * @return {Object}
   */
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { x: 0, y: 0 };
  },

  /**
   * Controls whether the router should fallback to hash mode when the browser
   * does not support `history.pushState`.
   * @type {Boolean}
   */
  fallback: true,
};
