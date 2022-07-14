import React from 'react';
import api from '../utils/Api'
import Card from './Card'
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function Main({
                onEditAvatar,
                onEditProfile,
                onAddPlace,
                onCardClick
              })
{

  // const [userName, setUserName] = React.useState('')
  // const [userDescription, setUserDescription] = React.useState('')
  // const [userAvatar, setUserAvatar] = React.useState('')
  const [cards, setCards] = React.useState([])
  const currentUser = React.useContext(CurrentUserContext)

  React.useEffect(() => {
      api.getCards()
      .then((cards) => {
        setCards(cards)
      })
      .catch(err => console.log(err))
  },[])

  React.useEffect(() => {
    setCards(cards)
  }, [cards] )

  function handleCardLike(card) {
    const isLiked = card.likes.some(like => like._id === currentUser._id);
    if (isLiked) {
      api.dislikeCard(card._id)
      .then(res => {
        // const newCardsState = [...cards ]
        // newCardsState[cards.indexOf(card)] = {...res}
        // setCards(newCardsState)
        setCards((state) => state.map((c) => c._id === card._id ? res: c))
      })
      .catch(err => console.log(err))
    } else {
      api.likeCard(card._id)
      .then(res => {
        // const newCardsState = [...cards ]
        // newCardsState[cards.indexOf(card)] = {...res}
        // setCards(newCardsState)
        setCards((state) => state.map((c) => c._id === card._id ? res: c))
      })
      .catch(err => console.log(err))
    }
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
    .then(res => {
      setCards((state) => state.filter((c) => c._id !== card._id))
    })
    .catch(err => console.log(err))
  }


  return (
    <main className="content">
      <section className="profile section">
        <div className="profile__avatar-wrapper">
          <img
            src={currentUser.avatar}
            alt="Аватар пользователя"
            className="profile__avatar"/>
          <button
            className="profile__avatar-change-button"
            onClick={onEditAvatar}
          ></button>
        </div>
        <div className="profile__info">
          <div className="profile__title-block">
            <h1 className="profile__title">{currentUser.name}</h1>
            <button
              className="profile__change-button"
              type="button"
              aria-label="Редактировать профиль"
              onClick={onEditProfile}
            ></button>
          </div>
          <p className="profile__subtitle">{currentUser.about}</p>
        </div>
        <button
          className="profile__add-button"
          type="button"
          aria-label="Добавить карточку"
          onClick={onAddPlace}
        ></button>
      </section>
      <section className="elements section">
        <ul className="elements__list">

          {cards.map((card) => {
            return (
                <Card card={card} key={card._id} onCardClick={onCardClick} onCardLike={handleCardLike} onCardDelete={handleCardDelete}/>
            )
          })}

        </ul>
      </section>
    </main>
  );
};