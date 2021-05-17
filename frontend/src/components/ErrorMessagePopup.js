import React from 'react';
import PopupMessage from './PopupMessage';
import error from '../images/error.svg';

function ErrorMessagePopup(props) {

  return (
    <PopupMessage
      name='error-message'
      isOpen={props.isOpen}
      onClose={props.onClose}
    >
      <div className="popup__message-container">
        <img src={error} className="popup__image" alt="Ошибка"></img>
        <span className="popup__message-text">
          Что-то пошло не так! Попробуйте ещё раз.
        </span>
      </div>
    </PopupMessage>
  );
}

export default ErrorMessagePopup;