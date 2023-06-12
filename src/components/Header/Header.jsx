import './Header.css'
import logoIcon from '../../images/logo.svg'

export default function Header({ children }) {
  return (
    <header className="header">
      <a className={'animation-transition hovered-button'} href={'/'}><img src={logoIcon} className="header__logo" alt="movies logos" /></a>
      {children}
    </header>
  );
};
