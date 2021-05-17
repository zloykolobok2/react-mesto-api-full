import React from 'react';
import PopupWithForm from "./PopupWithForm";
import {CurrentUserContext} from "../contexts/CurrentUserContext";


function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  React.useEffect(() => {
    // console.log('-----------------------------');
    if (currentUser.name === undefined) {
      setName('');
    } else {
      setName(currentUser.name);
    }

    if (currentUser.about === undefined) {
      setDescription('');
    } else {
      setDescription(currentUser.about);
    }

    // setDescription(currentUser.about);
  }, [currentUser]);

  const onChangeName = (e) => {
    setName(e.target.value);
  }

  const onChangeDescription = (e) => {
    setDescription(e.target.value);
  }

  const handleSubmit = () => {
    props.onUpdateUser(name, description);
  }

  return (
    <PopupWithForm
      name='edit-profile'
      title='Редактировать профиль'
      isOpen={props.isOpen}
      onClose={props.onClose}
      buttonText='Сохранить'
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        className="popup__input popup__input_func_name"
        aria-label="имя"
        value={name}
        onChange={onChangeName}
        name="name"
        id="profile-name"
        required minLength="2"
        maxLength="40"
        placeholder="Имя"
      />
      <span className="popup__error profile-name-error">Вы пропустили это поле</span>
      <input
        type="text"
        className="popup__input popup__input_func_role"
        aria-label="роль"
        value={description}
        onChange={onChangeDescription}
        name="description"
        id="profile-role"
        required
        minLength="2"
        maxLength="200"
        placeholder="Роль"
      />
      <span className="popup__error profile-role-error">Вы пропустили это поле</span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;