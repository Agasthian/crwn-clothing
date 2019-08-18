import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import {
  firestore,
  convertCollectionsSnapShotToMap
} from '../../firebase/firebase.utils';

import { updateCollections } from '../../redux/shop/shop.action';

import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../collection/collection.components';

class Shop extends Component {
  unsubscribeFromSnapshot = null;

  //Storing the Shop data from firebase in the shop component so the child components like collectionOverview and collection-component.js can access. onSnapshot is the snapshot representation of the collection array from firestrom.

  componentDidMount() {
    const { updateCollections } = this.props;
    const collectionRef = firestore.collection('collections');

    collectionRef.onSnapshot(async snapshot => {
      //convertCollectionsSnapShotToMap function is present in firebase/firebase.Util.js
      const collectionsMap = convertCollectionsSnapShotToMap(snapshot);

      updateCollections(collectionsMap);
    });
  }

  render() {
    const { match } = this.props;
    return (
      <div className='shop-page'>
        <Route exact path={`${match.path}`} component={CollectionsOverview} />
        <Route
          path={`${match.path}/:collectionId`}
          component={CollectionPage}
        />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  updateCollections: collectionsMap =>
    dispatch(updateCollections(collectionsMap))
});

export default connect(
  null,
  mapDispatchToProps
)(Shop);
