import './MoviesCard.css'
import cardImg from '../../images/cards/film_1.png'
import React, { useState } from 'react';

export default function MoviesCard() {
  const [isLiked, setIsLiked] = useState(false);

  const handleLikeClick = () => {
    setIsLiked(!isLiked);
  };

  return (
    <li className={'card'}>
      <img className={'card__image'} src={cardImg} alt={'film screenshot'} />
      <div className={'card__description'}>
        <div className={'card__info'}>
          <p className={'card__name'}>Соберись перед прыжком</p>
          <button
            className={`card__like ${isLiked ? 'card__like_active' : ''}`}
            onClick={handleLikeClick}
          ></button>
        </div>
        <p className={'card__duration'}>1ч 10м</p>
      </div>
    </li>
  );
}

