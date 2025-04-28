import axios from 'axios';
import { API_URL } from './config';

const ApiService = {
  async get(resource, slug = '') {
    try {
      const response = await axios.get(`${API_URL}/${resource}/${slug}`, {
        withCredentials: true,  
      });
      return response.data;
    } catch (error) {
      throw new Error(`API Error occurred: ${error.response}`);
    }
  },

  async post(resource, params) {
    try {
      const response = await axios.post(`${API_URL}/${resource}`, params, {
        withCredentials: true, 
      });
      return response.data;
    } catch (error) {
      throw new Error(`API Error occurred: ${error.response}`);
    }
  },

  async update(resource, slug, params) {
    try {
      const response = await axios.put(`${API_URL}/${resource}/${slug}`, params, {
        withCredentials: true,  
      });
      return response.data;
    } catch (error) {
      throw new Error(`API Error occurred: ${error.response}`);
    }
  },

  async delete(resource, slug) {
    try {
      const response = await axios.delete(`${API_URL}/${resource}/${slug}`, {
        withCredentials: true,  
      });
      return response.data;
    } catch (error) {
      throw new Error(`API Error occurred: ${error.response}`);
    }
  },

  async query(resource, params) {
    try {
      const response = await axios.get(`${API_URL}/${resource}`, {
        params: params,
        withCredentials: true,  
      });
      return response.data;
    } catch (error) {
      throw new Error(`API Error occurred: ${error.response}`);
    }
  }
};

export default ApiService;