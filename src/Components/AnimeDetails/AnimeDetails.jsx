import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AnimeDetails.modules.css';
import { FaStar, FaTv, FaPlayCircle, FaDice } from "react-icons/fa";
import { getRandomAnime } from '../../Services/api';

const AnimeDetails = ({ anime, onClose, onRandom }) => {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await axios.get(`https://api.jikan.moe/v4/anime/${anime.mal_id}`);
        setDetails(response.data.data);
      } catch (error) {
        console.error('Error fetching details:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [anime.mal_id]);

  const handleNewRandom = async () => {
    try {
      const newAnime = await getRandomAnime();
      onRandom(newAnime);
    } catch (error) {
      console.error('Error fetching new random anime:', error);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container">
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <button className="close-button" onClick={onClose}>
            &times;
          </button>

          {loading ? (
            <div className="loading-spinner"></div>
          ) : (
            details && (
              <>
                <div 
                  className="hero-section"
                  style={{ backgroundImage: `url(${details.images.jpg.large_image_url})` }}
                >
                  <div className="hero-gradient"></div>
                  <h1 className="anime-title">{details.title}</h1>
                  <div className="anime-meta">
                    <span className="meta-item">
                      <FaTv className='icon'/>
                      {details.type || 'N/A'}
                    </span>
                    <span className="meta-item">
                      <FaPlayCircle className='icon'/>
                      {details.episodes || 'N/A'} Episodes
                    </span>
                    <span className="meta-item">
                      <FaStar className='icon'/>
                      {details.score || 'N/A'}
                    </span>
                  </div>
                </div>

                <div className="scrollable-content">
                  <div className="details-container">
                    <div className="genre-list">
                      {details.genres.map(genre => (
                        <span key={genre.mal_id} className="genre-tag">
                          {genre.name}
                        </span>
                      ))}
                    </div>

                    <p className="description">{details.synopsis}</p>

                    <div className="detail-grid">
                      <div className="detail-item">
                        <h4>Status</h4>
                        <p>{details.status}</p>
                      </div>
                      <div className="detail-item">
                        <h4>Broadcast</h4>
                        <p>{details.broadcast?.string || 'N/A'}</p>
                      </div>
                      <div className="detail-item">
                        <h4>Studio</h4>
                        <p>{details.studios[0]?.name || 'N/A'}</p>
                      </div>
                      <div className="detail-item">
                        <h4>Source</h4>
                        <p>{details.source || 'N/A'}</p>
                      </div>
                      <div className="detail-item">
                        <h4>Rating</h4>
                        <p>{details.rating || 'N/A'}</p>
                      </div>
                      <div className="detail-item">
                        <h4>Duration</h4>
                        <p>{details.duration || 'N/A'}</p>
                      </div>
                    </div>

                    {onRandom && (
                      <div className="random-button-container">
                        <button 
                          className="random-button-details"
                          onClick={handleNewRandom}
                        >
                          <FaDice className="icon-spacing" />
                          Another Random Anime
                        </button>
                      </div>
                    )}

                    {details.trailer?.url && (
                      <div className="trailer-container">
                        <h3 className="section-title">Trailer</h3>
                        <iframe
                          src={`https://www.youtube.com/embed/${details.trailer.youtube_id}`}
                          title="Trailer"
                          allowFullScreen
                          className="trailer-iframe"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default AnimeDetails;