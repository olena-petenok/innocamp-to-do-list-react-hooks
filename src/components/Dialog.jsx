import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';

import { deadlineValidation, attachedImageValidation, toBase64Promise } from '../utils/helper.js';

function Dialog (props) {
  const [inputTitle, setInputTitle] = useState(props.item ? props.item.title : "");
  const [inputDescription, setInputDescription] = useState(props.item ? props.item.description : "");
  const [inputPriority, setInputPriority] = useState(props.item ? props.item.priority : "");
  const [inputDeadline, setInputDeadline] = useState(props.item ? props.item.deadline : "");
  const [inputAttachedImage, setInputAttachedImage] = useState(props.item ? props.item.attachedImage : "");
  const attachedImageRef = useRef(null);

  const setAttachedImageState = files => {
    if (attachedImageValidation(files)) {
      let promise = toBase64Promise(files[0]).then(file => { setInputAttachedImage(file); });
    }
  }
  const onAttachedImageChange = () => { setAttachedImageState(attachedImageRef.current.files); }
  const onAttachedImageDragEnter = event => { event.stopPropagation(); event.preventDefault(); }
  const onAttachedImageDragOver = event => { event.stopPropagation(); event.preventDefault(); }
  const onAttachedImageDrop = event => {
    setAttachedImageState(event.dataTransfer.files);
    event.stopPropagation(); event.preventDefault();
  }

  const generateResultingItem = () => {
    return {
      id: props.item ? props.item.id : -1,
      title: inputTitle,
      description: inputDescription,
      priority: inputPriority,
      deadline: deadlineValidation(inputDeadline),
      attachedImage: inputAttachedImage,
      isDone: props.item ? props.item.isDone : false,
    };
  }

  const onTitleChange = event => { setInputTitle(event.target.value); }
  const onDescriptionChange = event => { setInputDescription(event.target.value); }
  const onPriorityChange = event => { setInputPriority(event.target.value); }
  const onDeadlineChange = event => { setInputDeadline(event.target.value); }
  const onDialogPreventFromClosingClicked = event => { event.stopPropagation(); }
  const onSubmit = event => { event.preventDefault(); props.callback(generateResultingItem()); }

  return (
    <section className="modal-window" onClick={props.close}>
      <div className="modal-window-item" onClick={onDialogPreventFromClosingClicked}>
        <section className="header">
          <div className="modal-title">{props.item ? `Edit item ${props.item.id}` : `Add new item`}</div>
          <div className="modal-close-icon" onClick={props.close}>
            <div className="modal-close-icon-inner"></div>
          </div>
        </section>

        <section className="content">
          <form onSubmit={onSubmit}>
            <section className="form-elements-block">
              <input onChange={onTitleChange} required type="text" name="title"
                     placeholder="Title *" value={inputTitle}
                     pattern="(?=.*[a-z])(?=.*[A-Z]).{2,20}" className="input" />
              <input onChange={onDescriptionChange} type="text" name="description"
                     placeholder="Description" value={inputDescription} className="input" />

              <select onChange={onPriorityChange} required name="priority"
                      value={inputPriority} className="select" >
                <option className="option" value="">Priority *</option>
                <option className="option" value="low" className="low">low</option>
                <option className="option" value="middle" className="middle">middle</option>
                <option className="option" value="high" className="high">high</option>
              </select>

              <input onChange={onDeadlineChange} type="date" name="deadline"
                     placeholder=" " value={inputDeadline} className="input" />

              <div className="attach-image-block" name="image-drop"
                   onDragEnter={onAttachedImageDragEnter}
                   onDragOver={onAttachedImageDragOver} onDrop={onAttachedImageDrop}>
                <input type="file" name="image-input" className="attach-image"
                       ref={attachedImageRef} accept="image/*"
                       onChange={onAttachedImageChange} />
                <p className="text">Attach image (200kb max)</p>
              </div>
              {inputAttachedImage ? <img src={inputAttachedImage} className="thumbnail" alt="thumbnail" />
                                  : <p className="thumbnail-text">no file or invalid file</p>}
            </section>

            <section className="buttons">
              <div className="buttons-item">
                <input className="input negative" type="button"
                       value="Cancel" onClick={props.close} />
                <input className="input positive" type="submit"
                       value={props.item ? `Edit item` : `Add item`} />
              </div>
            </section>
          </form>
        </section>
      </div>
    </section>
  );
}

Dialog.propTypes = {
  close: PropTypes.func,
  callback: PropTypes.func,
  item: PropTypes.object,
};

Dialog.defaultProps = {

};

export default Dialog;
