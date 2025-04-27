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
  getNewestManga(){
    return apiClient.get(`/manga/newest`)
 },
  addToWishlist(mangaId) {
    let token = localStorage.getItem('authToken');
    console.log('test',token)
    if (!token) {
      throw new Error('User not authenticated');
    }
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    try  {
      apiClient.post(`/users/addMangaToUser/${mangaId}`)
    }
    catch (error) {
      console.error('Error adding manga to wishlist', error);
      throw error;
    }

  },
  getUserMangas(id_user)  {
    let token = localStorage.getItem('authToken');
    if (!token) {
      throw new Error('User not authenticated');
    }
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return apiClient.get(`/users/getMangasByUserId/${id_user}`)
  }
};
