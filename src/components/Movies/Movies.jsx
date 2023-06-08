import './Movies.css'
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import MoviesLoader from "../MoviesLoader/MoviesLoader";
export default function Movies() {
  return (
    <main className={'movies'}>
      <SearchForm />
      <MoviesCardList />
      <MoviesLoader />
      <Footer />
    </main>
  )
}
