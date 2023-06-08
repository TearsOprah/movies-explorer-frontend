import './NavTab.css'
export default function NavTab() {
  return (
    <nav className={'landing-navigation'}>
      <button className={'landing-navigation__button register-button hovered-button animation-transition'}>Регистрация</button>
      <button className={'landing-navigation__button login-button hovered-button animation-transition'}>Войти</button>
    </nav>
  )
}
