import "./AnimeCatalog.modules.css";
import React, { useState, useEffect, useCallback } from 'react';
import { getAnimeList } from '../../Services/api.js';
import defaultImage from '../../assets/Images/404-not-found-cute-3840x2160-18164.jpg';
import AnimeDetails from '../AnimeDetails/AnimeDetails';

const AnimeCatalog = () => {
  const [animeList, setAnimeList] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [selectedAnime, setSelectedAnime] = useState(null);

  const fallbackImage = defaultImage || 'https://via.placeholder.com/300x400/FF4081/FFFFFF?text=Anime+Image';

  const loadAnimes = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const data = await getAnimeList('', page);
      if (data.data.length > 0) {
        setAnimeList((prev) => [...prev, ...data.data]);
        setPage((prev) => prev + 1);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error cargando animes:', error);
    } finally {
      setLoading(false);
    }
  }, [page, loading, hasMore]);

  useEffect(() => {
    loadAnimes();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      if (scrollTop + clientHeight >= scrollHeight - 100 && hasMore && !loading) {
        loadAnimes();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasMore, loading, loadAnimes]);

  const handleImageError = (e) => {
    e.target.src = fallbackImage;
    e.target.alt = "Imagen no disponible";
    e.target.style.objectFit = 'cover';
    e.target.style.backgroundColor = 'var(--color-soft-blue)';
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
    </div>
  );
};

export default AnimeCatalog;