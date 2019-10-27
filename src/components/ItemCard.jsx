import React from 'react';
import PropTypes from 'prop-types';

function ItemCard (props) {

  const onDeleteItemClicked = () => { props.deleteItem(props.item.id); }
  const onMarkItemClicked = () => { props.markItemAsTodoDone(props.item.id); }
  const onEditItemClicked = () => { props.editItem(props.item); }

  const { title, description, priority, deadline, attachedImage, isDone } = props.item;

  return (
    <div className="item">
      <p className={`title ${isDone ? `line-through` : ``}`}>{title}</p>
      <p className={`text ${isDone ? `line-through` : ``}`}>{description ? description : `-`}</p>
      <p className={`text ${isDone ? `line-through` : ``}`}>
        Priority:
        <span className={`priority-${priority}`}>{` ${priority}`}</span>
      </p>
      <p className={`text ${isDone ? `line-through` : ``}`}>{deadline ? deadline : `-`}</p>
      <section className="buttons">
        <input type="button" className="input negative" value="Delete"
               onClick={onDeleteItemClicked} />
        <input type="button" className="input positive" value="Edit"
               onClick={onEditItemClicked} />
        <input type="button" className="input positive" value={isDone ? `Mark as ToDo` : `Mark as Done`}
               onClick={onMarkItemClicked} />
        {attachedImage && <a href={attachedImage} download className="input positive">Download</a>}
      </section>
    </div>
  );
}

ItemCard.propTypes = {
  deleteItem: PropTypes.func,
  editItem: PropTypes.func,
  markAsTodoDone: PropTypes.func,
  item: PropTypes.object,
};

ItemCard.defaultProps = {

};

export default ItemCard;
