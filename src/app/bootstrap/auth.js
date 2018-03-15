import firebase from './firebase';
import AuthManager from 'src/app/services/auth';
import FirebaseDriver from 'src/app/services/auth/drivers/firebase';
import config from 'src/config/auth';

const auth = new AuthManager(config, {
  firebase: new FirebaseDriver({}, firebase)
});

export default auth;
