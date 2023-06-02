import './Header.css'
import logoIcon from '../../images/logo.svg'
import burgerIcon from '../../images/burger.svg'
import profileIcon from '../../images/profile_icon.svg'
import {Link} from "react-router-dom";
export default function Header() {

  const activeLink = '/'

  const isOpenMenu = true

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

        <button className={'header__burger'} onClick={() => {}}>
          <img src={burgerIcon} />
        </button>

        {isOpenMenu && (
          <ul className={`navigation__list ${isOpenMenu ? 'navigation__list-open' : ''}`}>
            {navLink.map((link, index) => (
              <li key={index} className={`navigation__item ${activeLink === link.path ? "navigation__item-active" : ""}`}>
                <Link to={link.path} className={'navigation__link'} onClick={() => {}}>
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
        )}

        {!isOpenMenu && (
          <ul className={'navigation__list'}>
            {navLink.map((link, index) => (
              <li key={index} className={`navigation__item ${activeLink === link.path ? "navigation__item-active" : ""}`}>
                <Link to={link.path}>
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
        )}

      </nav>


      <Link className={'profile-button'} to={'/'}>
        <img className={'profile-button__icon'} src={profileIcon}/>
        <p>Аккаунт</p>
      </Link>

    </header>
  )
}
