/**
 * Handle authentication through a loopback application.
 */
export default class LoopbackDriver {
  /**
   * Constructor for the class.
   * @param  {Object} config
   * @return {LoopbackDriver}
   */
  constructor(config, http) {
    this.config = config;
    this.http = http;

    this.data = {
      accessToken: this.getCache('auth.loopback.accessToken') || null,
      expiresAt: this.getCache('auth.loopback.expiresAt') || null,
      userId: this.getCache('auth.loopback.userId') || null,
    };
  }

  /**
   * Handle the callback method of loggin in.
   * @return {Promise}
   */
  handleCallback() {
    return Promise.reject(
      'The Loopback Auth Engine does not support hosted login.',
    );
  }

  /**
   * Redirect the user to the auth0 hosted login page.
   */
  hostedLogin() {
    return Promise.reject(
      'The Loopback Auth Engine does not support hosted login.',
    );
  }

  /**
   * Attempt authentication through an http call.
   * @param  {string} username
   * @param  {string} password
   * @return {Promise}
   */
  apiLogin(username, password, remember = true) {
    return this.http
      .post(
        this.config.authUrl,
        Object.assign({ username, password }, this.config),
      )
      .then(({ data }) => {
        this.setAuth(data);
        return Promise.resolve({ data: this.data });
      })
      .catch(response => {
        return Promise.reject(response);
      });
  }

  /**
   * Sets the auth data and optionally caches in local storage.
   * @param {Object}  data
   * @param {Boolean} remember
   */
  setAuth(data, remember = true) {
    this.data.accessToken = data.id;
    this.data.userId = data.userId;
    this.data.expiresAt = data.ttl * 1000 + new Date().getTime();

    if (remember) {
      this.setCache('auth.loopback.accessToken', this.data.accessToken);
      this.setCache('auth.loopback.userId', this.data.userId);
      this.setCache('auth.loopback.expiresAt', this.data.expiresAt);
    }
  }

  /**
   * Log the user out of their session.
   */
  logout() {
    this.data.accessToken = null;
    this.data.userId = null;
    this.data.expiresAt = null;
    this.setCache('auth.loopback.accessToken', null);
    this.setCache('auth.loopback.userId', null);
    this.setCache('auth.loopback.expiresAt', null);
  }

  /**
   * Determine if the user is authenticated.
   * @return {Boolean}
   */
  isAuthenticated() {
    if (this.data.expiresAt && new Date().getTime() < this.data.expiresAt) {
      return true;
    }

    return false;
  }

  /**
   * Return the api access token.
   * @return {string}
   */
  getApiToken() {
    return this.data.accessToken;
  }

  /**
   * Returns an item from cache.
   * @param {String} name The key of the cached item.
   */
  getCache(name) {
    return JSON.parse(window.localStorage.getItem(name));
  }

  /**
   * Set a `key: value` in cache.
   * @param {String} name The key to store the cached value.
   * @param {*} value The cached value.
   */
  setCache(name, value) {
    return window.localStorage.setItem(name, JSON.stringify(value));
  }
}
