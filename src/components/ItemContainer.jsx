import React from 'react';
import PropTypes from 'prop-types';

import ItemCard from './ItemCard.jsx';

function ItemContainer (props) {
  let data = null;

  if (props.items === undefined) { data = <p>The list is undefined</p>; }
  else if (props.items === null || props.items.length === 0) { data = <p>The list is empty</p>; }
  else { data = props.items.map(item =>
           <ItemCard key={item.id.toString()} item={item} deleteItem={props.deleteItem}
                     editItem={props.editItem} markItemAsTodoDone={props.markItemAsTodoDone} />
    );
  }

  return (
    <section className="to-do-items-container">
      <section className="grid">
        {data}
      </section>
    </section>
  );
}

export default ItemContainer;
