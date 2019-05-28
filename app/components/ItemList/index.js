/**
 *
 * ItemList
 *
 */
import './style.css';
import React from 'react';
import PropTypes from 'prop-types';

import Item from './item';

function ItemList(props) {
  return (
    <div className="imageList">
      {props.items.map(item => {
        return <Item item={item} />;
      })}
    </div>
  );
}

ItemList.propTypes = { items: PropTypes.array };

export default ItemList;
