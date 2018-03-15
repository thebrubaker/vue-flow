/**
 * Handle authentication through a firebase application.
 */
export default class FirebaseDriver {
  /**
   * Constructor for the class.
   * @param  {Object} config
   * @return {FirebaseDriver}
   */
  constructor(config, firebase) {
    this.config = config;
    this.firebase = firebase;
    this.data = {
      uid: this.getCache('auth.firebase.uid') || null,
    };
    this.firebase.auth().onAuthStateChanged(user => {
      if (user) {
        return this.setAuth(user)
      }

      this.logout()
    })
  }

  /**
   * Handle the callback method of loggin in.
   * @return {Promise}
   */
  handleCallback() {
    return Promise.reject(
      new Error('The Firebase Auth Engine does not support hosted login.'),
    );
  }

  /**
   * Redirect the user to the auth0 hosted login page.
   */
  hostedLogin() {
    return Promise.reject(
      new Error('The Firebase Auth Engine does not support hosted login.'),
    );
  }

  /**
   * Attempt authentication through an http call.
   * @param  {string} username
   * @param  {string} password
   * @return {Promise}
   */
  apiLogin(username, password) {
    return this.firebase.auth().signInWithEmailAndPassword(username, password)
  }

  /**
   * Sets the auth data.
   * @param {Object}  user
   * @param {Boolean} remember
   */
  setAuth(user) {
    this.data.uid = user.uid;
    this.setCache('auth.firebase.uid', this.data.uid);
  }

  /**
   * Log the user out of their session.
   */
  logout() {
    this.firebase.auth().signOut().then(() => {
      this.data.uid = null;
      this.setCache('auth.firebase.uid', null);
    })
  }

  /**
   * Determine if the user is authenticated.
   * @return {Boolean}
   */
  isAuthenticated() {
    return this.data.uid !== null
  }

  /**
   * Determine if the user is authenticated.
   * @return {Boolean}
   */
  check() {
    return this.isAuthenticated()
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
