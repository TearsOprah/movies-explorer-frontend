import './MoviesCard.css'
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function MoviesCard({ movieData, isLiked, savedMovieId, handleLikeClick }) {

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const location = useLocation();
  const isActive = location.pathname === '/saved-movies';

  // преобразование формата длительности
  const minutes = Math.floor(movieData.duration / 60); // Получение минут
  const seconds = movieData.duration % 60; // Получение оставшихся секунд
  const formattedDuration = `${minutes}ч ${seconds}м`;

  return (
    <li
      className={`card ${isActive && isHovered ? 'card_hovered' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <a href={movieData.trailerLink} target={'_blank'}>
        <img className={'card__image animation-transition hovered-link'}
             src={movieData.image.url ? 'https://api.nomoreparties.co/' + movieData.image.url : movieData.image}
             alt={movieData.nameRU} />
      </a>
      <div className={'card__description'}>
        <div className={'card__info'}>
          <p className={'card__name'}>{movieData.nameRU}</p>
          {isActive ? (
            <button
              className={'card__delete hovered-button'}
              onClick={() => handleLikeClick(true, movieData._id, movieData)}>
            </button>
          ) : (
            <button
              className={`card__like ${isLiked ? 'card__like_active' : ''} animation-transition hovered-button`}
              onClick={() => handleLikeClick(isLiked, savedMovieId, movieData)}>
            </button>
          )}
        </div>
        <p className={'card__duration'}>{formattedDuration}</p>
      </div>
    </li>
  );

}

