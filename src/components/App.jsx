// import logo from '../logo.svg';
import React from "react";
import '../App.css';
import Header from './Header'
import Main from "./Main";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import Footer from "./Footer"
import Api from '../utils/Api'
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";

export default function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false)
  const [selectedCard, setSelectedCard] = React.useState({name: '', link: ''})
  const [currentUser, setCurrentUser] = React.useState({})
  const [cards, setCards] = React.useState([])

  React.useEffect(() => {
    Api.getUser()
    .then((info) => {
      setCurrentUser(info)
    })
    .catch(err => console.log(err))
  }, [])

  React.useEffect(() => {
    Api.getCards()
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
    Api.dislikeCard(card._id)
    .then(res => {
      // const newCardsState = [...cards ]
      // newCardsState[cards.indexOf(card)] = {...res}
      // setCards(newCardsState)
      setCards((state) => state.map((c) => c._id === card._id ? res: c))
    })
    .catch(err => console.log(err))
  } else {
    Api.likeCard(card._id)
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
  Api.deleteCard(card._id)
  .then(res => {
    setCards((state) => state.filter((c) => c._id !== card._id))
  })
  .catch(err => console.log(err))
}

  const handleCardClick = (card) => {
    setSelectedCard(card)
  }

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen)
  }

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen)
  }

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen)
  }

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false)
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setSelectedCard({name: '', link: ''})
  }

  const handleCloseWithPushEscButton = (event) => {
    if (event.keyCode === 27) {
      closeAllPopups()
    }
  }

  const handleCloseWithClickOnOverlay = (event) => {
    if (event.target.className.includes('popup_opened')) {
      closeAllPopups()
    }
  }

  const handleUpdateUser = (newUserData) => {
    Api.setUser({newName: newUserData.name, newAbout: newUserData.about})
    .then(res => {
      setCurrentUser(res)
      closeAllPopups()
    })
    .catch(err => console.log(err))
  }

  const handleUpdateAvatar = (userAvatarSrc) => {
    Api.setUserAvatar(userAvatarSrc)
    .then(res => {
      setCurrentUser(res)
      closeAllPopups()
    })
    .catch(err => console.log(err))
  }

  const handleAddPlaceSubmit = (newCard) => {
    Api.setCard(newCard)
    .then(res => {
      setCards([res, ...cards])
      closeAllPopups()
    })
    .catch(err => console.log(err))
  }

  React.useEffect(() => {
    if (isEditProfilePopupOpen || isAddPlacePopupOpen || isEditAvatarPopupOpen || selectedCard.link) {
      document.addEventListener('keydown', handleCloseWithPushEscButton)
      document.addEventListener('click', handleCloseWithClickOnOverlay)
      return () => {
        document.removeEventListener('keydown', handleCloseWithPushEscButton)
        document.removeEventListener('click', handleCloseWithClickOnOverlay)
      }
    }
  })

 
  return (
    <div className="body">
      <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        
        <Header />
        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
        />
        <Footer />
      </div>

      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
      />

      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit}
      />

      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
      />

    <PopupWithForm
      isOpen={false}
      onClose={closeAllPopups}
      name={"confirm"}
      title={"Вы уверены?"}
    >
      <input
        type="submit"
        className="popup__button popup__button_placed_submit-form"
        value="Да"
      />
    </PopupWithForm>

    <ImagePopup
      card={selectedCard}
      onClose={closeAllPopups}
    />
    </CurrentUserContext.Provider>
  </div>
  );
}
