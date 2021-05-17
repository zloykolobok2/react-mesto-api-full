import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const urlRef = React.useRef();

  const onUpdateAvatar = () => {
    props.onUpdateAvatar(urlRef.current.value);
  }

  return (
    <PopupWithForm
      name='upload-avatar'
      title='Обновить аватар'
      isOpen={props.isOpen}
      onClose={props.onClose}
      buttonText='Сохранить'
      onSubmit={onUpdateAvatar}
    >
      <input
        type="url"
        className="popup__input popup__input_link"
        aria-label="ссылка"
        defaultValue=""
        ref={urlRef}
        name="link"
        placeholder="Ссылка на картинку"
        id="avatar-upload-link"
        required
      />
      <span className="popup__error avatar-upload-link-error">Вы пропустили это поле</span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;