// import logo from '../logo.svg';
import React from "react";
import '../App.css';
import Header from './Header'
import Main from "./Main";
import ImagePopup from "./ImagePopup";
import Footer from "./Footer"
import Api from '../utils/Api'
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmationPopup from "./ConfirmationPopup";

export default function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false)
  const [isConfirmationPopupOpen, setIsConfirmationPopupOpen] = React.useState(false)
  const [selectedCard, setSelectedCard] = React.useState({name: '', link: ''})
  const [deletedCard, setDeletedCard] = React.useState({})
  const [currentUser, setCurrentUser] = React.useState({})
  const [cards, setCards] = React.useState([])

React.useEffect(() => {
  Promise.all([Api.getUser(), Api.getCards()])
  .then(([info, cards]) => {
    setCurrentUser(info)
    setCards(cards)
  })
  .catch(err => console.log(err))
},[])

function handleCardLike(card) {
  const isLiked = card.likes.some(like => like._id === currentUser._id);
  if (isLiked) {
    Api.dislikeCard(card._id)
    .then(res => {
      setCards((state) => state.map((c) => c._id === card._id ? res: c))
    })
    .catch(err => console.log(err))
  } else {
    Api.likeCard(card._id)
    .then(res => {
      setCards((state) => state.map((c) => c._id === card._id ? res: c))
    })
    .catch(err => console.log(err))
  }
}

function handleDeleteConfirmation(card) {
  console.log(card)
  Api.deleteCard(card._id)
  .then(res => {
    setCards((state) => state.filter((c) => c._id !== card._id))
  })
  .then(res => {
    closeAllPopups()
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

  const handleDeleteConfirmationPopup = (card) => {
    setIsConfirmationPopupOpen(!isConfirmationPopupOpen)
    setDeletedCard(card)
  }

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false)
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsConfirmationPopupOpen(false)
    setSelectedCard({name: '', link: ''})
    setDeletedCard({})
  }

  const handleCloseWithPushEscButton = React.useCallback((event) => {
    if (event.keyCode === 27) {
      closeAllPopups()
    }
  }, [])

  const handleCloseWithClickOnOverlay = React.useCallback((event) => {
    if (event.target.className.includes('popup_opened')) {
      closeAllPopups()
    }
  }, [])

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
    })
    .then(res => closeAllPopups())
    .catch(err => console.log(err))
  }

  const handleAddPlaceSubmit = (newCard) => {
    Api.setCard(newCard)
    .then(res => {
      setCards([res, ...cards])
    })
    .then(res => closeAllPopups())
    .catch(err => console.log(err))
  }

  function handleValidation(inputEvent, validationErrorMessageContainer) {
    validationErrorMessageContainer.current.textContent = inputEvent.target.validationMessage;
    return validationErrorMessageContainer.current.textContent ? false : true;
  }

  React.useEffect(() => {
    if (isEditProfilePopupOpen || isAddPlacePopupOpen || isEditAvatarPopupOpen || isConfirmationPopupOpen || selectedCard.link) {
      document.addEventListener('keydown', handleCloseWithPushEscButton)
      document.addEventListener('click', handleCloseWithClickOnOverlay)
      return () => {
        document.removeEventListener('keydown', handleCloseWithPushEscButton)
        document.removeEventListener('click', handleCloseWithClickOnOverlay)
      }
    }
  }, [isEditProfilePopupOpen,
      isAddPlacePopupOpen,
      isEditAvatarPopupOpen,
      isConfirmationPopupOpen,
      selectedCard.link,
      handleCloseWithClickOnOverlay,
      handleCloseWithPushEscButton,
    ])

 
  return (
    <>
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
          onCardDeleteWithConfirmation={handleDeleteConfirmationPopup}
        />
        <Footer />
      </div>

      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
        onValidation={handleValidation}
      />

      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit}
        onValidation={handleValidation}
      />

      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
      />

      <ConfirmationPopup
        isOpen={isConfirmationPopupOpen}
        onClose={closeAllPopups}
        onConfirmDeleteCard={() => handleDeleteConfirmation(deletedCard)}
      />

    <ImagePopup
      card={selectedCard}
      onClose={closeAllPopups}
    />
    </CurrentUserContext.Provider>
  </>
  );
}
