import './SavedMovies.css'
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import useMoviesSearch from "../../utils/useMoviesSearch";
import Preloader from "../Preloader/Preloader";
export default function SavedMovies({ savedMovies, errorFetchSavedMovies }) {
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
              <MoviesCardList movies={searchedMovies} />
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
