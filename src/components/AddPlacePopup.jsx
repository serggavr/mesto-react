import React from 'react';
import PopupWithForm from './PopupWithForm';

export default function AddPlacePopup({
  isOpen,
  onClose,
  onAddPlace
}) {

  const [newPlaceName, setNewPlaceName] = React.useState(null);
  const [newPlaceImageSrc, setNewPlaceImageSrc] = React.useState(null);

  function handleSubmit(e) {
    e.preventDefault()
    onAddPlace({cardName: newPlaceName, cardLink: newPlaceImageSrc})
  }

  function changeNewPlaceName(e) {
    setNewPlaceName(e.target.value)
  }

  function changeNewPlaceImageSrc(e) {
    setNewPlaceImageSrc(e.target.value)
  }

  React.useEffect(() => {
    setNewPlaceName('')
    setNewPlaceImageSrc('')
  }, [onClose])

  return (
    <PopupWithForm
    isOpen={isOpen}
    onClose={onClose}
    onSubmit={handleSubmit}
    name={"add-element-card"}
    title={"Новое место"}
    buttonText={"Создать"}
  >
    <input
      data-input="card-name-input"
      type="text"
      className="popup__input popup__input_type_card-name"
      name="popup__input_type_card-name"
      required
      placeholder="Название"
      minLength="2"
      maxLength="30"
      onChange={changeNewPlaceName}
      value={newPlaceName ?? ''}
    />
    <span
      className="popup__error"
      data-input="card-name-input-error"
    ></span>
    <input
      data-input="image-link-input"
      type="url"
      className="popup__input popup__input_type_image-link"
      name="popup__input_type_image-link"
      required
      placeholder="Ссылка на картинку"
      onChange={changeNewPlaceImageSrc}
      value={newPlaceImageSrc ?? ''}
    />
    <span
      className="popup__error"
      data-input="image-link-input-error"
    ></span>
  </PopupWithForm>
  );
}