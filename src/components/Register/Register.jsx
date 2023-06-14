import './Register.css'
import React, { useState } from 'react';
import logoIcon from '../../images/logo.svg';
import {Link} from "react-router-dom";

export default function Register({ formValue, handleChange, handleRegister }) {

  return (
    <form className={'auth'} onSubmit={handleRegister}>
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
              className={'auth__input'}
              type="text"
              id="name"
              name="name"
              placeholder=""
              value={formValue.name}
              required
              onChange={handleChange}
            />
          </div>
          <div className={'auth__input-block'}>
            <label className={'auth__input-name'} htmlFor="email">Email</label>
            <input
              className={'auth__input active-input'}
              type="email"
              name="email"
              id="email"
              placeholder=""
              value={formValue.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className={'auth__input-block'}>
            <label className={'auth__input-name'} htmlFor="password">Пароль</label>
            <input
              className={'auth__input'}
              type="password"
              name="password"
              id="password"
              placeholder=""
              required
              value={formValue.password}
              onChange={handleChange}
            />
          </div>
          <p className={'auth__errors'}>Что-то пошло не так...</p>
        </div>
      </div>

      <div className={'auth__buttons-block'}>
        <button className={'auth__button animation-transition hovered-button'} type="submit">Зарегистрироваться</button>
        <div className={'auth__sign-block'}>
          <p className={'auth__sign-label'}>Уже зарегистрированы?</p>
          <Link className={'auth__sign-link animation-transition hovered-link'} to={'/signin'}>Войти</Link>
        </div>
      </div>
    </form>
  );
};
