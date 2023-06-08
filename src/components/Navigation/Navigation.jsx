import './Navigation.css'
import ProfileButton from "../ProfileButton/ProfileButton";
export default function Navigation({ isMenuOpen, closeMenu, toggleMenu }) {
  return (
    <nav className="navigation">
      <div className={`navigation__container ${isMenuOpen ? 'navigation__container_active' : ''}`}>
        {isMenuOpen && <button className="close-button animation-transition hovered-button" onClick={closeMenu}></button>}
        <ul className={'navigation__list'}>
          <li className="navigation__item navigation__item_hidden animation-transition hovered-link">Главная</li>
          <li className="navigation__item navigation__item_active animation-transition hovered-link">Фильмы</li>
          <li className="navigation__item animation-transition hovered-link">Сохраненные фильмы</li>
        </ul>
        {isMenuOpen && <ProfileButton />}
      </div>
      <button className={`burger-button animation-transition hovered-button`} onClick={toggleMenu}></button>
      {isMenuOpen && <div className="overlay" onClick={closeMenu}></div>}
    </nav>
  )
}
