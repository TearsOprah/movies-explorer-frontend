import './App.css';
import {Route, Routes, useLocation} from "react-router-dom";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Login from "../Login/Login";
import Register from "../Register/Register";
import NotFound from "../NotFound/NotFound";
import {useEffect, useState} from "react";
import Navigation from "../Navigation/Navigation";
import ProfileButton from "../ProfileButton/ProfileButton";
import Header from "../Header/Header";
import { register } from '../../utils/auth';


export default function App() {

  // РЕГИСТРАЦИЯ

  // состояние полей в форме регистрации
  const [formValue, setFormValue] = useState({
    name: '',
    email: '',
    password: '',
  })

  // состояние ошибок
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
  });


  // изменение полей
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'name') {
      if (!value) {
        setErrors((prevState) => ({
          ...prevState,
          name: 'Поле Имя не может быть пустым.',
        }));
      } else if (!/^[a-zA-Zа-яА-ЯёЁ\s-]+$/.test(value)) {
        setErrors((prevState) => ({
          ...prevState,
          name: 'Поле Имя может содержать только латиницу, кириллицу, пробел или дефис.',
        }));
      } else {
        setErrors((prevState) => ({
          ...prevState,
          name: '',
        }));
      }
    } else if (name === 'email') {
      if (!value) {
        setErrors((prevState) => ({
          ...prevState,
          email: 'Поле Email не может быть пустым.',
        }));
      } else {
        const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
        if (!emailRegex.test(value)) {
          setErrors((prevState) => ({
            ...prevState,
            email: 'Адрес электронной почты должен быть в правильном формате.',
          }));
        } else {
          setErrors((prevState) => ({
            ...prevState,
            email: '',
          }));
        }
      }
    } else if (name === 'password') {
    if (!value) {
      setErrors((prevState) => ({
        ...prevState,
        password: 'Поле Пароль не может быть пустым.',
      }));
    } else if (value.length < 8) {
      setErrors((prevState) => ({
        ...prevState,
        password: 'Пароль должен содержать не менее 8 символов.',
      }));
    } else if (!/(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]/.test(value)) {
      setErrors((prevState) => ({
        ...prevState,
        password: 'Пароль должен содержать буквы, цифры и хотя бы один специальный символ.',
      }));
    } else {
      setErrors((prevState) => ({
        ...prevState,
        password: '',
      }));
    }
  }

    setFormValue((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const [serverError, setServerError] = useState(null);

  // отправка формы регистрации
  const handleRegister = (e) => {
    e.preventDefault();

    register(formValue)
      .then((data) => {
        // Обработка успешного ответа после регистрации
        console.log('Регистрация прошла успешно:', data);
      })
      .catch((error) => {
        // Обработка ошибки регистрации

        if (error) {
          if (error === '409') {
            setServerError('Пользователь с таким email уже существует')
          } else {
            setServerError('При регистрации пользователя произошла ошибка')
          }
        }

      });
  };

  // ЛОГИКА ДЛЯ БУРГЕР МЕНЮ
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleResize = () => {
      closeMenu();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const location = useLocation();
  const headerPaths = ['/movies', '/saved-movies', '/profile'];
  const shouldRenderHeader = headerPaths.includes(location.pathname);

  return (
    <div>
      {shouldRenderHeader && (
        <Header>
          <Navigation isMenuOpen={isMenuOpen} closeMenu={closeMenu} toggleMenu={toggleMenu} />
          {!isMenuOpen && <ProfileButton hidden={true} />}
        </Header>
      )}
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/saved-movies" element={<SavedMovies />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/signin" element={<Login />} />

        <Route path="/signup"
               element={<Register
                 formValue={formValue}
                 handleChange={handleChange}
                 handleRegister={handleRegister}
                 errors={errors}
                 serverError={serverError}
               />}
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}
