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
  //Ajouter de nouveaux mangas
  getNewManga(title){
     // console.log(title)
     return apiClient.get(`/manga/jikan/${title}`)
  },
  //Recupere les 20 mangas recents
  getNewestManga(){
    return apiClient.get(`/manga/newest`)
 }
};
