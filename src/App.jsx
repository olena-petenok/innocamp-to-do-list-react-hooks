import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Dialog from './components/Dialog.jsx';
import ItemContainer from './components/ItemContainer.jsx';

import { getItems, addItem, editItem, deleteItem, markItemAsTodoDone, sortItems, searchItems } from './utils/helper.js';

function App () {
  const [dialog, setDialog] = useState(false);
  const [visualList, setVisualList] = useState(false);
  const [itemToEdit, setItemToEdit] = useState(null);
  const [list, setList] = useState(getItems());
  const [byDateSelectFilter, setByDateSelectFilter] = useState("");

  const deleteItemHandler = id => { setList(deleteItem(id)); setVisualList(false); }
  const markItemAsTodoDoneHandler = id => { setList(markItemAsTodoDone(id)); setVisualList(false); }
  const editItemHandler = item => { setDialog(true); setItemToEdit(item); }
  const closeDialog = () => { setDialog(false); setItemToEdit(null); }
  const search = (value, listToSearch) => { setVisualList(searchItems(value, listToSearch)); }

  const callbackFromDialog = item => {
    setDialog(false);
    setItemToEdit(null);
    setVisualList(false);

    if (item.id === -1) { setList(addItem(item)); }
    else { setList(editItem(item)); }
  }

  const onAddClicked = () => { setDialog(true); }
  const onSortClicked = () => { setVisualList(sortItems(list)); }
  const onSearchChange = event => { search(event.target.value, list); }

  return (
    <>
      <ul className="control-panel">
        <li><button className="item positive" onClick={onAddClicked}>Add Item</button></li>
        <li><button className="item positive" onClick={onSortClicked}>Sort</button></li>
        <li><input className="item search" type="text" name="search" placeholder="Search" onChange={onSearchChange} /></li>
      </ul>
      {dialog && <Dialog close={closeDialog} callback={callbackFromDialog} item={itemToEdit} />}
      <ItemContainer items={visualList ? visualList : list} deleteItem={deleteItemHandler}
                     editItem={editItemHandler} markItemAsTodoDone={markItemAsTodoDoneHandler} />
    </>
  );
}

export default App;
