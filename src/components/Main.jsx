import React from 'react';
import api from '../utils/Api'
import Card from './Card'

export default function Main({
                onEditAvatar,
                onEditProfile,
                onAddPlace,
                onCardClick
              })
{

  const [userName, setUserName] = React.useState('')
  const [userDescription, setUserDescription] = React.useState('')
  const [userAvatar, setUserAvatar] = React.useState('')
  const [cards, setCards] = React.useState([])

  React.useEffect(() => {
    Promise.all([
      api.getUser(),
      api.getCards()
    ])
      .then(([info, cards]) => {
        setCards(cards)
        setUserName(info.name)
        setUserDescription(info.about)
        setUserAvatar(info.avatar)
      })
      .catch(err => console.log(err))
  },[])


  return (
    <main className="content">
      <section className="profile section">
        <div className="profile__avatar-wrapper">
          <img
            src={userAvatar}
            alt="Аватар пользователя"
            className="profile__avatar"/>
          <button
            className="profile__avatar-change-button"
            onClick={onEditAvatar}
          ></button>
        </div>
        <div className="profile__info">
          <div className="profile__title-block">
            <h1 className="profile__title">{userName}</h1>
            <button
              className="profile__change-button"
              type="button"
              aria-label="Редактировать профиль"
              onClick={onEditProfile}
            ></button>
          </div>
          <p className="profile__subtitle">{userDescription}</p>
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

          {cards.map((card,) => {
            return (
                <Card card={card} key={card._id} onCardClick={onCardClick}/>
            )
          })}

        </ul>
      </section>
    </main>
  );
};