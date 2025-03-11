import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.jikan.moe/v4',
});

export const getAnimeList = async (query = '', page = 1) => {
  const response = await api.get(`/anime?q=${query}&page=${page}`);
  return response.data;
};