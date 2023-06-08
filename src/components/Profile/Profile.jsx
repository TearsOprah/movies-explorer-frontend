import './Profile.css'
import React, { useState } from 'react';
export default function Profile() {

  const [name, setName] = useState('test');
  const [email, setEmail] = useState('test@example.com');
  const [isEditing, setIsEditing] = useState(false);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    // логика сохранения изменений
  };

  const handleLogoutClick = () => {
    // логика выхода из аккаунта
  };

  return (
    <main className={'profile'}>

      <div className={'profile__container'}>
        <h1 className={'profile__title'}>Привет, Михаил!</h1>
        <div className={'profile__inputs'}>
          <div className={'profile__inputs-block'}>
            <label htmlFor="name" className={'profile__label'}>
              Имя:
            </label>
            <input
              type="text"
              id="name"
              className={'profile__input'}
              value={name}
              onChange={handleNameChange}
              readOnly={!isEditing}
            />
          </div>
          <div className={'profile__inputs-block'}>
            <label htmlFor="email" className={'profile__label'}>
              Email:
            </label>
            <input
              type="email"
              id="email"
              className={'profile__input'}
              value={email}
              onChange={handleEmailChange}
              readOnly={!isEditing}
            />
          </div>
        </div>
      </div>

      {isEditing ? (
        <div className={'profile__buttons-block'}>
          <button className={'profile__save-button'} onClick={handleSaveClick}>
            Сохранить
          </button>
        </div>

      ) : (
        <div className={'profile__buttons-block'}>
          <button className={'profile__edit-button'} onClick={handleEditClick}>
            Редактировать
          </button>

          <button className={'profile__exit-button'} onClick={handleLogoutClick}>
            Выйти из аккаунта
          </button>
        </div>
      )}
    </main>
  );
}
