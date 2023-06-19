import { useState, useEffect } from 'react';

const useMoviesSearch = (movies) => {
  const [searchedMovies, setSearchedMovies] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState('');
  const [shortFilmOnly, setShortFilmOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    if (e) {
      e.preventDefault();
    }
    setIsSearching(true);
    setError('');

    if (searchQuery.trim() !== '') {
      let filteredMovies = movies;

      const query = searchQuery.toLowerCase();
      filteredMovies = movies.filter(
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
      // Если строка поиска пустая и включены короткометражки,
      // отфильтровать все сохраненные фильмы по короткометражкам
      if (shortFilmOnly) {
        const shortMovies = movies.filter((movie) => movie.duration <= 40);
        setSearchedMovies(shortMovies);
      } else {
        setSearchedMovies(movies);
      }
      setIsSearching(false);
    }
  };

  const handleToggleShortFilmOnly = () => {
    setShortFilmOnly(!shortFilmOnly);
  };

  useEffect(() => {
    handleSearch();
  }, [shortFilmOnly]);

  return {
    searchedMovies,
    isSearching,
    error,
    shortFilmOnly,
    searchQuery,
    setSearchQuery,
    handleSearch,
    handleToggleShortFilmOnly,
  };
};

export default useMoviesSearch;
