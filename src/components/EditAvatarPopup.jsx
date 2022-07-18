import React from 'react';
import PopupWithForm from './PopupWithForm';

export default function EditAvatarPopup({
  isOpen,
  onClose,
  onUpdateAvatar,
}) {
  const [submitButtonText, setSubmitButtonText] = React.useState("Создать")
  const userAvatarSrc = React.useRef({})

  const handleSubmit = React.useCallback((e) => {
    e.preventDefault()
    setSubmitButtonText("Сохранение...")
    onUpdateAvatar(userAvatarSrc.current.value)
  }, [onUpdateAvatar])

  function changeAvatarSrc(e) {
    userAvatarSrc.current.value = e.target.value 
  }

  React.useEffect(() => {
    setTimeout(() => {
      setSubmitButtonText("Создать")
      userAvatarSrc.current.value = ''
    }, 1000)
  }, [handleSubmit] )

  return (
    <PopupWithForm
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit}
        name="update-avatar"
        title="Обновить аватар"
        buttonText={submitButtonText}
        isFormValid={true}
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