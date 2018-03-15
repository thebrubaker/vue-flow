export default class Step {
  constructor(series, options = {}) {
    this.$options = {};
    this.$options.series = series;
    this.$options.name = options.name || 'Step';
    this.$options.init = (options.init || (() => {})).bind(this);
    this.$options.beforeNext = (options.beforeNext || (cb => cb())).bind(this);
    this.$options.afterNext = (options.afterNext || (() => {})).bind(this);
    this.$options.beforeBack = (options.beforeBack || (cb => cb())).bind(this);
    this.$options.afterBack = (options.afterBack || (() => {})).bind(this);
    this.$options.skip = (options.skip || (() => false)).bind(this);
    this.setComputedData(options.computed);
  }

  /**
   * Set the compute data on the Step.
   * @param {Object} data The computed data to set.
   */
  setComputedData(data = {}) {
    Object.keys(data).forEach(key => {
      if (typeof data[key] === 'function') {
        return this.setComputedGetter(key, data[key]);
      }

      if (typeof data[key] === 'object') {
        return this.setComputedDefinition(key, data[key]);
      }

      throw Error('Computed data must be either a function or an object.');
    });
  }

  /**
   * Set a function as a computed property.
   * @param {String} name The name of the property.
   * @param {Function} callable The getter function for the property.
   */
  setComputedGetter(name, callable) {
    Object.defineProperty(this, name, {
      get: callable.bind(this),
    });
  }

  /**
   * Set an object as a computed property.
   * @param {String} name The name of the property.
   * @param {Function} definition The definition for the property.
   */
  setComputedDefinition(name, { get, set }) {
    Object.defineProperty(this, name, {
      get: get.bind(this),
      set: set.bind(this),
    });
  }
}
