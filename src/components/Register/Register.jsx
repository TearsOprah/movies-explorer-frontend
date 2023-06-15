import './Register.css'
import React, {useState} from 'react';
import logoIcon from '../../images/logo.svg';
import {Link, useNavigate} from 'react-router-dom';
import { register } from "../../utils/auth";

export default function Register() {

  const navigate = useNavigate();

  const [formValue, setFormValue] = useState({
    name: '',
    email: '',
    password: '',
  })

  const handleChange = (e) => {
    const {name, value} = e.target;

    setFormValue({
      ...formValue,
      [name]: value
    });
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    // здесь обработчик регистрации
    register(formValue)
      .then((res) => {
        navigate('/signin', {replace: true});
      });
  }

  return (
    <form className={'auth'} onSubmit={handleSubmit}>
      <div className={'auth__container'}>
        <div className={'auth__head'}>
          <a className={'animation-transition hovered-button'} href={'/'}>
            <img className={'auth__logo'} src={logoIcon} alt="Логотип" />
          </a>
          <h1 className={'auth__title'}>Добро пожаловать!</h1>
        </div>
        <div className={'auth__inputs-container'}>
          <div className={'auth__input-block'}>
            <label className={'auth__input-name'} htmlFor="name">Имя</label>
            <input
              className={`auth__input`}
              id="name"
              name="name"
              type="text"
              placeholder=""
              value={formValue.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className={'auth__input-block'}>
            <label className={'auth__input-name'} htmlFor="email">Email</label>
            <input
              className={`auth__input`}
              id="email"
              name="email"
              type="email"
              placeholder=""
              value={formValue.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className={'auth__input-block'}>
            <label className={'auth__input-name'} htmlFor="password">Пароль</label>
            <input
              className={`auth__input`}
              id="password"
              name="password"
              type="password"
              placeholder=""
              value={formValue.password}
              onChange={handleChange}
              required
            />
          </div>
          <p className="auth__errors">{'тут будут ошибки'}</p>
        </div>
      </div>

      <div className={'auth__buttons-block'}>
        <p className={'auth__errors centred-block'}>{'тут тоже будут ошибки'}</p>
        <button className={`auth__button animation-transition hovered-button`} type="submit" onSubmit={handleSubmit}>Зарегистрироваться</button>
        <div className={'auth__sign-block'}>
          <p className={'auth__sign-label'}>Уже зарегистрированы?</p>
          <Link className={'auth__sign-link animation-transition hovered-link'} to={'/signin'}>Войти</Link>
        </div>
      </div>
    </form>
  );
};
