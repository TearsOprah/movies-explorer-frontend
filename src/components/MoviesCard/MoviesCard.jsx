import './MoviesCard.css'
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function MoviesCard({ title, duration, trailerLink, image }) {
  const [isLiked, setIsLiked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleLikeClick = () => {
    setIsLiked(!isLiked);
  };

  const location = useLocation();
  const isActive = location.pathname === '/saved-movies';

  // преобразование формата длительности
  const minutes = Math.floor(duration / 60); // Получение минут
  const seconds = duration % 60; // Получение оставшихся секунд
  const formattedDuration = `${minutes}ч ${seconds}м`;

  return (
    <li
      className={`card ${isActive && isHovered ? 'card_hovered' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img className={'card__image'} src={' https://api.nomoreparties.co/' + image.url} alt={image.name} />
      <div className={'card__description'}>
        <div className={'card__info'}>
          <p className={'card__name'}>{title}</p>
          {isActive ? (
            <button className={'card__delete'}></button>
          ) : (
            <button
              className={`card__like ${isLiked ? 'card__like_active' : ''} animation-transition hovered-button`}
              onClick={handleLikeClick}
            ></button>
          )}
        </div>
        <p className={'card__duration'}>{formattedDuration}</p>
      </div>
    </li>
  );

}

