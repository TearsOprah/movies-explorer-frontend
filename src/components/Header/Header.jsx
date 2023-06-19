import './Header.css'
import logoIcon from '../../images/logo.svg'
import { useLocation } from 'react-router-dom';

export default function Header({ children }) {

  const location = useLocation();
  const isMainPage = location.pathname === '/';

  return (
    <header className={`header ${isMainPage ? 'header_main' : ''}`}>
      <a className={'animation-transition hovered-button'} href={'/'}><img src={logoIcon} className="header__logo" alt="movies logos" /></a>
      {children}
    </header>
  );
};
