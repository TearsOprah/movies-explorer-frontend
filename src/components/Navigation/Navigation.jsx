import './Navigation.css'
import ProfileButton from "../ProfileButton/ProfileButton";
import { Link, useLocation } from 'react-router-dom';
export default function Navigation({ isMenuOpen, closeMenu, toggleMenu }) {
  // определяем активный путь для накидывания класса на активный элемент навигации
  const location = useLocation();
  const activePage = location.pathname;

  return (
    <nav className="navigation">
      <div className={`navigation__container ${isMenuOpen ? 'navigation__container_active' : ''}`}>
        {isMenuOpen && <button className="close-button animation-transition hovered-button" onClick={closeMenu}></button>}
        <ul className={'navigation__list'}>
          <li className={`navigation__item navigation__item_hidden animation-transition hovered-link ${activePage === '/' ? 'navigation__item_active' : ''}`}><Link onClick={closeMenu} to={'/'}>Главная</Link></li>
          <li className={`navigation__item animation-transition hovered-link ${activePage === '/movies' ? 'navigation__item_active' : ''}`}><Link onClick={closeMenu} to={'/movies'}>Фильмы</Link></li>
          <li className={`navigation__item animation-transition hovered-link ${activePage === '/saved-movies' ? 'navigation__item_active' : ''}`}><Link onClick={closeMenu} to={'/saved-movies'}>Сохраненные фильмы</Link></li>
        </ul>
        {isMenuOpen && <ProfileButton closeMenu={closeMenu} />}
      </div>
      <button className={`burger-button animation-transition hovered-button`} onClick={toggleMenu}></button>
      {isMenuOpen && <div className="overlay" onClick={closeMenu}></div>}
    </nav>
  )
}
