// import logo from '../logo.svg';
import React from "react";
import '../App.css';
import Header from './Header'
import Main from "./Main";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import Footer from "./Footer"

export default function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false)
  const [selectedCard, setSelectedCard] = React.useState({name: '', link: ''})

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

  return (
    <div className="body">
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

      <PopupWithForm
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        name={"edit-profile"}
        title={"Редактировать профиль"}
        buttonText={"Сохранить"}
      >
        <input
          data-input="name-input"
          type="text"
          className="popup__input popup__input_type_username"
          name="popup__input_type_username"
          required
          placeholder="Имя"
          minLength="2"
          maxLength="40"
        />
        <span
          className="popup__error"
          data-input="name-input-error"
        ></span>
        <input
          data-input="description-input"
          type="text"
          className="popup__input popup__input_type_description"
          name="popup__input_type_description"
          required
          placeholder="О себе"
          minLength="2"
          maxLength="200"
        />
        <span
          className="popup__error"
          data-input="description-input-error"
        ></span>
      </ PopupWithForm>

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
  </div>
  );
}
