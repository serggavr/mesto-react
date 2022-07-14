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

export default function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false)
  const [selectedCard, setSelectedCard] = React.useState({name: '', link: ''})
  const [currentUser, setCurrentUser] = React.useState({})

  React.useEffect(() => {
    Api.getUser()
    .then((info) => {
      setCurrentUser(info)
    })
    .catch(err => console.log(err))
  }, [])

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
    // console.log({newName: newUserData.name, newAbout: newUserData.about})
    Api.setUser({newName: newUserData.name, newAbout: newUserData.about})
    .then(res => {
      setCurrentUser(res)
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
        />
        <Footer />
        
      </div>

      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
        // name={"edit-profile"}
        // title={"Редактировать профиль"}
        // buttonText={"Сохранить"}
      />

      <PopupWithForm
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        name={"update-avatar"}
        title={"Обновить аватар"}
        buttonText={"Сохранить"}
      >
        <input
          data-input="avatar-link-input"
          type="url"
          className="popup__input popup__input_type_avatar-link"
          name="popup__input_type_avatar-link"
          required
          placeholder="Ссылка на новый аватар"
        />
        <span
          className="popup__error"
          data-input="avatar-link-input-error"
        ></span>
      </PopupWithForm>

      <PopupWithForm
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        name={"add-element-card"}
        title={"Новое место"}
        buttonText={"Создать"}
      >
        <input
          data-input="card-name-input"
          type="text"
          className="popup__input popup__input_type_card-name"
          name="popup__input_type_card-name"
          required
          placeholder="Название"
          minLength="2"
          maxLength="30"
        />
        <span
          className="popup__error"
          data-input="card-name-input-error"
        ></span>
        <input
          data-input="image-link-input"
          type="url"
          className="popup__input popup__input_type_image-link"
          name="popup__input_type_image-link"
          required
          placeholder="Ссылка на картинку"
        />
        <span
          className="popup__error"
          data-input="image-link-input-error"
        ></span>
      </PopupWithForm>

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
