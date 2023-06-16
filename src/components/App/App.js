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
import ProtectedRouteElement from "../ProtectedRoute/ProtectedRoute";
import { checkToken } from '../../utils/auth';
import NavTab from "../NavTab/NavTab";
import CurrentUserContext from "../CurrentUserContext/CurrentUserContext";
import MainApi from "../../utils/MainApi";
import MoviesApi from "../../utils/MoviesApi";
const mainApi = new MainApi('https://api.movies.tearsoprah.nomoredomains.rocks');

export default function App() {

  // АВТОРИЗАЦИЯ И ПРОВЕРКА ТОКЕНА

  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    handleTokenCheck()
  }, [loggedIn])

  const handleTokenCheck = () => {
    if (localStorage.getItem('jwt')) {
      const jwt = localStorage.getItem('jwt');
      checkToken(jwt)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            setUser({
              _id: res._id,
              email: res.email,
              name: res.name
            });
          }
        })
        .finally(() => {
          setIsLoading(false); // Проверка завершена, устанавливаем isLoading в false
        });
    } else {
      setIsLoading(false); // Если токен отсутствует, сразу устанавливаем isLoading в false
    }
  };

  const handleLogin = () => {
    setLoggedIn(true);
  }

  const handleLogout = () => {
    setLoggedIn(false);
    setUser(null);
  };

  // ПОЛУЧАЕМ ВСЕ ФИЛЬМЫ
  useEffect(() => {
    fetchAllMovies();
  }, []);

  const [allMovies, setAllMovies] = useState([]);
  const [errorFetchAllMovies, setErrorFetchAllMovies] = useState('');
  const fetchAllMovies = () => {
    setErrorFetchAllMovies('');

    MoviesApi.getMovies()
      .then((data) => {
        setAllMovies(data);
      })
      .catch(() => {
        setErrorFetchAllMovies('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.');
      });
  };

  // ПОЛУЧАЕМ СОХРАНЕННЫЕ ФИЛЬМЫ
  const [savedMovies, setSavedMovies] = useState([]);
  const [errorFetchSavedMovies, setErrorFetchSavedMovies] = useState('');

  const fetchSavedMovies = () => {
    setErrorFetchSavedMovies('');

    mainApi.getMovies()
      .then((data) => {
        setSavedMovies(data);
      })
      .catch(() => {
        setErrorFetchSavedMovies('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.');
      });
  };

  useEffect(() => {
    fetchSavedMovies();
  }, []);


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
  const headerPaths = ['/movies', '/saved-movies', '/profile', '/'];
  const shouldRenderHeader = headerPaths.includes(location.pathname);

  return (
    <CurrentUserContext.Provider value={user}>
      {shouldRenderHeader && (
        <Header>
          {loggedIn ? (
            <>
              <Navigation isMenuOpen={isMenuOpen} closeMenu={closeMenu} toggleMenu={toggleMenu} />
              {!isMenuOpen && <ProfileButton closeMenu={closeMenu} hidden={true} />}
            </>
          ) : (
            <NavTab />
          )}
        </Header>
      )}
      <Routes>
        <Route path="/" element={<Main />} />

        <Route
          path="/movies"
          element={
            <ProtectedRouteElement
              loggedIn={loggedIn}
              isLoading={isLoading}
              element={Movies}
              allMovies={allMovies}
              errorFetchAllMovies={errorFetchAllMovies}
              savedMovies={savedMovies}
              mainApi={mainApi}
            />
          }
        />
        <Route
          path="/saved-movies"
          element={
            <ProtectedRouteElement
              loggedIn={loggedIn}
              isLoading={isLoading}
              element={SavedMovies}
              savedMovies={savedMovies}
              errorFetchSavedMovies={errorFetchSavedMovies}
            />
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRouteElement
              loggedIn={loggedIn}
              isLoading={isLoading}
              element={Profile}
              handleLogout={handleLogout}
              mainApi={mainApi}
            />
          }
        />

        <Route path="/signin"
               element={<Login handleLogin={handleLogin} loggedIn={loggedIn} />}
        />

        <Route path="/signup"
               element={<Register loggedIn={loggedIn} />}
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </CurrentUserContext.Provider>
  );
}
