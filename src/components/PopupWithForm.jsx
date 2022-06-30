import React from 'react';

export default function PopupWithForm({
                                        name,
                                        title,
                                        isOpen,
                                        onClose,
                                        children,
                                        buttonText
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
            // noValidate
          >
            <h2 className="popup__title">{title}</h2>

            {children}

            <input type="submit" className="popup__button" value={buttonText}/>
          </form>
        </div>
      </div>

  );
};