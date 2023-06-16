import './Movies.css';
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
