import './SearchForm.css'
import { useState } from "react";

export default function SearchForm({ onSearch }) {

  const [shortFilmOnly, setShortFilmOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleShortFilmToggle = () => {
    setShortFilmOnly(!shortFilmOnly);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // логика для обработки поиска
    onSearch(searchQuery);
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <div className="search-form__container">
        <input
          className="search-form__input"
          type="text"
          placeholder="Фильм"
          value={searchQuery}
          onChange={handleInputChange}
        />
        <button className="search-form__button animation-transition hovered-button" type="submit">
          Найти
        </button>
      </div>
      <div className="search-form__filter">
        <label className={`toggle-container ${shortFilmOnly ? 'checked' : ''}`}>
          <input type="checkbox" checked={shortFilmOnly} onChange={handleShortFilmToggle} />
          <span className="toggle-switch"></span>
        </label>
        <span>Короткометражки</span>
      </div>
    </form>
  )
}
