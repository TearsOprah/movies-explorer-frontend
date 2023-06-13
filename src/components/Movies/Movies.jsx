import './Movies.css'
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import MoviesLoader from "../MoviesLoader/MoviesLoader";
import MoviesApi from '../../utils/MoviesApi';
import { useEffect, useState } from 'react';
import Preloader from "../Preloader/Preloader";
export default function Movies() {

  const [allMovies, setAllMovies] = useState([]);
  const [searchedMovies, setSearchedMovies] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState('');

  // получение всех фильмов
  useEffect(() => {
    fetchAllMovies();
  }, []);

  const fetchAllMovies = () => {
    setError('');

    MoviesApi.getMovies()
      .then((data) => {
        setAllMovies(data);
      })
      .catch(() => {
        setError('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.');
      });
  };

  // поиск по полученным фильмам
  const handleSearch = (searchQuery) => {
    if (allMovies.length === 0) {
      return; // Если фильмы еще не загружены, не выполняем поиск
    }

    setIsSearching(true);
    setError('');

    setTimeout(() => {
      let filteredMovies = [];

      if (searchQuery.trim() !== '') {
        filteredMovies = allMovies.filter((movie) => {
          const nameEN = movie.nameEN ? movie.nameEN.toLowerCase() : '';
          const nameRU = movie.nameRU ? movie.nameRU.toLowerCase() : '';
          const query = searchQuery.toLowerCase();

          return nameEN.includes(query) || nameRU.includes(query);
        });
      }

      setSearchedMovies(filteredMovies);

      // Задержка состояния isSearching на 1 секунду
      setTimeout(() => {
        setIsSearching(false);
        if (filteredMovies.length === 0 && searchQuery.trim() !== '') {
          setError('Ничего не найдено');
        }
      }, 1000);
    }, 0);
  };

  return (
    <main className={'movies'}>
      <SearchForm onSearch={handleSearch} />

      {isSearching ? (
        <Preloader />
      ) : (
        <>
          {searchedMovies.length > 0 ? (
            <>
              <MoviesCardList movies={searchedMovies} />
              <MoviesLoader />
            </>
          ) : (
            <p className={'error-message'}>{error && !isSearching ? error : ''}</p>
          )}
        </>
      )}


      <Footer />
    </main>
  )
}
