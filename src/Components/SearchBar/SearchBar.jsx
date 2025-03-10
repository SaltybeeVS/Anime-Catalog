import React, { useState } from 'react';
import Button from '../Common/Button/Button';
import './SearchBar.modules.css';

function SearchBar({ onSearch, onRandomSearch, formats, statuses, genres }) {
  const [query, setQuery] = useState('');
  const [genre, setGenre] = useState('');
  const [format, setFormat] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ query, genre, format, status });
  };

  const handleRandomSearch = () => {
    onRandomSearch({ query, genre, format, status });
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search by name..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <select value={genre} onChange={(e) => setGenre(e.target.value)}>
        <option value="">All Genres</option>
        {genres.map((genre) => (
          <option key={genre.mal_id} value={genre.mal_id}>
            {genre.name}
          </option>
        ))}
      </select>

      <select value={format} onChange={(e) => setFormat(e.target.value)}>
        <option value="">All Formats</option>
        {formats.map((format, index) => (
          <option key={index} value={format}>
            {format}
          </option>
        ))}
      </select>

      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="">All Statuses</option>
        {statuses.map((status, index) => (
          <option key={index} value={status}>
            {status}
          </option>
        ))}
      </select>

      <Button type="submit">Search</Button>

      <Button type="button" onClick={handleRandomSearch}>
        Random Anime
      </Button>
    </form>
  );
}

export default SearchBar;