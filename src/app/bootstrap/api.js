import axios from 'axios';
import callout from './callout';
import config from 'src/config/services';

const api = axios.create(config.api);

api.interceptors.response.use(null, error => {
  switch (status) {
    case 404:
      return callout('API request failed. Endpoint returned 404.');
    case 500:
      return callout('API request failed. Endpoint returned 500.');
    default:
      return Promise.reject(error);
  }
});

/**
 * Register the interceptor to add the auth headers to every API request.
 * @param {Function} shouldAddToken
 * @param {Function} token
 */
export function registerHeadersInterceptor(callback) {
  api.interceptors.request.use(config => {
    return callback(config.headers);
  });
}

export function registerStatusInterceptor(callback) {
  api.interceptors.response.use(null, error => {
    return callback(error.response.status, error);
  });
}

export default api;
