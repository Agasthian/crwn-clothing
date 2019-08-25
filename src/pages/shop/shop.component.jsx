import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { fetchCollectionsStartAsync } from '../../redux/shop/shop.action';
import {
  selectCollectionIsFetching,
  selectCollectionsLoaded
} from '../../redux/shop/shop.selector';

import WithSpinner from '../../components/with-spinner/with-spinner.component';

import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../collection/collection.components';

const CollectionOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class Shop extends Component {
  //Storing the Shop data from firebase in the shop component so the child components like collectionOverview and collection-component.js can access. onSnapshot is the snapshot representation of the collection array from firestrom.
  //Update - Shop data is moved to redux-state managment using thunk library, so old code is commented - to shopAction.js

  componentDidMount() {
    const { fetchCollectionsStartAsync } = this.props;
    fetchCollectionsStartAsync();

    // //promise based pattern - Kept for learning purpose/refernce
    // collectionRef.get().then(snapshot => {
    //   //convertCollectionsSnapShotToMap function is present in firebase/firebase.Util.js
    //   const collectionsMap = convertCollectionsSnapShotToMap(snapshot);
    //   //updateCollections action in redux/shop/shopaction.js
    //   updateCollections(collectionsMap);
    //   this.setState({ loading: false });
    // });
    // Observable pattern - using live relode using snapshop- update to simple .get() - written up
    // this.unsubscribeFromSnapshot = collectionRef.onSnapshot(async snapshot => {
    //   //convertCollectionsSnapShotToMap function is present in firebase/firebase.Util.js
    //   const collectionsMap = convertCollectionsSnapShotToMap(snapshot);
    //   //updateCollections action in redux/shop/shopaction.js
    //   updateCollections(collectionsMap);
    //   this.setState({ loading: false });
    // });
  }

  render() {
    const { match, isCollectionFetching, isCollectionLoaded } = this.props;

    return (
      <div className='shop-page'>
        <Route
          exact
          path={`${match.path}`}
          render={props => (
            <CollectionOverviewWithSpinner
              isLoading={isCollectionFetching}
              {...props}
            />
          )}
        />
        <Route
          path={`${match.path}/:collectionId`}
          // component={CollectionPage}
          render={props => (
            <CollectionPageWithSpinner
              isLoading={!isCollectionLoaded}
              {...props}
            />
          )}
        />
        {/* Render inside Route(in place of component) -Render is a method that take a function with paramater, where the parameters in the function is the params the component will recieve */}
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  isCollectionFetching: selectCollectionIsFetching,
  isCollectionLoaded: selectCollectionsLoaded
});

const mapDispatchToProps = dispatch => ({
  fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Shop);
