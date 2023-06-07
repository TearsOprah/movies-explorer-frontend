import './App.css';
import {Route, Routes} from "react-router-dom";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Login from "../Login/Login";
import Register from "../Register/Register";
import NotFound from "../NotFound/NotFound";
import {useEffect, useState} from "react";

export default function App() {

  // логика для бургер меню
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

  return (
    <>
      <Routes>
        <Route path={'/'} element={<Main />} />
        <Route path={'/movies'} element={<Movies isMenuOpen={isMenuOpen} closeMenu={closeMenu} toggleMenu={toggleMenu} />} />
        <Route path={'/saved-movies'} element={<SavedMovies isMenuOpen={isMenuOpen} closeMenu={closeMenu} toggleMenu={toggleMenu} />} />
        <Route path={'/profile'} element={<Profile />} />
        <Route path={'/signin'} element={<Login />} />
        <Route path={'/signup'} element={<Register />} />
        <Route path={'*'} element={<NotFound />} />
      </Routes>
    </>
  );
}
