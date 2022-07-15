import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function EditAvatarPopup({
  isOpen,
  onClose,
  onUpdateAvatar
}) {

  const currentUser = React.useContext(CurrentUserContext)
  const userAvatarSrc = React.useRef({})
  userAvatarSrc.current.value = ''

  function handleSubmit(e) {
    e.preventDefault()
    onUpdateAvatar(userAvatarSrc.current.value)
  }

  function changeAvatarSrc(e) {
    userAvatarSrc.current.value = e.target.value
  }

  return (
    <PopupWithForm
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit}
        name={"update-avatar"}
        title={"Обновить аватар"}
        buttonText={"Сохранить"}
      >
        <input
          data-input="avatar-link-input"
          type="url"
          className="popup__input popup__input_type_avatar-link"
          name="popup__input_type_avatar-link"
          required
          placeholder="Ссылка на новый аватар"
          onChange={changeAvatarSrc}
          ref={userAvatarSrc}
        />
        <span
          className="popup__error"
          data-input="avatar-link-input-error"
        ></span>
      </PopupWithForm>
  );
}