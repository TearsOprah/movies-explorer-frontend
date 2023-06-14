import './Movies.css'
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import MoviesApi from '../../utils/MoviesApi';
import { useEffect, useState } from 'react';
import Preloader from "../Preloader/Preloader";
export default function Movies() {

  const [allMovies, setAllMovies] = useState([]);
  const [searchedMovies, setSearchedMovies] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState('');
  const [shortFilmOnly, setShortFilmOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');


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
  const handleSearch = (e) => {
    if (e) {
      e.preventDefault();
    }
    setIsSearching(true);
    setError('');

    if (searchQuery.trim() !== '') {
      let filteredMovies = allMovies;

      const query = searchQuery.toLowerCase();
      filteredMovies = allMovies.filter(
        (movie) =>
          (movie.nameEN && movie.nameEN.toLowerCase().includes(query)) ||
          (movie.nameRU && movie.nameRU.toLowerCase().includes(query))
      );

      if (shortFilmOnly) {
        filteredMovies = filteredMovies.filter((movie) => movie.duration <= 40);
      }

      setSearchedMovies(filteredMovies);

      setTimeout(() => {
        setIsSearching(false);
        if (filteredMovies.length === 0) {
          setError('Ничего не найдено');
        }
      }, 1000);
    } else {
      setSearchedMovies([]);
      setIsSearching(false);
    }
  };

  const handleToggleShortFilmOnly = () => {
    setShortFilmOnly(!shortFilmOnly);
  };

  useEffect(() => {
    handleSearch();
  }, [shortFilmOnly]);

  return (
    <main className={'movies'}>
      <SearchForm onSearch={handleSearch}
                  onToggle={handleToggleShortFilmOnly}
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  checked={shortFilmOnly}
      />

      {isSearching ? (
        <Preloader />
      ) : (
        <>
          {searchedMovies.length > 0 ? (
            <>
              <MoviesCardList movies={searchedMovies} />
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
