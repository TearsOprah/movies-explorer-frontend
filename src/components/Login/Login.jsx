import './Login.css'
import React, {useState} from "react";
import logoIcon from "../../images/logo.svg";
import {Link, useNavigate} from "react-router-dom";
import {authorize} from "../../utils/auth";
export default function Login({ handleLogin }) {

  const navigate = useNavigate();

  const [formValue, setFormValue] = useState({
    email: '',
    password: ''
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
    if (!formValue.email || !formValue.password){
      return;
    }
    authorize(formValue.email, formValue.password)
      .then((data) => {
        if (data.token){
          setFormValue({email: '', password: ''});
          handleLogin();
          navigate('/movies', {replace: true});
        }
      })
      .catch(err => console.log(err));
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
          <p className={'auth__errors'}>Что-то пошло не так...</p>
        </div>
      </div>

      <div className={'auth__buttons-block'}>
        <button className={'auth__button animation-transition hovered-button'} type="submit">Войти</button>
        <div className={'auth__sign-block'}>
          <p className={'auth__sign-label'}>Ещё не зарегистрированы?</p>
          <Link className={'auth__sign-link animation-transition hovered-link'} to={'/signup'}>Регистрация</Link>
        </div>
      </div>
    </form>
  );
}
