import './Movies.css'
import Navigation from "../Navigation/Navigation";
import ProfileButton from "../ProfileButton/ProfileButton";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import MoviesLoader from "../MoviesLoader/MoviesLoader";
export default function Movies({ isMenuOpen, closeMenu, toggleMenu }) {
  return (
    <main className={'movies'}>
      <Header>
        <Navigation isMenuOpen={isMenuOpen} closeMenu={closeMenu} toggleMenu={toggleMenu} />
        {!isMenuOpen && <ProfileButton hidden={true} />}
      </Header>
      <SearchForm />
      <MoviesCardList />
      <MoviesLoader />
      <Footer />
    </main>
  )
}
