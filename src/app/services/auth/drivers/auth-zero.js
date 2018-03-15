import auth0 from 'auth0-js'
import ls from 'local-storage'
import url from '~/utilities/url'

/**
 * An authentication engine using auth0.
 * https://auth0.com/docs/overview
 */
export default class AuthZeroEngine {
  /**
   * Constructor for the class.
   * @param  {Object} config
   * @return {AuthZeroEngine}
   */
  constructor (config) {
    config.redirectUri = url(config.redirectPath)

    this.auth0 = new auth0.WebAuth(config)

    this.data = {
      accessToken: ls('auth.auth0.accessToken'),
      idToken: ls('auth.auth0.idToken'),
      expiresAt: ls('auth.auth0.expiresAt')
    }
  }

  /**
   * Handle the callback method of loggin in.
   * @return {Promise}
   */
  handleCallback () {
    return new Promise((resolve, reject) => {
      this.auth0.parseHash((error, { accessToken, idToken, expiresIn }) => {
        if (accessToken && idToken && expiresIn) {
          this.setAuth({ accessToken, idToken, expiresIn })
          resolve({ data: this.data })
        }

        if (error) {
          reject(error)
        }
      })
    })
  }

  /**
   * Redirect the user to the auth0 hosted login page.
   */
  hostedLogin () {
    this.auth0.authorize()
  }

  /*
   * Sets the auth data and optionally caches in local storage.
   * @param {Object}  data
   * @param {Boolean} remember
   */
  setAuth (data, remember = true) {
    this.data.accessToken = data.accessToken
    this.data.idToken = data.refresh_token
    this.data.expiresAt = data.expiresIn * 1000 + new Date().getTime()

    if (remember) {
      ls('auth.auth0.accessToken', this.data.accessToken)
      ls('auth.auth0.idToken', this.data.idToken)
      ls('auth.auth0.expiresAt', this.data.expiresAt)
    }
  }

  /**
   * Log the user out of their session.
   */
  logout () {
    this.data.accessToken = null
    this.data.idToken = null
    this.data.expiresAt = null
    ls('auth.laravel.accessToken', null)
    ls('auth.laravel.idToken', null)
    ls('auth.laravel.expiresAt', null)
  }

  /**
   * Determine if the user is authenticated.
   * @return {Boolean}
   */
  isAuthenticated () {
    if (this.data.expiresAt && new Date().getTime() > this.data.expiresAt) {
      return true
    }

    return false
  }
}
