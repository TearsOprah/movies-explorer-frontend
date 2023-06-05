import './NavTab.css'
export default function NavTab() {
  return (
    <nav className={'landing-navigation'}>
      <button className={'landing-navigation__button register-button'}>Регистрация</button>
      <button className={'landing-navigation__button login-button'}>Войти</button>
    </nav>
  )
}
