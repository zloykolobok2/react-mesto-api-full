import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const [name, setName] = React.useState('');
  const [url, setUrl] = React.useState('');

  const onChangeName = (e) => {
    setName(e.target.value);
  }

  const onChangeUrl = (e) => {
    setUrl(e.target.value);
  }

  const onSubmit = () => {
    props.onAddCard(name, url);
    setUrl('');
    setName('');
  }

  return(
    <PopupWithForm
      name='add-card'
      title='Новое место'
      isOpen={props.isOpen}
      onClose={props.onClose}
      buttonText='Сохранить'
      onSubmit={onSubmit}
    >
      <input
        type="text"
        className="popup__input popup__input_name"
        aria-label="имя"
        value={name}
        onChange={onChangeName}
        name="name"
        placeholder="Название"
        id="new-card-name"
        minLength="2"
        maxLength="30"
        required
      />
      <span className="popup__error new-card-name-error">Вы пропустили это поле</span>
      <input
        type="url"
        className="popup__input popup__input_link"
        aria-label="ссылка"
        value={url}
        onChange={onChangeUrl}
        name="link"
        placeholder="Ссылка на картинку"
        id="new-card-link"
        required
      />
      <span className="popup__error new-card-link-error">Вы пропустили это поле</span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;