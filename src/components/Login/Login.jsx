import './Login.css'
import React, {useState, useEffect} from "react";
import logoIcon from "../../images/logo.svg";
import {Link, useNavigate} from "react-router-dom";
import {authorize} from "../../utils/auth";
import {validateLoginForm} from "../../utils/validation";
export default function Login({ handleLogin, loggedIn }) {

  const navigate = useNavigate();

  useEffect(() => {
    // Если пользователь уже авторизован, перенаправляем на главную страницу
    if (loggedIn) {
      navigate('/');
    }
  }, [loggedIn, navigate]);

  // стейт для полей формы
  const [formValue, setFormValue] = useState({
    email: '',
    password: ''
  })

  // стейт ошибок валидации полей
  const [errors, setErrors] = useState({});

  // стейт для ошибки сервера
  const [serverError, setServerError] = useState('');

  // изменение значений полей
  const handleChange = (e) => {
    const {name, value} = e.target;

    setFormValue({
      ...formValue,
      [name]: value
    });

    const fieldErrors = validateField(name, value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: fieldErrors
    }));
  }

  // отправка формы
  const handleSubmit = (e) => {
    e.preventDefault();

    const formErrors = validateLoginForm(formValue);

    if (
      Object.values(errors).every((value) => value === '') &&
      formValue.email.trim() !== '' &&
      formValue.password.trim() !== ''
    ) {
      authorize(formValue.email, formValue.password)
        .then((data) => {
          if (data.token) {
            setFormValue({ email: "", password: "" });
            setErrors({ email: "", password: "" });
            handleLogin();
            navigate("/movies", { replace: true });
          }
        })
        .catch((err) => {
          if (err === '401') {
            setServerError('Вы ввели неправильный логин или пароль.')
          } else {
            setServerError('При авторизации произошла ошибка. Токен не передан или передан не в том формате.')
          }
        });
    } else {
      setErrors(formErrors);
    }
  };

  // валидация полей
  const validateField = (name, value) => {
    let fieldErrors = '';

    if (name === 'email') {
      fieldErrors = validateLoginForm({ ...formValue, [name]: value }).email || '';
    } else if (name === 'password') {
      fieldErrors = validateLoginForm({ ...formValue, [name]: value }).password || '';
    }

    return fieldErrors;
  }

  return (
    <form className={'auth'} onSubmit={handleSubmit}>
      <div className={'auth__container'}>
        <div className={'auth__head'}>
          <a className={'animation-transition hovered-button'} href={'/'}>
            <img className={'auth__logo'} src={logoIcon} alt="Логотип" />
          </a>
          <h1 className={'auth__title'}>Рады видеть!</h1>
        </div>
        <div className={'auth__inputs-container'}>
          <div className={'auth__input-block'}>
            <label className={'auth__input-name'} htmlFor="email">Email</label>
            <input
              className={'auth__input active-input'}
              id="email"
              name="email"
              type="email"
              value={formValue.email}
              onChange={handleChange}
              placeholder=""
              required
            />
          </div>
          {errors.email && <p className="auth__errors">{errors.email}</p>}
          <div className={'auth__input-block'}>
            <label className={'auth__input-name'} htmlFor="password">Пароль</label>
            <input
              className={'auth__input'}
              id="password"
              name="password"
              type="password"
              value={formValue.password}
              onChange={handleChange}
              placeholder=""
              required
            />
          </div>
          {errors.password && <p className="auth__errors">{errors.password}</p>}
        </div>
      </div>

      <div className={'auth__buttons-block'}>
        {serverError && (<p className={'auth__errors centred-block'}>{serverError}</p>)}
        <button
          className={`auth__button animation-transition hovered-button ${
            !Object.values(errors).every((value) => value === '') ||
            !formValue.email ||
            !formValue.password
              ? 'disabled-button'
              : ''
          }`}
          type="submit"
          disabled={
            !Object.values(errors).every((value) => value === '') ||
            !formValue.email ||
            !formValue.password
          }
        >
          Войти
        </button>
        <div className={'auth__sign-block'}>
          <p className={'auth__sign-label'}>Ещё не зарегистрированы?</p>
          <Link className={'auth__sign-link animation-transition hovered-link'} to={'/signup'}>Регистрация</Link>
        </div>
      </div>
    </form>
  );
}
