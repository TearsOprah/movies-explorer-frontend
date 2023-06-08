import './SavedMovies.css'
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
export default function SavedMovies() {
  return (
    <main className={'saved-movies'}>
      <SearchForm />
      <MoviesCardList />
      <div className={'saved-movies__emp'}>
      </div>
      <Footer />
    </main>
  )
}
