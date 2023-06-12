import './Navigation.css'
import ProfileButton from "../ProfileButton/ProfileButton";
import { Link } from 'react-router-dom';
export default function Navigation({ isMenuOpen, closeMenu, toggleMenu }) {
  return (
    <nav className="navigation">
      <div className={`navigation__container ${isMenuOpen ? 'navigation__container_active' : ''}`}>
        {isMenuOpen && <button className="close-button animation-transition hovered-button" onClick={closeMenu}></button>}
        <ul className={'navigation__list'}>
          <li className="navigation__item navigation__item_hidden animation-transition hovered-link"><Link to={'/'}>Главная</Link></li>
          <li className="navigation__item navigation__item_active animation-transition hovered-link"><Link to={'/movies'}>Фильмы</Link></li>
          <li className="navigation__item animation-transition hovered-link"><Link to={'/saved-movies'}>Сохраненные фильмы</Link></li>
        </ul>
        {isMenuOpen && <ProfileButton />}
      </div>
      <button className={`burger-button animation-transition hovered-button`} onClick={toggleMenu}></button>
      {isMenuOpen && <div className="overlay" onClick={closeMenu}></div>}
    </nav>
  )
}
