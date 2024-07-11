import axios from 'axios';
import { API_URL } from './config';

const apiClient = axios.create({
  baseURL: API_URL, 
  headers: {
    'Content-Type': 'application/json'
  }
});

export default {
  getMangaById(id) {
    console.log(id)
    return apiClient.get(`/manga/${id}`);
  }
};
