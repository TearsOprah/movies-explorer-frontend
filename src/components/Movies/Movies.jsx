import './Movies.css';
import { useEffect } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import useMoviesSearch from '../../utils/useMoviesSearch';
import Preloader from '../Preloader/Preloader';

export default function Movies({ allMovies, errorFetchAllMovies, savedMovies, handleLikeClick }) {
  const {
    searchedMovies,
    isSearching,
    error,
    shortFilmOnly,
    searchQuery,
    setSearchQuery,
    handleSearch,
    handleToggleShortFilmOnly,
  } = useMoviesSearch(allMovies);

  // Чтение сохраненных данных из локального хранилища при монтировании компонента
  useEffect(() => {
    const savedSearchQuery = localStorage.getItem('searchQuery');
    const savedShortFilmOnly = localStorage.getItem('shortFilmOnly');

    if (savedSearchQuery && searchQuery !== savedSearchQuery) {
      setSearchQuery(savedSearchQuery);
    }

    if (savedShortFilmOnly && shortFilmOnly !== (savedShortFilmOnly === 'true')) {
      handleToggleShortFilmOnly(savedShortFilmOnly === 'true');
    }
  }, []);

  // Сохранение данных в локальное хранилище при изменении searchQuery или shortFilmOnly
  useEffect(() => {
    if (searchQuery !== localStorage.getItem('searchQuery')) {
      localStorage.setItem('searchQuery', searchQuery);
    }
  }, [searchQuery]);

  useEffect(() => {
    if (shortFilmOnly !== (localStorage.getItem('shortFilmOnly') === 'true')) {
      localStorage.setItem('shortFilmOnly', shortFilmOnly.toString());
    }
  }, [shortFilmOnly]);

  return (
    <main className={'movies'}>
      <SearchForm
        onSearch={handleSearch}
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
              <MoviesCardList movies={searchedMovies} savedMovies={savedMovies} handleLikeClick={handleLikeClick} />
            </>
          ) : (
            <p className={'error-message'}>
              {errorFetchAllMovies || (error && !isSearching) ? errorFetchAllMovies || error : ''}
            </p>
          )}
        </>
      )}

      <Footer />
    </main>
  );
}
