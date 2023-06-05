import './Header.css'
import logoIcon from '../../images/logo.svg'
import burgerIcon from '../../images/burger.svg'
import profileIcon from '../../images/profile_icon.svg'
import closerIcon from '../../images/closer.svg'
import {Link} from "react-router-dom";
import {useState, useEffect} from "react";
import Navigation from "../Navigation/Navigation";
import ProfileButton from "../ProfileButton/ProfileButton";

export default function Header() {

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleResize = () => {
      closeMenu();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <header className="header">
      <div className="header__logo">Логотип</div>
      <nav className="navigation">
        <div className={`navigation__container ${isMenuOpen ? 'navigation__container_active' : ''}`}>
          {isMenuOpen && <button className="close-button" onClick={closeMenu}>Закрыть</button>}
          <ul className={'navigation__list'}>
            <li className="navigation__item navigation__item_hidden">Главная</li>
            <li className="navigation__item">Фильмы</li>
            <li className="navigation__item">Сохраненные фильмы</li>
          </ul>
          {isMenuOpen && <ProfileButton />}
        </div>
        <button className={`burger-button`} onClick={toggleMenu}>Меню</button>
        {isMenuOpen && <div className="overlay" onClick={closeMenu}></div>}
      </nav>
      {!isMenuOpen && <ProfileButton hidden={true} />}
    </header>
  );
};
