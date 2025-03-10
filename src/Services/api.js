import axios from "axios";

const api = axios.create({
    baseURL: 'https://api.jikan.moe/v4',
});

export const getAnimeList = async (query) => {
    const response = await api.get(`/anime?q=${query}`);
    return response.data;
}