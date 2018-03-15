export default {
  api: {
    baseURL: process.env.API_BASE_URL,
    authEndpoint: process.env.API_AUTH_ENDPOINT,
    timezone: 'UTC',
    timeout: 30000
  },
  firebase: {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_AUTH_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
  },
  auth0: {
    domain: process.env.AUTH0_DOMAIN,
    clientID: process.env.AUTH0_CLIENT_ID,
    redirectPath: process.env.AUTH0_REDIRECT_PATH,
    audience: process.env.AUTH0_AUDIENCE,
    responseType: process.env.AUTH0_RESPONSE_TYPE,
    scope: process.env.AUTH0_SCOPE
  }
};
