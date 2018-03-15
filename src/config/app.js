export default {
  /**
   * The name of your application.
   * @type {String}
   */
  name: 'Application',

  /**
   * Log events as they are emitted.
   * @type {Boolean}
   */
  debugEvents: false,

  /**
   * The base url for the application.
   * @type {String}
   */
  url: 'http://localhost:8080',

  /**
   * The environment for the application.
   */
  env: process.env.NODE_ENV,

  /**
   * Enable debugging for the application.
   */
  debug: process.env.APP_DEBUG === 'true' || process.env.APP_DEBUG === true
};
