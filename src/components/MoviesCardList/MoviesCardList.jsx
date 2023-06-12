import './MoviesCardList.css'
import MoviesCard from "../MoviesCard/MoviesCard";
export default function MoviesCardList() {
  return (
    <section className={'movies-cards'}>
      <ul className={'movies-cards__container'}>
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
      </ul>
    </section>
  )
}
