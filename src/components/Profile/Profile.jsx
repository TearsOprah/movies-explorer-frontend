import './Profile.css'
import React, { useState, useContext } from 'react';
import CurrentUserContext from "../CurrentUserContext/CurrentUserContext";
import { useNavigate } from 'react-router-dom';
import MainApi from "../../utils/MainApi";

const mainApi = new MainApi('https://api.movies.tearsoprah.nomoredomains.rocks');

export default function Profile() {

  const currentUser = useContext(CurrentUserContext);
  const navigate = useNavigate();
  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  const [isEditing, setIsEditing] = useState(false);

  // ВЫХОД ИЗ АККАУНТА
  function signOut() {
    // Выполняем выход из аккаунта
    localStorage.removeItem('jwt');
    // Выполняем переход на страницу /signin
    navigate('/signin', { replace: true });
  }




  //


  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    try {
      await mainApi.updateProfile(name, email);
      setIsEditing(false);
      // Логика после успешного обновления данных
    } catch (error) {
      // Обработка ошибки при обновлении данных
      console.error('Error updating profile:', error);
    }
  };

  return (
    <main className="profile">
      <div className="profile__container">
        <h1 className="profile__title">{`Привет, ${name}!`}</h1>
        <div className="profile__inputs">
          <div className="profile__inputs-block">
            <label htmlFor="name" className="profile__label">
              Имя:
            </label>
            <input
              type="text"
              id="name"
              className="profile__input"
              value={name}
              onChange={handleNameChange}
              readOnly={!isEditing}
            />
          </div>
          <div className="profile__inputs-block">
            <label htmlFor="email" className="profile__label">
              Email:
            </label>
            <input
              type="email"
              id="email"
              className="profile__input"
              value={email}
              onChange={handleEmailChange}
              readOnly={!isEditing}
            />
          </div>
        </div>
      </div>

      {isEditing ? (
        <div className="profile__buttons-block">
          <button className="profile__save-button" onClick={handleSaveClick}>
            Сохранить
          </button>
        </div>
      ) : (
        <div className="profile__buttons-block">
          <button
            className="profile__edit-button animation-transition hovered-button"
            onClick={handleEditClick}
          >
            Редактировать
          </button>

          <button
            className="profile__exit-button animation-transition hovered-button"
            onClick={signOut}
          >
            Выйти из аккаунта
          </button>
        </div>
      )}
    </main>
  );
}
