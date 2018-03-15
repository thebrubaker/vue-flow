/**
 * This service manages authentication for the application.
 * You can load any driver you want into the manager for
 * various services such as Laravel, Auth0 or Firebase.
 */
export default class Auth {
  /**
   * The constructor for the class.
   * @param  {Object} config
   * @return {Auth}
   */
  constructor(config, drivers = {}) {
    this.events = {};
    this.config = {
      ...config,
      driver: config.driver || null,
    };
    this.loadDrivers(drivers);
    return new Proxy(this, this);
  }

  /**
   * A trap for getting property values.
   * @param  {Object} target  The target object
   * @param  {string} property  The name of the property.
   * @return {mixed}
   */
  get(target, property, receiver) {
    if (property === 'get') {
      return this.driver().get;
    }

    if (property === 'apply') {
      return this.driver().apply;
    }

    if (this[property] !== undefined) {
      return this[property];
    }

    return this.driver()[property];
  }

  /**
   * Load drivers into the auth manager.
   * @param  {Object} drivers  The drivers to load.
   */
  loadDrivers(drivers = {}) {
    if (!this.drivers) {
      this.drivers = {};
    }

    Object.keys(drivers).forEach(name => this.loadDriver(name, drivers[name]));
  }

  /**
   * Load a driver into the auth manager.
   * @param  {string} key
   * @param  {AuthEngine} engine
   */
  loadDriver(key, engine) {
    this.drivers[key] = engine;
  }

  /**
   * Return the driver for authentication.
   * @param  {string} name
   * @return {Object}
   */
  driver(name = '') {
    return name ? this.drivers[name] : this.drivers[this.config.driver];
  }

  /**
   * An alias for the api login method.
   * @param {String} username The username.
   * @param {String} password The password.
   */
  login(username, password) {
    return this.apiLogin(username, password);
  }

  /**
   * Log the user in using the API.
   */
  apiLogin(username, password) {
    return this.driver()
      .apiLogin(username, password)
      .then(data => {
        this.emit('loginSuccess', data);
        return Promise.resolve(data);
      })
      .catch(failure => {
        this.emit('loginFailure', failure);
        return Promise.reject(failure);
      });
  }

  /**
   * Reset the authentication session.
   */
  logout() {
    this.driver().logout();
    this.emit('logout');
  }

  /**
   * Register a callback to an auth event.
   * @param {String} name The name of the event.
   * @param {Function} callback The callback for said event.
   */
  on(name, callback) {
    if (!this.events[name]) {
      this.events[name] = [];
    }

    this.events[name].push(callback);
  }

  /**
   * Emit an auth event with a payload.
   * @param {String} name The name of the event to emit.
   * @param {mixed} payload The payload to pass to the event.
   */
  emit(name, payload) {
    if (!this.events[name]) {
      return;
    }

    this.events[name].forEach(callback => callback(payload));
  }

  /**
   * Installs auth on all Vue components.
   * @param {Vue} Vue The Vue library.
   * @param {String} alias The alias to add to all Vue components.
   */
  install(Vue, alias = '$auth') {
    Object.defineProperties(Vue.prototype, {
      [alias]: {
        get: () => this,
      },
    });
  }
}
