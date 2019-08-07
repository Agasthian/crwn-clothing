import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyAtssns5tdwRipOU49wVRWDNA-8OHTLAWU',
  authDomain: 'crwn-db-cc28f.firebaseapp.com',
  databaseURL: 'https://crwn-db-cc28f.firebaseio.com',
  projectId: 'crwn-db-cc28f',
  storageBucket: '',
  messagingSenderId: '377201688268',
  appId: '1:377201688268:web:65c1d836ca1c6b4c'
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: `select_account` });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
