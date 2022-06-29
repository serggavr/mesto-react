import React from 'react';

export default function Card({
                Card,
                onCardClick
              })
{

  function handleClick() {
    onCardClick(Card);
  }

  return (
    <li className="element" onClick={handleClick}>
      <img
        src={Card.link}
        alt={Card.name}
        className="element__photo"
      />
      <button className="element__delete-btn"></button>
      <div className="element__title-block">
        <h2 className="element__title">{Card.name}</h2>
        <div className="element__likes-wrapper">
          <button
            className="element__like"
            type="button"
            aria-label="Нравится"
          ></button>
          <span className="element__likes-counter">{Card.likes.length}</span>
        </div>
      </div>
    </li>
  );
};