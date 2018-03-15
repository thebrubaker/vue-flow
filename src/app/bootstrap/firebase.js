import * as firebase from 'firebase';
import 'firebase/firestore';
import config from 'src/config/services';

export default firebase.initializeApp(config.firebase);
