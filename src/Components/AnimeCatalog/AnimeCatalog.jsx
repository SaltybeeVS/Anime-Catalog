import "./AnimeCatalog.modules.css";
import React, { useState, useEffect, useCallback } from 'react';
import { getAnimeList } from '../../Services/api.js';
import defaultImage from '../../assets/Images/404-not-found-cute-3840x2160-18164.jpg';
import AnimeDetails from '../AnimeDetails/AnimeDetails';

const AnimeCatalog = ({ filters }) => {
  const [animeList, setAnimeList] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [selectedAnime, setSelectedAnime] = useState(null);

  const fallbackImage = defaultImage || 'https://via.placeholder.com/300x400/FF4081/FFFFFF?text=Anime+Image';

  const loadAnimes = useCallback(async (newPage = 1) => {
    if (loading) return;

    setLoading(true);
    try {
      const data = await getAnimeList({
        ...filters,
        page: newPage
      });

      newPage === 1 
        ? setAnimeList(data.data)
        : setAnimeList(prev => [...prev, ...data.data]);

      setHasMore(data.pagination.has_next_page);
      setPage(newPage + 1);
    } catch (error) {
      console.error('Error cargando animes:', error);
    } finally {
      setLoading(false);
    }
  }, [filters, loading]);

  useEffect(() => {
    setPage(1);
    loadAnimes(1);
  }, [filters]);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      if (scrollTop + clientHeight >= scrollHeight - 100 && hasMore && !loading) {
        loadAnimes(page);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasMore, loading, page]);

  const handleImageError = (e) => {
    e.target.src = fallbackImage;
    e.target.alt = "Imagen no disponible";
    e.target.style.objectFit = 'cover';
  };

  const handleCardClick = (anime) => {
    setSelectedAnime(anime);
  };

  return (
    <div id="animeCatalog">
      <div className="animeList">
        {animeList.map((anime) => (
          <div 
            className="animeCardWrapper" 
            key={anime.mal_id}
            onClick={() => handleCardClick(anime)}
          >
            <h3 className="animeTitle">{anime.title}</h3>
            <div className="animeCard">
              <img
                src={anime.images?.jpg?.image_url || fallbackImage}
                alt={anime.title}
                onError={handleImageError}
                loading="lazy"
              />
            </div>
          </div>
        ))}
      </div>

      {selectedAnime && (
        <AnimeDetails 
          anime={selectedAnime} 
          onClose={() => setSelectedAnime(null)}
        />
      )}

      {loading && <div className="loading-indicator">Cargando...</div>}
    </div>
  );
};

export default AnimeCatalog;