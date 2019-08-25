import ShopActionTypes from './shop.action.types';
import {
  firestore,
  convertCollectionsSnapShotToMap
} from '../../firebase/firebase.utils';

export const fetchCollectionsStart = () => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_START
});

export const fetchCollectionsSuccessful = collectionsMap => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
  payload: collectionsMap
});

export const fetchCollectionsFailure = errorMessage => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
  payload: errorMessage
});

//Redux thunk function - this function is passed to component to begin the fetching.  Code from shop component is moved here.
export const fetchCollectionsStartAsync = () => {
  return dispatch => {
    const collectionRef = firestore.collection('collections');
    dispatch(fetchCollectionsStart());

    collectionRef
      .get()
      .then(snapshot => {
        //convertCollectionsSnapShotToMap function is present in firebase/firebase.Util.js
        const collectionsMap = convertCollectionsSnapShotToMap(snapshot);
        dispatch(fetchCollectionsSuccessful(collectionsMap));
      })
      .catch(error => dispatch(fetchCollectionsFailure(error.message)));
  };
};
