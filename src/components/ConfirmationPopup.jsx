import React from 'react';
import PopupWithForm from './PopupWithForm';

export default function ConfirmationPopup({
  onClose,
  isOpen,
  onConfirmDeleteCard
}) {

function handleConfirmationDeleteCard(e) {
  e.preventDefault()
  onConfirmDeleteCard()
}

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      name="confirm"
      title="Вы уверены?"
    >
      <input
        type="submit"
        className="popup__button popup__button_placed_submit-form"
        value="Да"
        onClick={handleConfirmationDeleteCard}
      />
    </PopupWithForm>
  );
}

