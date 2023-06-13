import './MoviesCardList.css'
import MoviesCard from "../MoviesCard/MoviesCard";
import MoviesLoader from "../MoviesLoader/MoviesLoader";
import { useEffect, useState } from 'react';

export default function MoviesCardList({ movies }) {

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
        {visibleMovies.map((card) => (
          <MoviesCard key={card.id}
                      title={card.nameRU}
                      duration={card.duration}
                      trailerLink={card.trailerLink}
                      image={card.image}
          />
        ))}
      </ul>
      {movies.length > visibleCards && <MoviesLoader onClick={handleShowMore} />}
    </section>
  )
}
