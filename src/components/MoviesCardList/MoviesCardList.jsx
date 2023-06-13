import './MoviesCardList.css'
import MoviesCard from "../MoviesCard/MoviesCard";
export default function MoviesCardList({ movies }) {
  return (
    <section className={'movies-cards'}>
      <ul className={'movies-cards__container'}>
        {movies.map((card) => (
          <MoviesCard key={card.id}
                      title={card.nameRU}
                      duration={card.duration}
                      trailerLink={card.trailerLink}
                      image={card.image}
          />
        ))}
      </ul>
    </section>
  )
}
