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
    // console.log(id)
    return apiClient.get(`/manga/${id}`);
  },
  getMangaByTitle(title, params){
    // console.log(title)
    return apiClient.get(`/manga/title/${title}`,{params: params })
  },
  getExtraManga(title,params){
     // console.log(title)
     return apiClient.get(`/manga/title/${title}?extra=true`,{params: params })
  }
};
