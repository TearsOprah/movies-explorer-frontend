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
import * as auth from "../../utils/auth";
import { register } from '../../utils/auth';


export default function App() {

  // РЕГИСТРАЦИЯ
  // состояние полей в форме регистрации
  const [formValue, setFormValue] = useState({
    name: '',
    email: '',
    password: '',
  })

  // изменение полей
  const handleChange = (e) => {
    const {name, value} = e.target;

    setFormValue({
      ...formValue,
      [name]: value
    });
  }

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
        console.error('Ошибка при регистрации:', error);
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
               />}
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}
