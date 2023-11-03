import { useState } from 'react';
import Notiflix from 'notiflix';
import css from './Searchbar.module.css';

const Searchbar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleChange = event => {
    const query = event.currentTarget.value;
    setQuery(query);
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (query.trim() === '') {
      return Notiflix.Notify.warning('Please enter word for search');
    }

    onSubmit(query);
    setQuery('');
  };

  return (
    <header className={css.searchbar}>
      <form className={css.form} onSubmit={handleSubmit}>
        <button type="submit" className={css.button}>
          <span className={css.buttonLabel}>Search</span>
          &#128269;
        </button>

        <input
          className={css.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleChange}
          value={query}
        />
      </form>
    </header>
  );
};

export default Searchbar;
