import './Register.css';
import React, { useState } from 'react';
import logoIcon from '../../images/logo.svg';
import { Link, useNavigate } from 'react-router-dom';
import { register } from "../../utils/auth";
import { validateRegisterForm } from "../../utils/validation";

export default function Register() {
  const navigate = useNavigate();

  // стейт для полей формы
  const [formValue, setFormValue] = useState({
    name: '',
    email: '',
    password: '',
  });

  // стейт для ошибок валидации
  const [errors, setErrors] = useState({});

  // стейт для ошибки сервера
  const [serverError, setServerError] = useState('');

  // изменение значений полей
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValue({
      ...formValue,
      [name]: value
    });

    const fieldErrors = validateField(name, value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: fieldErrors
    }));
  };

  // отправка формы
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formErrors = validateRegisterForm(formValue);

    if (
      Object.values(errors).every((value) => value === '') &&
      formValue.name.trim() !== '' &&
      formValue.email.trim() !== '' &&
      formValue.password.trim() !== ''
    ) {
      try {
        await register(formValue);
        navigate('/signin', { replace: true });
      } catch (error) {
        if (error === "409") {
          setServerError("Пользователь с таким email уже существует");
        } else {
          setServerError("При регистрации пользователя произошла ошибка");
        }
      }
    } else {
      setErrors(formErrors);
    }
  }

  // валидация полей
  const validateField = (name, value) => {
    let fieldErrors = '';

    if (name === 'name') {
      fieldErrors = validateRegisterForm({ ...formValue, [name]: value }).name || '';
    } else if (name === 'email') {
      fieldErrors = validateRegisterForm({ ...formValue, [name]: value }).email || '';
    } else if (name === 'password') {
      fieldErrors = validateRegisterForm({ ...formValue, [name]: value }).password || '';
    }

    return fieldErrors;
  }

  return (
    <form className="auth" onSubmit={handleSubmit} noValidate>
      <div className="auth__container">
        <div className="auth__head">
          <a className="animation-transition hovered-button" href="/">
            <img className="auth__logo" src={logoIcon} alt="Логотип" />
          </a>
          <h1 className="auth__title">Добро пожаловать!</h1>
        </div>
        <div className="auth__inputs-container">
          <div className="auth__input-block">
            <label className="auth__input-name" htmlFor="name">Имя</label>
            <input
              className="auth__input"
              id="name"
              name="name"
              type="text"
              placeholder=""
              value={formValue.name}
              onChange={handleChange}
              required
            />
          </div>
          {errors.name && <p className="auth__errors">{errors.name}</p>}
          <div className="auth__input-block">
            <label className="auth__input-name" htmlFor="email">Email</label>
            <input
              className="auth__input"
              id="email"
              name="email"
              type="email"
              placeholder=""
              value={formValue.email}
              onChange={handleChange}
              required
            />
          </div>
          {errors.email && <p className="auth__errors">{errors.email}</p>}
          <div className="auth__input-block">
            <label className="auth__input-name" htmlFor="password">Пароль</label>
            <input
              className="auth__input"
              id="password"
              name="password"
              type="password"
              placeholder=""
              value={formValue.password}
              onChange={handleChange}
              required
            />
          </div>
          {errors.password && <p className="auth__errors">{errors.password}</p>}
        </div>
      </div>

      <div className="auth__buttons-block">
        {serverError && <p className="auth__errors centred-block">{serverError}</p>}
        <button
          className={`auth__button animation-transition hovered-button ${
            !Object.values(errors).every((value) => value === '') ||
            !formValue.name ||
            !formValue.email ||
            !formValue.password
              ? 'disabled-button'
              : ''
          }`}
          type="submit"
          disabled={
            !Object.values(errors).every((value) => value === '') ||
            !formValue.name ||
            !formValue.email ||
            !formValue.password
          }
        >
          Зарегистрироваться
        </button>
        <div className="auth__sign-block">
          <p className="auth__sign-label">Уже зарегистрированы?</p>
          <Link className="auth__sign-link animation-transition hovered-link" to="/signin">Войти</Link>
        </div>
      </div>
    </form>
  );
}
