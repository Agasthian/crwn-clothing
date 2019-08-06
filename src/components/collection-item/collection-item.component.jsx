import React from 'react';

import './collection.item.styles.scss';

const CollectionItem = ({ name, imageUrl, price }) => {
  return (
    <div className='collection-item'>
      <div className='image' style={{ backgroundImage: `url(${imageUrl})` }} />
      <div className='collection-footer'>
        <div className='name'>{name}</div>
        <div className='price'>{price}</div>
      </div>
    </div>
  );
};

export default CollectionItem;
