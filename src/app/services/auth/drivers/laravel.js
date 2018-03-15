/**
 * Handle authentication through a Laravel application.
 */
export default class LaravelDriver {
  /**
   * Constructor for the class.
   * @param  {Object} config
   * @return {LaravelDriver}
   */
  constructor(config, http) {
    this.config = config;
    this.http = http;

    this.data = {
      accessToken: this.getCache('auth.laravel.accessToken') || null,
      expiresAt: this.getCache('auth.laravel.expiresAt') || null,
    };
  }

  /**
   * Handle the callback method of loggin in.
   * @return {Promise}
   */
  handleCallback() {
    return Promise.reject(
      'The Laravel Auth Engine does not support hosted login.',
    );
  }

  /**
   * Redirect the user to the auth0 hosted login page.
   */
  hostedLogin() {
    return Promise.reject(
      'The Laravel Auth Engine does not support hosted login.',
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
    this.data.accessToken = data.access_token;
    this.data.expiresAt = data.expires_in * 1000 + new Date().getTime();

    if (remember) {
      this.setCache('auth.laravel.accessToken', this.data.accessToken);
      this.setCache('auth.laravel.expiresAt', this.data.expiresAt);
    }
  }

  /**
   * Log the user out of their session.
   */
  logout() {
    this.data.accessToken = null;
    this.data.expiresAt = null;
    this.removeCache('auth.laravel.accessToken');
    this.removeCache('auth.laravel.expiresAt');
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
   * Determine if the user is authenticated.
   * @return {Boolean}
   */
  check() {
    return this.isAuthenticated()
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
   * @param {String} key The key of the cached item.
   */
  getCache(key) {
    return JSON.parse(window.localStorage.getItem(key));
  }

  /**
   * Set a `key: value` in cache.
   * @param {String} key The key to store the cached value.
   * @param {*} value The cached value.
   */
  setCache(key, value) {
    return window.localStorage.setItem(key, JSON.stringify(value));
  }

  /**
   * Remove an item from cache by key.
   * @param {String} key
   */
  removeCache(key) {
    return window.localStorage.removeItem(key);
  }
}
