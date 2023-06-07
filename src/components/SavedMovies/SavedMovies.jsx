import './SavedMovies.css'
import Header from "../Header/Header";
import Navigation from "../Navigation/Navigation";
import ProfileButton from "../ProfileButton/ProfileButton";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
export default function SavedMovies({ isMenuOpen, closeMenu, toggleMenu }) {
  return (
    <main className={'saved-movies'}>
      <Header>
        <Navigation isMenuOpen={isMenuOpen} closeMenu={closeMenu} toggleMenu={toggleMenu} />
        {!isMenuOpen && <ProfileButton hidden={true} />}
      </Header>
      <SearchForm />
      <MoviesCardList />
      <div className={'saved-movies__emp'}>
      </div>
      <Footer />
    </main>
  )
}
