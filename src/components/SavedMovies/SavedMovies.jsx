import './SavedMovies.css'
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import useMoviesSearch from "../../utils/useMoviesSearch";
import Preloader from "../Preloader/Preloader";
import { useEffect } from 'react';

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

  useEffect(() => {
    handleSearch(searchQuery, shortFilmOnly);
  }, [savedMovies]);

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
