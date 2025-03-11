import { useState, useEffect } from 'react';
import Header from './Components/Header/Header.jsx';
import SearchBar from './Components/SearchBar/SearchBar.jsx';
import AnimeCatalog from './Components/AnimeCatalog/AnimeCatalog.jsx';
import AnimeDetails from './Components/AnimeDetails/AnimeDetails.jsx';
import { getGenres } from './Services/api';

function App() {
  const [filters, setFilters] = useState({});
  const [genres, setGenres] = useState([]);
  const [selectedAnime, setSelectedAnime] = useState(null);
  const [isRandomMode, setIsRandomMode] = useState(false);

  useEffect(() => {
    const loadGenres = async () => {
      try {
        const genreData = await getGenres();
        setGenres(genreData);
      } catch (error) {
        console.error('Error loading genres:', error);
      }
    };
    loadGenres();
  }, []);

  const handleSearch = (searchFilters) => {
    const cleanedFilters = Object.fromEntries(
      Object.entries(searchFilters).filter(([_, v]) => v !== '')
    );
    setFilters(cleanedFilters);
    setIsRandomMode(false);
  };

  const handleRandomAnime = (anime) => {
    setSelectedAnime(anime);
    setIsRandomMode(true);
  };

  return (
    <>
      <Header />
      <SearchBar 
        onSearch={handleSearch}
        onRandom={handleRandomAnime}
        genres={genres}
      />
      <AnimeCatalog filters={filters} />
      {selectedAnime && (
        <AnimeDetails 
          anime={selectedAnime}
          onClose={() => setSelectedAnime(null)}
          onRandom={isRandomMode ? handleRandomAnime : null}
        />
      )}
    </>
  );
}

export default App;