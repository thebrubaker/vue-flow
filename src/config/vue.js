export default {
  /**
   * Suppress all Vue logs and warnings.
   * https://vuejs.org/v2/api/#silent
   * @type {Boolean}
   */
  silent: false,

  /**
   * Define custom merging strategies for options.
   * https://vuejs.org/v2/api/#optionMergeStrategies
   * @type {Object}
   */
  optionMergeStrategies: {},

  /**
   * Configure whether to allow vue-devtools inspection.
   * https://vuejs.org/v2/api/#devtools
   * @type {Boolean}
   */
  devtools: process.env.APP_DEBUG === true || process.env.APP_DEBUG === 'true',

  /**
   * Assign a handler for uncaught errors during component render function
   * and watchers. The handler gets called with the error and the Vue instance.
   * https://vuejs.org/v2/api/#errorHandler
   */
  errorHandler: undefined,

  /**
   * Assign a custom handler for runtime Vue warnings. Note this only works
   * during development and is ignored in production.
   * https://vuejs.org/v2/api/#warnHandler
   */
  warnHandler: undefined,

  /**
   * Make Vue ignore custom elements defined outside of Vue (e.g., using the
   * Web Components APIs). Otherwise, it will throw a warning about an `Unknown
   * custom element`, assuming that you forgot to register a global component
   * or misspelled a component name.
   * https://vuejs.org/v2/api/#ignoredElements
   * @type {Array}
   */
  ignoredElements: [],

  /**
   * Define custom key alias(es) for `v-on`.
   * https://vuejs.org/v2/api/#keyCodes
   * @type {Object}
   */
  keyCodes: {},

  /**
   * Set this to true to enable component init, compile, render and patch
   * performance tracing in the browser devtool timeline.
   * https://vuejs.org/v2/api/#performance
   * @type {Boolean}
   */
  performance: false,

  /**
   * Set this to false to prevent the production tip on Vue startup.
   * @type {Boolean}
   */
  productionTip:
    process.env.APP_DEBUG === true || process.env.APP_DEBUG === 'true'
};
