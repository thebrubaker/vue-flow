export default {
  /**
   * The default driver for authentication.
   * @type {String}
   */
  driver: 'firebase',

  /**
   * The home path used in redirects for authenticated users.
   * @type {String}
   */
  homePath: '/admin/dashboard',

  /**
   * The login path redirecting users that need to log in.
   * @type {String}
   */
  loginPath: '/login'
};
