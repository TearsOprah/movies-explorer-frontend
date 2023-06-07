import './MoviesCard.css'
import cardImg from '../../images/cards/film_1.png'
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function MoviesCard() {
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

  return (
    <li
      className={`card ${isActive && isHovered ? 'card_hovered' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img className={'card__image'} src={cardImg} alt={'film screenshot'} />
      <div className={'card__description'}>
        <div className={'card__info'}>
          <p className={'card__name'}>Соберись перед прыжком</p>
          {isActive ? (
            <button className={'card__delete'}></button>
          ) : (
            <button
              className={`card__like ${isLiked ? 'card__like_active' : ''}`}
              onClick={handleLikeClick}
            ></button>
          )}
        </div>
        <p className={'card__duration'}>1ч 10м</p>
      </div>
    </li>
  );

}

