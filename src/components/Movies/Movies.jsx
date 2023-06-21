import './Movies.css';
import { useEffect, useState } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import useMoviesSearch from '../../utils/useMoviesSearch';
import Preloader from '../Preloader/Preloader';

export default function Movies({ allMovies, errorFetchAllMovies, savedMovies, handleLikeClick }) {

  const [isLoading, setIsLoading] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

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

    setIsLoaded(true);
  }, []);


  // Сохранение данных в локальное хранилище при изменении searchQuery или shortFilmOnly
  useEffect(() => {
    if (isLoaded && searchQuery !== localStorage.getItem('searchQuery')) {
      localStorage.setItem('searchQuery', searchQuery);
    }
  }, [searchQuery, isLoaded]);

  useEffect(() => {
    if (isLoaded && shortFilmOnly !== (localStorage.getItem('shortFilmOnly') === 'true')) {
      localStorage.setItem('shortFilmOnly', shortFilmOnly.toString());
    }
  }, [shortFilmOnly, isLoaded]);

  useEffect(() => {
    if (isLoaded && !isLoading) {
      handleSearch();
    }
  }, [searchQuery, shortFilmOnly, isLoaded, isLoading]);

  // Загрузка массива allMovies
  useEffect(() => {
    if (allMovies.length > 0) {
      setIsLoading(false);
    }
  }, [allMovies]);

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
