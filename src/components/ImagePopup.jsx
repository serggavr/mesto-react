import React from 'react';

export default function ImagePopup({
                      card,
                      onClose
                    })
{

 return (
    <div className={`popup popup_type_element-overview ${card && `popup_opened`}`}>
      <div className="popup__container popup__container_placed_element-overview">
        <button
          className="popup__close-button"
          type="button"
          aria-label="Закрыть"
          onClick={card ? onClose : undefined}
        ></button>
        <figure className="overview">
          <img
            className="overview__image"
            src={card ? card.link : undefined}
            alt={card ? card.name : undefined}/>
          <figcaption className="overview__caption">{card ? card.name : undefined}</figcaption>
        </figure>
      </div>
    </div>
 );
};

