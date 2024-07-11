import axios from 'axios';
import { API_URL } from './config';

const ApiService = {
  // Méthode générique pour les requêtes GET
  async get(resource, slug = '') {
    try {
      const response = await axios.get(`${API_URL}/${resource}/${slug}`);
      console.log(response);
      return response.data;
    } catch (error) {
      throw new Error(`API Error occurred: ${error.response}`);
    }
  },

  // Méthode générique pour les requêtes POST
  async post(resource, params) {
    try {
      const response = await axios.post(`${API_URL}/${resource}`, params);
      return response.data;
    } catch (error) {
      throw new Error(`API Error occurred: ${error.response}`);
    }
  },

  // Méthode générique pour les requêtes PUT
  async update(resource, slug, params) {
    try {
      const response = await axios.put(`${API_URL}/${resource}/${slug}`, params);
      return response.data;
    } catch (error) {
      throw new Error(`API Error occurred: ${error.response}`);
    }
  },

  // Méthode générique pour les requêtes DELETE
  async delete(resource, slug) {
    try {
      const response = await axios.delete(`${API_URL}/${resource}/${slug}`);
      return response.data;
    } catch (error) {
      throw new Error(`API Error occurred: ${error.response}`);
    }
  },

  // Méthode pour les requêtes de type query avec paramètres
  async query(resource, params) {
    try {
      const response = await axios.get(`${API_URL}/${resource}`, { params: params });
      console.log(response);
      return response.data;
    } catch (error) {
      throw new Error(`API Error occurred: ${error.response}`);
    }
  }
};

export default ApiService;
