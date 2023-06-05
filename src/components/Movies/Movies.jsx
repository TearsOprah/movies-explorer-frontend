import './Movies.css'
import Navigation from "../Navigation/Navigation";
import ProfileButton from "../ProfileButton/ProfileButton";
import Header from "../Header/Header";
export default function Movies({ isMenuOpen, closeMenu, toggleMenu }) {
  return (
    <main className={'movies'}>
      <Header>
        <Navigation isMenuOpen={isMenuOpen} closeMenu={closeMenu} toggleMenu={toggleMenu} />
        {!isMenuOpen && <ProfileButton hidden={true} />}
      </Header>
    </main>
  )
}
