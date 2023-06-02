import './Header.css'
import logoIcon from '../../images/logo.svg'
import burgerIcon from '../../images/burger.svg'
import profileIcon from '../../images/profile_icon.svg'
import closerIcon from '../../images/closer.svg'
import {Link} from "react-router-dom";
import {useState, useEffect} from "react";

export default function Header() {

  // меню для малой ширины экрана
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const handleMenuClick = () => {
    setIsOpenMenu(!isOpenMenu);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 600) {
        setIsOpenMenu(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const activeLink = '/'

  const navLink = [
    { title: 'Главная', path: '/' },
    { title: 'Фильмы', path: '/' },
    { title: 'Сохраненные фильмы', path: '/' },
  ]

  return (
    <header className={'header'}>

      <div className={'header__logo'}>
        <img className={'logo'} src={logoIcon}/>
      </div>

      <nav className={'navigation'}>

        <button className={'header__burger'} onClick={handleMenuClick}>
          <img src={isOpenMenu ? closerIcon : burgerIcon} />
        </button>

        {isOpenMenu && (
          <>
            <ul className={`navigation__list ${isOpenMenu ? 'navigation__list-open' : ''}`}>
              {navLink.map((link, index) => (
                <li key={index} className={`navigation__item ${activeLink === link.path ? "navigation__item-active" : ""}`}>
                  <Link to={link.path} className={'navigation__link'} onClick={() => {}}>
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>

            <Link className={'profile-button'} to={'/'}>
              <img className={'profile-button__icon'} src={profileIcon}/>
              <p>Аккаунт</p>
            </Link>
          </>
        )}

        {!isOpenMenu && (
          <ul className={'navigation__list'}>
            {navLink.slice(1).map((link, index) => (
              <li key={index} className={`navigation__item ${activeLink === link.path ? "navigation__item-active" : ""}`}>
                <Link to={link.path}>
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
        )}

      </nav>

      <Link className={'profile-button profile-button_hidden'} to={'/'}>
        <img className={'profile-button__icon'} src={profileIcon}/>
        <p>Аккаунт</p>
      </Link>

    </header>
  )
}
