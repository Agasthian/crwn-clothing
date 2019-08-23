import { createSelector } from 'reselect'; // imported from reselect library

const selectShop = state => state.shop;

export const selectCollections = createSelector(
  [selectShop],
  shop => shop.collections
);

//this selector is used in App.js and collectionOverViewComponent
//this selector is for converting Object into an Array. select collection uses Object, the component uses array
//Object.key = It gets all keys from object and and gives as the keys in an array
export const selectCollectionsForPreview = createSelector(
  [selectCollections],
  collections =>
    collections ? Object.keys(collections).map(key => collections[key]) : []
);

//used in pages/collection/collection.component.js
export const selectCollection = collectionUrlParam =>
  createSelector(
    [selectCollections],
    collections => (collections ? collections[collectionUrlParam] : null)
  );
