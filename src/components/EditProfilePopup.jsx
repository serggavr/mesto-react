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
const [formValid, setFormValid] = React.useState(true)
const [submitButtonText, setSubmitButtonText] = React.useState("Сохранить")

const [name, setName] = React.useState(currentUser.name);
const [nameInputValid, setNameInputValid] = React.useState(true)
const nameErrorContainer = React.useRef({})

const [description, setDescription] = React.useState(currentUser.about);
const [descriptionInputValid, setDescriptionInputValid] = React.useState(true)
const descriptionErrorContainer = React.useRef({})


function changeName(e) {
  setName(e.target.value);
  setNameInputValid(onValidation(e, nameErrorContainer))

  // setNameInputValid(true)
  // onValidation(e, nameErrorContainer)
  
}

function changeDescription(e) {
  setDescription(e.target.value);
  setDescriptionInputValid(onValidation(e, descriptionErrorContainer))
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
    setNameInputValid(true)
    setDescriptionInputValid(true)
    nameErrorContainer.current.textContent = ''
    descriptionErrorContainer.current.textContent = ''
    setSubmitButtonText("Сохранить")
  }, 500)
}, [currentUser, onClose])

React.useEffect(() => {
  !nameInputValid || !descriptionInputValid ? setFormValid(false) : setFormValid(true)
}, [nameInputValid, descriptionInputValid])

  return (
    <PopupWithForm
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit}
        name="edit-profile"
        title="Редактировать профиль"
        buttonText={submitButtonText}
        isFormValid={formValid}
      >
        <input
          data-input="name-input"
          type="text"
          className={ `popup__input popup__input_type_username ${!nameInputValid && `popup__input_type_error`}` }
          name="popup__input_type_username"
          required
          placeholder="Имя"
          minLength="2"
          maxLength="40"
          onChange={changeName}
          value={name ?? ''}
        />
        <span
          className={`popup__error ${!nameInputValid && `popup__error_visible`}`}
          data-input="name-input-error"
          ref={nameErrorContainer}
        ></span>
        <input
          data-input="description-input"
          type="text"
          className={`popup__input popup__input_type_description ${!descriptionInputValid && `popup__input_type_error`}`}
          name="popup__input_type_description"
          required
          placeholder="О себе"
          minLength="2"
          maxLength="200"
          onChange={changeDescription}
          value={description ?? ''}
        />
        <span
          className={`popup__error ${!descriptionInputValid && `popup__error_visible`}`}
          data-input="description-input-error"
          ref={descriptionErrorContainer}
        ></span>
      </ PopupWithForm>
  );
}