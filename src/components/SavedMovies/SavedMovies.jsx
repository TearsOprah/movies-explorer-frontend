import './SavedMovies.css';
import { useEffect } from 'react';
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import useMoviesSearch from "../../utils/useMoviesSearch";
import Preloader from "../Preloader/Preloader";

export default function SavedMovies({ savedMovies, errorFetchSavedMovies, handleLikeClick }) {
  const {
    searchedMovies,
    isSearching,
    error,
    shortFilmOnly,
    searchQuery,
    setSearchQuery,
    handleSearch,
    handleToggleShortFilmOnly,
  } = useMoviesSearch(savedMovies);

  // Чтение сохраненных данных из локального хранилища при монтировании компонента
  useEffect(() => {
    const savedSearchQuery = localStorage.getItem('savedSearchQuery');
    const savedShortFilmOnly = localStorage.getItem('savedShortFilmOnly');

    if (savedSearchQuery && searchQuery !== savedSearchQuery) {
      setSearchQuery(savedSearchQuery);
    }

    if (savedShortFilmOnly && shortFilmOnly !== (savedShortFilmOnly === 'true')) {
      handleToggleShortFilmOnly(savedShortFilmOnly === 'true');
    }
  }, []);

  // Сохранение данных в локальное хранилище при изменении searchQuery или shortFilmOnly
  useEffect(() => {
    localStorage.setItem('savedSearchQuery', searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    localStorage.setItem('savedShortFilmOnly', shortFilmOnly.toString());
  }, [shortFilmOnly]);

  useEffect(() => {
    handleSearch();
  }, [searchQuery, shortFilmOnly, savedMovies]);

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
              <MoviesCardList movies={searchedMovies} handleLikeClick={handleLikeClick} />
            </>
          ) : (
            <p className={'error-message'}>
              {errorFetchSavedMovies || (error && !isSearching) ? errorFetchSavedMovies || error : ''}
            </p>
          )}
        </>
      )}

      <Footer />
    </main>
  );
}
