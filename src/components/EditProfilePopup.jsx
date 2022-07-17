import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function EditProfilePopup({
  isOpen,
  onClose,
  onUpdateUser,
  onValidation,
}) {

const currentUser = React.useContext(CurrentUserContext)
const [name, setName] = React.useState(currentUser.name);
const [description, setDescription] = React.useState(currentUser.about);

const nameInput = React.useRef({})
const descriptionInput = React.useRef({})
const nameErrorContainer = React.useRef({})
const descriptionErrorContainer = React.useRef({})
const [formValid, setFormValid] = React.useState(true)

const [submitButtonText, setSubmitButtonText] = React.useState("Сохранить")

function changeName(e) {
  setName(e.target.value);
  onValidation(e, nameErrorContainer)
}

function changeDescription(e) {
  setDescription(e.target.value);
  onValidation(e, descriptionErrorContainer)
}

function handleSubmit(e) {
  e.preventDefault()
  setSubmitButtonText("Сохранение...")
  onUpdateUser({
    name,
    about: description
  });
}

React.useEffect(() => {
  setTimeout(() => {
    setName(currentUser.name)
    setDescription(currentUser.about)
    nameErrorContainer.current.textContent = ''
    descriptionErrorContainer.current.textContent = ''
    nameInput.current.classList.remove('popup__input_type_error')
    descriptionInput.current.classList.remove('popup__input_type_error')
    setSubmitButtonText("Сохранить")
  }, 500)
}, [currentUser.name, currentUser.about, onClose])

React.useEffect(() => {
  if (nameErrorContainer.current.textContent !== '' || descriptionErrorContainer.current.textContent !== '') {
    setFormValid(false)
  } else {
    setFormValid(true)
  }
}, [nameErrorContainer.current.textContent, descriptionErrorContainer.current.textContent])

  return (
    <PopupWithForm
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit}
        name={"edit-profile"}
        title={"Редактировать профиль"}
        buttonText={submitButtonText}
        isFormValid={formValid}
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
          ref={nameInput}
        />
        <span
          className="popup__error popup__error_visible"
          data-input="name-input-error"
          ref={nameErrorContainer}
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
          ref={descriptionInput}
        />
        <span
          className="popup__error popup__error_visible"
          data-input="description-input-error"
          ref={descriptionErrorContainer}
        ></span>
      </ PopupWithForm>
  );
}