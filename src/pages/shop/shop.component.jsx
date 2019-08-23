import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import {
  firestore,
  convertCollectionsSnapShotToMap
} from '../../firebase/firebase.utils';

import { updateCollections } from '../../redux/shop/shop.action';

import WithSpinner from '../../components/with-spinner/with-spinner.component';

import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../collection/collection.components';

const CollectionOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class Shop extends Component {
  state = {
    loading: true
  };
  unsubscribeFromSnapshot = null;

  //Storing the Shop data from firebase in the shop component so the child components like collectionOverview and collection-component.js can access. onSnapshot is the snapshot representation of the collection array from firestrom.

  componentDidMount() {
    const { updateCollections } = this.props;
    const collectionRef = firestore.collection('collections');

    this.unsubscribeFromSnapshot = collectionRef.onSnapshot(async snapshot => {
      //convertCollectionsSnapShotToMap function is present in firebase/firebase.Util.js
      const collectionsMap = convertCollectionsSnapShotToMap(snapshot);
      //updateCollections action in redux/shop/shopaction.js
      updateCollections(collectionsMap);
      this.setState({ loading: false });
    });
  }

  render() {
    const { match } = this.props;
    const { loading } = this.state;
    return (
      <div className='shop-page'>
        <Route
          exact
          path={`${match.path}`}
          render={props => (
            <CollectionOverviewWithSpinner isLoading={loading} {...props} />
          )}
        />
        <Route
          path={`${match.path}/:collectionId`}
          // component={CollectionPage}
          render={props => (
            <CollectionPageWithSpinner isLoading={loading} {...props} />
          )}
        />
        {/* Render inside Route(in place of component) -Render is a method that take a function with paramater, where the parameters in the function is the params the component will recieve */}
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
