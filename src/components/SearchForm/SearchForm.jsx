import './SearchForm.css'

export default function SearchForm({ onSearch,
                                     checked,
                                     onToggle,
                                     searchQuery,
                                     setSearchQuery }) {

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch();
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleToggleChange = () => {
    onToggle();
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
        <label className={`toggle-container ${checked ? 'checked' : ''}`}>
          <input type="checkbox" checked={checked} onChange={handleToggleChange} />
          <span className="toggle-switch"></span>
        </label>
        <span>Короткометражки</span>
      </div>
    </form>
  );
}




