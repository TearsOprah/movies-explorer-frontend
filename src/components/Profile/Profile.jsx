import './Profile.css';
import React, { useState, useContext } from 'react';
import CurrentUserContext from "../CurrentUserContext/CurrentUserContext";
import { useNavigate } from 'react-router-dom';
import { validateProfileForm } from "../../utils/validation";

export default function Profile({ handleLogout, mainApi, setUser }) {
  const currentUser = useContext(CurrentUserContext);
  const navigate = useNavigate();
  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('')
  const [isSaved, setIsSaved] = useState(false);

  // изменение и валидация полей
  const handleNameChange = (e) => {
    setName(e.target.value);
    const formErrors = validateProfileForm({ name: e.target.value }, 'name');
    setErrors(formErrors);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (isEditing) {
      const formErrors = validateProfileForm({ email: e.target.value }, 'email');
      setErrors(formErrors);
    }
  };

  const handleEditClick = () => {
    setServerError('')
    setIsEditing(true);
  };

  // сохранение изменений
  const handleSaveClick = async () => {
    // Валидация введенных данных перед сохранением
    const formErrors = validateProfileForm({ name, email });

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    try {
      await mainApi.updateProfile(name, email);
      setIsEditing(false);
      setIsSaved(true);
      setUser({ ...currentUser, name, email });
    } catch (error) {
      // Обработка ошибки при обновлении данных
      setServerError('При обновлении профиля произошла ошибка.')
      console.error('При обновлении профиля произошла ошибка:', error);
    }
  };

  // выход из аккаунта
  const signOut = () => {
    localStorage.removeItem('jwt');
    handleLogout();
    navigate('/', { replace: true });
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
          {errors.name && <span className="auth__errors">{errors.name}</span>}
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
          {errors.email && <span className="auth__errors">{errors.email}</span>}
        </div>
      </div>
      {isEditing ? (
        <div className="profile__buttons-block">
          {serverError && <span className="auth__errors centred-block">{serverError}</span>}
          <button
            className={`profile__save-button ${Object.keys(errors).length > 0 || (name === currentUser.name && email === currentUser.email) ? 'disabled-button' : ''}`}
            onClick={handleSaveClick}
            disabled={!isEditing || (name === currentUser.name && email === currentUser.email) || Object.keys(errors).length > 0}
          >
            Сохранить
          </button>
        </div>
      ) : (
        <div className="profile__buttons-block">
          {isSaved && <span className="auth__success centred-block">Профиль успешно сохранен.</span>}
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
