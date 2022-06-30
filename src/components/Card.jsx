import React from 'react';

export default function Card({
                card,
                onCardClick
              })
{

  function handleClick() {
    onCardClick(card);
  }

  return (
    <li className="element">
      <img
        src={card.link}
        alt={card.name}
        className="element__photo"
        onClick={handleClick}
      />
      <button className="element__delete-btn"></button>
      <div className="element__title-block">
        <h2 className="element__title">{card.name}</h2>
        <div className="element__likes-wrapper">
          <button
            className="element__like"
            type="button"
            aria-label="Нравится"
          ></button>
          <span className="element__likes-counter">{card.likes.length}</span>
        </div>
      </div>
    </li>
  );
};