import React from 'react';
import PopupWithForm from './PopupWithForm';

export default function AddPlacePopup({
  isOpen,
  onClose,
  onAddPlace,
  onValidation
}) {

  const [formValid, setFormValid] = React.useState(false)
  const [submitButtonText, setSubmitButtonText] = React.useState("Создать")

  const [newPlaceName, setNewPlaceName] = React.useState(null);
  const [newPlaceNameInputValid, setNewPlaceNameInputValid] = React.useState(true)
  const newPlaceNameErrorContainer = React.useRef({})

  const [newPlaceImageSrc, setNewPlaceImageSrc] = React.useState(null);
  const [newPlaceImageSrcInputValid, setNewPlaceImageSrcInputValid] = React.useState(true)
  const newPlaceImageSrcErrorContainer = React.useRef({})


  function handleSubmit(e) {
    e.preventDefault()
    setSubmitButtonText("Сохранение...")
    onAddPlace({cardName: newPlaceName, cardLink: newPlaceImageSrc})
  }

  function changeNewPlaceName(e) {
    setNewPlaceName(e.target.value)
    setNewPlaceNameInputValid(onValidation(e, newPlaceNameErrorContainer))
    console.log(newPlaceNameErrorContainer.current.textContent)
  }

  function changeNewPlaceImageSrc(e) {
    setNewPlaceImageSrc(e.target.value)
    setNewPlaceImageSrcInputValid(onValidation(e, newPlaceImageSrcErrorContainer))
  }

  React.useEffect(() => {
    setTimeout(() => {
      setSubmitButtonText("Создать")
      setFormValid(false)
      setNewPlaceName('')
      setNewPlaceImageSrc('')
      setNewPlaceNameInputValid(true)
      setNewPlaceImageSrcInputValid(true)
      newPlaceNameErrorContainer.current.textContent = ''
      newPlaceImageSrcErrorContainer.current.textContent = ''
    }, 500)
  }, [onClose])

  React.useEffect(() => {
    !newPlaceNameInputValid || !newPlaceImageSrcInputValid ? setFormValid(false) : setFormValid(true)
  }, [newPlaceNameInputValid, newPlaceImageSrcInputValid])

  return (
    <PopupWithForm
    isOpen={isOpen}
    onClose={onClose}
    onSubmit={handleSubmit}
    name="add-element-card"
    title="Новое место"
    buttonText={submitButtonText}
    isFormValid={formValid}
  >
    <input
      data-input="card-name-input"
      type="text"
      className={`popup__input popup__input_type_card-name ${!newPlaceNameInputValid && `popup__input_type_error`}`}
      name="popup__input_type_card-name"
      required
      placeholder="Название"
      minLength="2"
      maxLength="30"
      onChange={changeNewPlaceName}
      value={newPlaceName ?? ''}
    />
    <span
      className={`popup__error ${!newPlaceNameInputValid && `popup__error_visible`}`}
      data-input="card-name-input-error"
      ref={newPlaceNameErrorContainer}
    ></span>
    <input
      data-input="image-link-input"
      type="url"
      className={`popup__input popup__input_type_image-link ${!newPlaceImageSrcInputValid && `popup__input_type_error`}`}
      name="popup__input_type_image-link"
      required
      placeholder="Ссылка на картинку"
      onChange={changeNewPlaceImageSrc}
      value={newPlaceImageSrc ?? ''}
    />
    <span
      className={`popup__error ${!newPlaceImageSrcInputValid && `popup__error_visible`}`}
      data-input="image-link-input-error"
      ref={newPlaceImageSrcErrorContainer}
    ></span>
  </PopupWithForm>
  );
}