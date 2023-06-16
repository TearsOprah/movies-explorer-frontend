import './MoviesCardList.css'
import MoviesCard from "../MoviesCard/MoviesCard";
import MoviesLoader from "../MoviesLoader/MoviesLoader";
import { useEffect, useState } from 'react';

export default function MoviesCardList({ movies, ...props }) {

  console.log('MoviesCardList movies')
  console.log(movies)

  const [visibleCards, setVisibleCards] = useState(getInitialVisibleCards());

  // утсановка кол-ва изначально показываемых карточек
  function getInitialVisibleCards() {
    if (window.innerWidth >= 880) {
      return 12;
    } else if (window.innerWidth >= 600) {
      return 8;
    } else {
      return 5;
    }
  }

  // показ дополнительных карточек по кнопке еще
  const handleShowMore = () => {
    if (window.innerWidth >= 880) {
      setVisibleCards((prevVisibleCards) => prevVisibleCards + 3);
    } else {
      setVisibleCards((prevVisibleCards) => prevVisibleCards + 2);
    }
  };

  // отслеживаем ширину экрана
  useEffect(() => {
    const handleResize = () => {
      setVisibleCards(getInitialVisibleCards());
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const visibleMovies = movies.slice(0, visibleCards);

  return (
    <section className={'movies-cards'}>
      <ul className={'movies-cards__container'}>
        {visibleMovies.map((card) => {
          const isLiked =
            props.savedMovies &&
            props.savedMovies.length > 0 &&
            props.savedMovies.some(
              (savedCard) => savedCard.id === card.id || savedCard.movieId === card.id
            );

          const savedMovie =
            props.savedMovies &&
            props.savedMovies.find(
              (savedCard) => savedCard.id === card.id || savedCard.movieId === card.id
            );

          const savedMovieId = savedMovie ? savedMovie._id : null;

          return (
            <MoviesCard key={card.id || card._id}
                        movieData={card}
                        isLiked={isLiked}
                        savedMovieId={savedMovieId}
                        handleLikeClick={props.handleLikeClick}
            />
          )
        })}
      </ul>
      {movies.length > visibleCards && <MoviesLoader onClick={handleShowMore} />}
    </section>
  )
}
