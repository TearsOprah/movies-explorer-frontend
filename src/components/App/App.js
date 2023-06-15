import './App.css';
import {Route, Routes, useLocation, useNavigate} from "react-router-dom";
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
import ProtectedRouteElement from "../ProtectedRoute/ProtectedRoute";
import { checkToken } from '../../utils/auth';


export default function App() {

  // АВТОРИЗАЦИЯ И ПРОВЕРКА ТОКЕНА
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    handleTokenCheck()
  }, [])

  const handleTokenCheck = () => {
    if (localStorage.getItem('jwt')) {
      const jwt = localStorage.getItem('jwt');
      checkToken(jwt)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            navigate('/movies', {replace: true})
          }
        })
    }
  }

  const handleLogin = () => {
    setLoggedIn(true);
  }

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
    <>
      {shouldRenderHeader && (
        <Header>
          <Navigation isMenuOpen={isMenuOpen} closeMenu={closeMenu} toggleMenu={toggleMenu} />
          {!isMenuOpen && <ProfileButton hidden={true} />}
        </Header>
      )}
      <Routes>
        <Route path="/" element={<Main />} />

        <Route path="/movies" element={<ProtectedRouteElement loggedIn={loggedIn} element={Movies} />} />
        <Route path="/saved-movies" element={<ProtectedRouteElement loggedIn={loggedIn} element={SavedMovies} />} />
        <Route path="/profile" element={<ProtectedRouteElement loggedIn={loggedIn} element={Profile} />} />

        <Route path="/signin"
               element={<Login handleLogin={handleLogin} />}
        />

        <Route path="/signup"
               element={<Register />}
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
