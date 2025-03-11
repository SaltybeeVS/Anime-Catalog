import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.jikan.moe/v4',
  timeout: 10000,
});

export const getAnimeList = async (params = {}) => {
  const cleanParams = Object.fromEntries(
    Object.entries(params).filter(([_, v]) => v !== '' && v !== undefined)
  );

  try {
    const response = await api.get('/anime', {
      params: {
        page: params.page || 1,
        limit: 24,
        sfw: true,
        ...cleanParams
      }
    });

    return {
      data: response.data.data,
      pagination: response.data.pagination
    };

  } catch (error) {
    console.error('API Error:', error);
    throw new Error('Error al cargar animes');
  }
};

export const getRandomAnime = async () => {
  try {
    const response = await api.get('/random/anime');
    return response.data.data;
  } catch (error) {
    console.error('Error fetching random anime:', error);
    throw new Error('Error al obtener anime aleatorio');
  }
};

export const getGenres = async () => {
  try {
    const response = await api.get('/genres/anime');
    return response.data.data;
  } catch (error) {
    console.error('Error fetching genres:', error);
    return [];
  }
};