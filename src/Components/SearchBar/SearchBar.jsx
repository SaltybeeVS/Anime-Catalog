import React from 'react';
import './SearchBar.modules.css';
import { FaSearch, FaDice, FaSortAmountDown, FaSortAmountUp } from 'react-icons/fa';
import { getRandomAnime } from '../../Services/api';

const SearchBar = ({ onSearch, onRandom, genres }) => {
  const [filters, setFilters] = React.useState({
    q: '',
    type: '',
    genres: '',
    status: '',
    order_by: '',
    sort: 'asc'
  });

  const types = ['TV', 'Movie', 'OVA', 'Special', 'ONA'];
  const statuses = ['Airing', 'Finished', 'Upcoming'];
  const sortOptions = [
    { value: 'title', label: 'Título' },
    { value: 'score', label: 'Rating' },
    { value: 'popularity', label: 'Popularidad' },
    { value: 'episodes', label: 'Episodios' },
    { value: 'start_date', label: 'Fecha de estreno' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    if (name === 'order_by' || name === 'sort') {
      onSearch(newFilters); // Disparar búsqueda automática
    }
  };

  const handleSortDirection = () => {
    const newSort = filters.sort === 'asc' ? 'desc' : 'asc';
    const newFilters = { ...filters, sort: newSort };
    setFilters(newFilters);
    onSearch(newFilters); // Disparar búsqueda automática
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(filters);
  };

  const handleRandom = async () => {
    try {
      const randomAnime = await getRandomAnime();
      onRandom(randomAnime);
    } catch (error) {
      console.error('Error en búsqueda random:', error);
    }
  };

  return (
    <form className="search-container" onSubmit={handleSubmit}>
      <div className="main-search-row">
        <div className="search-filters">
          <input
            type="text"
            name="q"
            placeholder="Name"
            value={filters.q}
            onChange={handleChange}
            className="search search-input"
          />
          
          <select name="type" value={filters.type} onChange={handleChange} className="search">
            <option value="">Type</option>
            {types.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>

          <select name="genres" value={filters.genres} onChange={handleChange} className="search">
            <option value="">Genre</option>
            {genres.map(genre => (
              <option key={genre.mal_id} value={genre.mal_id}>{genre.name}</option>
            ))}
          </select>

          <select name="status" value={filters.status} onChange={handleChange} className="search">
            <option value="">State</option>
            {statuses.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>

          <button type="submit" className="search-button">
            <FaSearch className="icon-spacing" />
            Search
          </button>
          
          <button 
            type="button" 
            className="random-button"
            onClick={handleRandom}
          >
            <FaDice className="icon-spacing" />
            Random
          </button>
        </div>

        <div className="sort-actions">
          <div className="sort-group">
            <select 
              name="order_by" 
              value={filters.order_by} 
              onChange={handleChange}
              className="sort-select"
            >
              <option value="">Sort by</option>
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
            
            {filters.order_by && (
              <button
                type="button"
                onClick={handleSortDirection}
                className="sort-button"
              >
                {filters.sort === 'asc' 
                  ? <FaSortAmountDown className="sort-icon" /> 
                  : <FaSortAmountUp className="sort-icon" />}
              </button>
            )}
          </div>
        </div>
      </div>
    </form>
  );
};

export default SearchBar;