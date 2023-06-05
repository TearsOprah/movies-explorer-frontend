import './Header.css'
import logoIcon from '../../images/logo.svg'

export default function Header({ children }) {
  return (
    <header className="header">
      <img src={logoIcon} className="header__logo" alt="movies logos" />
      {children}
    </header>
  );
};
