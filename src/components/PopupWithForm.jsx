import React from 'react';

export default function PopupWithForm({
  name,
  title,
  isOpen,
  onClose,
  children,
  buttonText,
  onSubmit,
  isFormValid
}) {


  return (
      <div className={`popup popup_type_${name} ${isOpen && `popup_opened`}`}>
        <div className="popup__container">
          <button
            className="popup__close-button"
            type="button"
            aria-label="Закрыть"
            onClick={onClose}
          ></button>
          <form
            action="#"
            className="popup__form"
            name={name}
            onSubmit={onSubmit}
            // noValidate
          >
            <h2 className="popup__title">{title}</h2>

            {children}

            {buttonText ? (<input type="submit" className={`popup__button ${!isFormValid && `popup__button_disabled`}`} value={buttonText}/>) : (null)}
          </form>
        </div>
      </div>

  );
};