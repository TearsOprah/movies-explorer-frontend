import './Login.css'
import React, {useState} from "react";
import logoIcon from "../../images/logo.svg";
import {Link} from "react-router-dom";
export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // логика обработки авторизации здесь
  };

  return (
    <form className={'auth'} onSubmit={handleSubmit}>
      <div className={'auth__container'}>
        <div className={'auth__head'}>
          <img className={'auth__logo'} src={logoIcon} alt="Логотип" />
          <h1 className={'auth__title'}>Рады видеть!</h1>
        </div>
        <div className={'auth__inputs-container'}>
          <div className={'auth__input-block'}>
            <label className={'auth__input-name'} htmlFor="email">Email</label>
            <input
              className={'auth__input active-input'}
              type="email"
              id="email"
              placeholder=""
              value={email}
              onChange={handleEmailChange}
            />
          </div>
          <div className={'auth__input-block'}>
            <label className={'auth__input-name'} htmlFor="password">Пароль</label>
            <input
              className={'auth__input'}
              type="password"
              id="password"
              placeholder=""
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <p className={'auth__errors'}>Что-то пошло не так...</p>
        </div>
      </div>

      <div className={'auth__buttons-block'}>
        <button className={'auth__button'} type="submit">Войти</button>
        <div className={'auth__sign-block'}>
          <p className={'auth__sign-label'}>Ещё не зарегистрированы?</p>
          <Link className={'auth__sign-link'} to={'/signup'}>Регистрация</Link>
        </div>
      </div>
    </form>
  );
}
