import axios from 'axios';

const api = axios.create({
  baseURL: 'https://rb-playground.onrender.com/internal/api/v1',
});

export default api;
