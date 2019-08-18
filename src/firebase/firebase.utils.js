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

//This function is called in App.js.
export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  //userAuth.uid is auto gernerated id from google firebase
  const userRef = firestore.doc(`users/${userAuth.uid}`);

  //Even if the userAuth.uid is not present firebase gives us a shapshot object to check exist
  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    //if exists create a new Document object inside of our userRef
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('Error creating user', error.message);
    }
  }
  return userRef;
};

//Called in ./pages/shop/shop.component.js. This function return the new final data with route and id into the app
export const convertCollectionsSnapShotToMap = collections => {
  const transformedCollection = collections.docs.map(doc => {
    const { title, items } = doc.data();

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items
    };
  });

  //this reducer func gives the object with title as key and the collection as values
  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {});
};

//This util function is used to import data from shopdata.js into out firebase. This function is called in App.js
export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  //a collection is created using collection key
  const collectionRef = firestore.collection(collectionKey);

  // Batch object is got from firebase to batch write. this inbuilt function is used write full or nothing
  const batch = firestore.batch();

  //Loop objectsToAdd array parameter using forLoop
  objectsToAdd.forEach(obj => {
    const newDocRef = collectionRef.doc(); //Gives new document collection refernce and generate random id
    batch.set(newDocRef, obj); //newDocRef.set using batch
  });

  return await batch.commit(); //Fire batch calls. When commit succeds this return a null
};

//Firebase intialization
firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: `select_account` });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
