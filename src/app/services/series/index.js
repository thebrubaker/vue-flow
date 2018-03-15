import Series from './series';
import Step from './step';

export default class SeriesFactory {
  constructor(store, config = {}) {
    this.store = store;
    this.registeredSeries = {};
    this.namespace = config.namespace || 'series';
    this.registerRootStore();
    this.aliasProps(Step.prototype, config.aliases || {});
    this.aliasProps(Series.prototype, config.aliases || {});
    return new Proxy(() => {}, this);
  }

  registerRootStore() {
    this.store.registerModule(this.namespace, {
      namespaced: true,
      state: {
        installed: true,
      },
    });
  }

  /**
   * A trap for function calls on the class.
   * @param  {Object} target  The target object.
   * @param  {Object} context  The `this` argument for the call.
   * @param  {Array} argList  The list of arguments.
   * @return {any}
   */
  apply(target, context, argList) {
    return this.getSeries(...argList);
  }

  /**
   * A trap for getting a property values.
   * @param  {Object} target  The target object
   * @param  {string} property  The name of the property.
   * @return {mixed}
   */
  get(target, property, receiver) {
    if (property === 'get') {
      return undefined;
    }

    if (property === 'apply') {
      return undefined;
    }

    return this[property];
  }

  /**
   * Register a new series.
   * @param {String} name The name of the series.
   * @param {Object} seriesConfig The config for the series.
   */
  register(name, seriesConfig) {
    const series = new Series(this.store, this.namespace, seriesConfig);
    this.registeredSeries[name] = series;
  }

  /**
   * Return a registered series.
   * @param {String} name The name of the series.
   */
  getSeries(name) {
    if (!this.registeredSeries[name]) {
      throw Error(`The series '${name}' has not been registered.`);
    }

    return this.registeredSeries[name];
  }

  /**
   * Define properties on the object as aliases.
   * @param  {Object} object  The object to alias props to.
   * @param  {Object} props  The props to alias to the object.
   */
  aliasProps(object, props = {}) {
    // now define those properties for all vue instances
    Object.defineProperties(
      object,
      Object.keys(props).reduce((carry, name) => {
        if (typeof props[name] !== 'function') {
          throw Error(
            'Invalid alias. Did you pass an anonymous function that returns the alias?',
          );
        }
        // asking for vm.$http returns app.http
        return {
          ...carry,
          [name]: {
            get: props[name],
          },
        };
      }, {}),
    );
  }
}
