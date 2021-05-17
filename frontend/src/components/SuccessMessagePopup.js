import React from 'react';
import PopupMessage from './PopupMessage';
import success from '../images/success.svg';

function SuccessMessagePopup(props) {

  return (
    <PopupMessage
      name='success-message'
      isOpen={props.isOpen}
      onClose={props.onClose}
    >
      <div className="popup__message-container">
        <img src={success} className="popup__image" alt="Успех"></img>
        <span className="popup__message-text">
          Вы успешно зарегистрировались!
        </span>
      </div>
    </PopupMessage>
  );
}

export default SuccessMessagePopup;