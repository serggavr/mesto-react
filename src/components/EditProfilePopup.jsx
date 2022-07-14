import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function EditProfilePopup({
  isOpen,
  onClose,
  onUpdateUser
}) {

const currentUser = React.useContext(CurrentUserContext)
const [name, setName] = React.useState(currentUser.name);
const [description, setDescription] = React.useState(currentUser.about);

function changeName(e) {
  setName(e.target.value);
}

function changeDescription(e) {
  setDescription(e.target.value);
}

function handleSubmit(e) {
  e.preventDefault()
  onUpdateUser({
    name,
    about: description
  });
}

React.useEffect(() => {
  setName(currentUser.name)
  setDescription(currentUser.about)
}, [currentUser, onClose])

  return (
    <PopupWithForm
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit}
        name={"edit-profile"}
        title={"Редактировать профиль"}
        buttonText={"Сохранить"}
      >
        <input
          data-input="name-input"
          type="text"
          className="popup__input popup__input_type_username"
          name="popup__input_type_username"
          required
          placeholder="Имя"
          minLength="2"
          maxLength="40"
          onChange={changeName}
          value={name ?? ''}
        />
        <span
          className="popup__error"
          data-input="name-input-error"
        ></span>
        <input
          data-input="description-input"
          type="text"
          className="popup__input popup__input_type_description"
          name="popup__input_type_description"
          required
          placeholder="О себе"
          minLength="2"
          maxLength="200"
          onChange={changeDescription}
          value={description ?? ''}
        />
        <span
          className="popup__error"
          data-input="description-input-error"
        ></span>
      </ PopupWithForm>
  );
}